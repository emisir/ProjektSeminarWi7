-- Einfügen von Daten in die PORTFOLIO-Tabelle
INSERT INTO PORTFOLIO (id)
VALUES
    (1);

-- Einfügen von Daten in die WKNTABLE-Tabelle
-- Für WKN 123456
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '123456', '2023-11-01', 100, 100.00,'Allianz', 'Versicherungsgesellschaft', 'Aktie'FROM PORTFOLIO WHERE id = 1;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '123456', '2023-11-02', 200, 200.00,'Allianz', 'Versicherungsgesellschaft', 'Aktie' FROM PORTFOLIO WHERE id = 1;



-- Für WKN 987654
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '987654', '2023-11-02', 50, 50.00,'BASF', 'Chemie Unternehmen', 'Aktie' FROM PORTFOLIO WHERE id = 1;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '987654', '2023-11-02', 100, 40.00,'BASF', 'Chemie Unternehmen', 'Aktie', FROM PORTFOLIO WHERE id = 1;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '987654', '2023-11-03', 200, 30.00,'BASF', 'Chemie Unternehmen', 'Aktie' FROM PORTFOLIO WHERE id = 1;


-- Für BTC
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, 'BTC', '2023-11-03', 1, 32000.00, 'Bitcoin', 'Kryptowährung', 'Crypto' FROM PORTFOLIO WHERE id = 1;
INSERT INTO WKNTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, 'BTC', '2023-11-03', 2, 60000.00,'Bitcoin', 'Kryptowährung', 'Crypto' FROM PORTFOLIO WHERE id = 1;

