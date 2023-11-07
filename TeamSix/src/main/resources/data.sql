-- Daten für WKN 123456 (Allianz Versicherungsgesellschaft Aktie)
INSERT INTO PORTFOLIO ( wkn, name, description, category)
VALUES ('123456', 'Allianz Versicherungsgesellschaft Aktie', 'Aktie', 'Versicherungsgesellschaft');

INSERT INTO PORTFOLIO ( wkn, purchase_date, quantity, purchase_price)
VALUES
    ('123456', '2023-11-01', 100, 100.00),
    ('123456', '2023-11-02', 200, 200.00);

-- Daten für WKN 987654 (BASF Chemie Unternehmen Aktie)
INSERT INTO PORTFOLIO ( wkn, name, description, category)
VALUES ('987654', 'BASF Chemie Unternehmen Aktie', 'Aktie', 'Chemie Unternehmen');

INSERT INTO PORTFOLIO ( wkn, purchase_date, quantity, purchase_price)
VALUES
    ('987654', '2023-11-02', 50, 50.00),
    ('987654', '2023-11-02', 100, 40.00),
    ('987654', '2023-11-03', 200, 30.00);

-- Daten für BTC (Bitcoin Kryptowährung)
INSERT INTO PORTFOLIO ( wkn, name, description, category)
VALUES ('BTC', 'Bitcoin', 'Kryptowährung', 'Crypto');

INSERT INTO PORTFOLIO (wkn, purchase_date, quantity, purchase_price)
VALUES
    ('BTC', '2023-11-03', 1, 32000.00);
