INSERT INTO dashboard_settings (key, enabled) VALUES
('EstPaxWaitTime', true),
('EstTaxiWaitTime', true),
('FlightInformation', true),
('AlertBulletins', true),
('EstTaxiQueueSupply', true),
ON CONFLICT (key) DO UPDATE SET enabled = EXCLUDED.enabled;