-- Insert mock data for taxis
INSERT INTO taxis (license_plate, status) VALUES
('ABC123', 'available'),
('DEF456', 'in_use'),
('GHI789', 'available'),
('JKL012', 'off_duty'),
('MNO345', 'available');

-- Insert mock data for passengers
INSERT INTO passengers (anonymous_id) VALUES
('PASS001'),
('PASS002'),
('PASS003'),
('PASS004'),
('PASS005');

-- Insert mock data for rides
INSERT INTO rides (taxi_id, passenger_anonymous_id, start_location, end_location, start_time, end_time, status) VALUES
((SELECT id FROM taxis WHERE license_plate = 'DEF456'), 'PASS001', 'Airport Terminal 1', 'Downtown Hotel', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour 30 minutes', 'completed'),
((SELECT id FROM taxis WHERE license_plate = 'ABC123'), 'PASS002', 'Airport Terminal 2', 'City Center', NOW() - INTERVAL '1 hour', NULL, 'ongoing'),
((SELECT id FROM taxis WHERE license_plate = 'GHI789'), 'PASS003', 'Airport Terminal 3', 'Suburban Area', NOW() - INTERVAL '30 minutes', NULL, 'ongoing');

-- Insert mock data for queue_entries
INSERT INTO queue_entries (passenger_anonymous_id, entered_queue_at, left_queue_at, status) VALUES
('PASS004', NOW() - INTERVAL '45 minutes', NULL, 'waiting'),
('PASS005', NOW() - INTERVAL '30 minutes', NULL, 'waiting'),
('PASS001', NOW() - INTERVAL '2 hours 15 minutes', NOW() - INTERVAL '2 hours', 'left');

-- Insert mock data for taxi_events
INSERT INTO taxi_events (time, taxi_id, event_type, location) VALUES
(NOW() - INTERVAL '3 hours', (SELECT id FROM taxis WHERE license_plate = 'ABC123'), 'entry', 'Airport Entrance'),
(NOW() - INTERVAL '2 hours 45 minutes', (SELECT id FROM taxis WHERE license_plate = 'DEF456'), 'entry', 'Airport Entrance'),
(NOW() - INTERVAL '2 hours 30 minutes', (SELECT id FROM taxis WHERE license_plate = 'GHI789'), 'entry', 'Airport Entrance'),
(NOW() - INTERVAL '1 hour 30 minutes', (SELECT id FROM taxis WHERE license_plate = 'DEF456'), 'exit', 'Airport Exit'),
(NOW() - INTERVAL '1 hour', (SELECT id FROM taxis WHERE license_plate = 'ABC123'), 'exit', 'Airport Exit'),
(NOW() - INTERVAL '30 minutes', (SELECT id FROM taxis WHERE license_plate = 'GHI789'), 'exit', 'Airport Exit');

-- Insert mock data for passenger_counts
INSERT INTO passenger_counts (time, count, location) VALUES
(NOW() - INTERVAL '3 hours', 10, 'Terminal 1'),
(NOW() - INTERVAL '2 hours', 15, 'Terminal 1'),
(NOW() - INTERVAL '1 hour', 20, 'Terminal 1'),
(NOW(), 18, 'Terminal 1');

-- Insert mock data for weather_data
INSERT INTO weather_data (time, temperature, condition, humidity) VALUES
(NOW() - INTERVAL '3 hours', 22.5, 'Sunny', 60.0),
(NOW() - INTERVAL '2 hours', 23.0, 'Partly Cloudy', 62.5),
(NOW() - INTERVAL '1 hour', 22.8, 'Cloudy', 65.0),
(NOW(), 22.3, 'Light Rain', 70.0);

-- Insert mock data for ml_predictions
INSERT INTO ml_predictions (time, predicted_wait_time, data_window, confidence_score, model_version) VALUES
(NOW() - INTERVAL '3 hours', 15, '1 hour', 0.85, 'v1.0'),
(NOW() - INTERVAL '2 hours', 20, '1 hour', 0.82, 'v1.0'),
(NOW() - INTERVAL '1 hour', 25, '1 hour', 0.88, 'v1.0'),
(NOW(), 18, '1 hour', 0.86, 'v1.0');