-- Einfügen von Daten in die PORTFOLIO-Tabelle
INSERT INTO PORTFOLIO (id, name, description, category)
VALUES
    (1, 'Versicherungen', 'Versicherungsgesellschaft', 'Aktie'),
    (2, 'Unternehmen', 'Unternehmensanteile', 'Aktie'),
    (3, 'Kryptowährungen', 'Online Währungen für Zukunft', 'Crypto');

-- Einfügen von Daten in die WKNTABLE-Tabelle
-- Hinweis: Die portfolio_id wird basierend auf dem WKN-Wert der PORTFOLIO-Tabelle abgerufen

-- Für WKN 123456
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '123456', '2023-11-01', 100, 100.00 FROM PORTFOLIO WHERE id = 1;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '123456', '2023-11-02', 200, 200.00 FROM PORTFOLIO WHERE id = 1;

-- Für WKN 030303
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '030303', '2023-11-01', 200, 10.00 FROM PORTFOLIO WHERE id = 1;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '030303', '2023-11-01', 100, 100.00 FROM PORTFOLIO WHERE id = 1;

-- Für WKN 987654
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '987654', '2023-11-02', 50, 50.00 FROM PORTFOLIO WHERE id = 2;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '987654', '2023-11-02', 100, 40.00 FROM PORTFOLIO WHERE id = 2;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '987654', '2023-11-03', 200, 30.00 FROM PORTFOLIO WHERE id = 2;

-- Für WKN 262626
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '262626', '2023-11-03', 300, 20.00 FROM PORTFOLIO WHERE id = 2;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '262626', '2023-11-03', 50, 150.00 FROM PORTFOLIO WHERE id = 2;

-- Für BTC
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, 'BTC', '2023-11-03', 1, 32000.00 FROM PORTFOLIO WHERE id = 3;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, 'BTC', '2023-11-03', 2, 60000.00 FROM PORTFOLIO WHERE id = 3;

-- Für DOGE
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, 'DOGE', '2023-11-03', 20, 4400 FROM PORTFOLIO WHERE id = 3;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, 'DOGE', '2023-11-03', 10, 2200 FROM PORTFOLIO WHERE id = 3;

-- Für ETH
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, 'ETH', '2023-11-03', 4, 23400 FROM PORTFOLIO WHERE id = 3;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, 'ETH', '2023-11-03', 2, 11800 FROM PORTFOLIO WHERE id = 3;

