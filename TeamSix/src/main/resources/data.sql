-- Einfügen von Daten in die PORTFOLIO-Tabelle
INSERT INTO PORTFOLIO (id)
VALUES
    (1);

-- Einfügen von Usern

INSERT INTO USERTABLE (portfolio_id, username, password, role, name) SELECT id, 'user', 'password', 'ROLE_USER','Example User' FROM PORTFOLIO WHERE id = 1;
INSERT INTO USERTABLE (portfolio_id, username, password, role, name) SELECT id, 'john.doe', 'mypassword', 'ROLE_ADMIN','John Doe', FROM PORTFOLIO WHERE id = 1;

-- Einfügen von Daten in die PORTFOLIOITEMTABLE-Tabelle
-- Für WKN 123456
INSERT INTO PORTFOLIOITEMTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '123456', '2023-11-01', 100, 100.00,'Versicherungen', 'Versicherungsgesellschaft', 'Aktie', FROM PORTFOLIO WHERE id = 1;
INSERT INTO PORTFOLIOITEMTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '123456', '2023-11-02', 200, 200.00,'Versicherungen', 'Versicherungsgesellschaft', 'Aktie', FROM PORTFOLIO WHERE id = 1;



-- Für WKN 987654
INSERT INTO PORTFOLIOITEMTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '987654', '2023-11-02', 50, 50.00,'Unternehmen', 'Unternehmensanteile', 'Aktie', FROM PORTFOLIO WHERE id = 1;
INSERT INTO PORTFOLIOITEMTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '987654', '2023-11-02', 100, 40.00,'Unternehmen', 'Unternehmensanteile', 'Aktie', FROM PORTFOLIO WHERE id = 1;
INSERT INTO PORTFOLIOITEMTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, '987654', '2023-11-03', 200, 30.00,'Unternehmen', 'Unternehmensanteile', 'Aktie', FROM PORTFOLIO WHERE id = 1;


-- Für BTC
INSERT INTO PORTFOLIOITEMTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, 'BTC', '2023-11-03', 1, 32000.00, 'Kryptowährungen', 'Online Währungen für Zukunft', 'Crypto', FROM PORTFOLIO WHERE id = 1;
INSERT INTO PORTFOLIOITEMTABLE (portfolio_id, wkn, purchase_date, quantity, purchase_price, name, description, category)
SELECT id, 'BTC', '2023-11-03', 2, 60000.00,'Kryptowährungen', 'Online Währungen für Zukunft', 'Crypto', FROM PORTFOLIO WHERE id = 1;

