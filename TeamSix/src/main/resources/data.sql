INSERT INTO PORTFOLIO (id)
VALUES
    (1);

-- Einfügen von Usern
INSERT INTO USERTABLE (portfolio_id, username, password, role, name) SELECT id, 'john.doe', 'mypassword', 'ROLE_ADMIN','John Doe', FROM PORTFOLIO WHERE id = 1;