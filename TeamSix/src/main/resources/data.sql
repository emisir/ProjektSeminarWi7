-- Einfügen von Daten in die PORTFOLIO-Tabelle
INSERT INTO PORTFOLIO (id, name, description, category)
VALUES
    (1, 'Allianz Versicherungsgesellschaft Aktie', 'Versicherungsgesellschaft', 'Aktie'),
    (2, 'BASF Chemie Unternehmen Aktie', 'Chemie Unternehmen', 'Aktie'),
    (3, 'Bitcoin', 'Kryptowährung', 'Crypto');

-- Einfügen von Daten in die WKNTABLE-Tabelle
-- Hinweis: Die portfolio_id wird basierend auf dem WKN-Wert der PORTFOLIO-Tabelle abgerufen

-- Für WKN 123456
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '123456', '2023-11-01', 100, 100.00 FROM PORTFOLIO WHERE id = 1;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '123456', '2023-11-02', 200, 200.00 FROM PORTFOLIO WHERE id = 1;

-- Für WKN 987654
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '987654', '2023-11-02', 50, 50.00 FROM PORTFOLIO WHERE id = 2;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '987654', '2023-11-02', 100, 40.00 FROM PORTFOLIO WHERE id = 2;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, '987654', '2023-11-03', 200, 30.00 FROM PORTFOLIO WHERE id = 2;

-- Für BTC
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price)
SELECT id, 'BTC', '2023-11-03', 1, 32000.00 FROM PORTFOLIO WHERE id = 3;
