-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Create tables
CREATE TABLE taxis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_plate TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('available', 'in_use', 'off_duty')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE passengers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    anonymous_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    taxi_id UUID REFERENCES taxis(id),
    passenger_anonymous_id TEXT REFERENCES passengers(anonymous_id),
    start_location TEXT,
    end_location TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    status TEXT NOT NULL CHECK (status IN ('ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE queue_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    passenger_anonymous_id TEXT REFERENCES passengers(anonymous_id),
    entered_queue_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    left_queue_at TIMESTAMPTZ,
    status TEXT NOT NULL CHECK (status IN ('waiting', 'assigned', 'left'))
);

CREATE TABLE taxi_events (
    time TIMESTAMPTZ NOT NULL,
    taxi_id UUID REFERENCES taxis(id),
    event_type TEXT NOT NULL CHECK (event_type IN ('entry', 'exit')),
    location TEXT
);

SELECT create_hypertable('taxi_events', 'time');

CREATE TABLE passenger_counts (
    time TIMESTAMPTZ NOT NULL,
    count INTEGER NOT NULL,
    location TEXT
);

SELECT create_hypertable('passenger_counts', 'time');

CREATE TABLE weather_data (
    time TIMESTAMPTZ NOT NULL,
    temperature FLOAT,
    condition TEXT,
    humidity FLOAT
);

SELECT create_hypertable('weather_data', 'time');

CREATE TABLE ml_predictions (
    time TIMESTAMPTZ NOT NULL,
    predicted_wait_time INTEGER NOT NULL,
    data_window TEXT NOT NULL,
    confidence_score FLOAT,
    model_version TEXT
);

SELECT create_hypertable('ml_predictions', 'time');

-- Create indexes
CREATE INDEX ON taxis (status);
CREATE INDEX ON rides (start_time, end_time);
CREATE INDEX ON queue_entries (entered_queue_at, left_queue_at);

-- Create continuous aggregates for faster querying
-- CREATE MATERIALIZED VIEW hourly_taxi_stats
-- WITH (timescaledb.continuous) AS
-- SELECT time_bucket('1 hour', time) AS bucket,
--        count(*) FILTER (WHERE event_type = 'entry') AS entries,
--        count(*) FILTER (WHERE event_type = 'exit') AS exits
-- FROM taxi_events
-- GROUP BY bucket;

-- CREATE MATERIALIZED VIEW hourly_passenger_stats
-- WITH (timescaledb.continuous) AS
-- SELECT time_bucket('1 hour', time) AS bucket,
--        avg(count) AS avg_count,
--        max(count) AS max_count
-- FROM passenger_counts
-- GROUP BY bucket;

-- Create function for real-time taxi status updates
CREATE OR REPLACE FUNCTION update_taxi_status()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_taxi_status_trigger
BEFORE UPDATE ON taxis
FOR EACH ROW
EXECUTE FUNCTION update_taxi_status();

-- Create function for ride status updates
CREATE OR REPLACE FUNCTION update_ride_status()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ride_status_trigger
BEFORE UPDATE ON rides
FOR EACH ROW
EXECUTE FUNCTION update_ride_status();