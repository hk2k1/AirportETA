CREATE TABLE dashboard_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO dashboard_settings (key, enabled) VALUES
('est-pax-wait-time', true),
('est-taxi-wait-time', true),
('flight-information', true),
('alerts-bulletin', true),
('est-taxi-queue', true),
('taxi-stand-t1-A', true),
('taxi-stand-t1-B', true),
('taxi-stand-t1-C', true),
('taxi-stand-t1-D', true),
('taxi-stand-t2-North', true),
('taxi-stand-t2-South', true),
('taxi-stand-t3-North', true),
('taxi-stand-t3-South', true),
('taxi-stand-t4-North', true),
('taxi-stand-t4-South', true)
ON CONFLICT (key) DO UPDATE SET enabled = EXCLUDED.enabled;