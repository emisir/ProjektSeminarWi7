# Projektseminar WI Gruppe 6

## Beschreibung

Das Projekt ist ein Portfolio, in dem Nutzer über eine API Aktien kaufen und zu ihren Favoriten hinzufügen können. Es ist möglich, verschiedene Benutzerkonten mit den Rollen 'User' oder 'Admin' anzulegen. Diese Funktionen ermöglichen eine vielseitige Interaktion mit dem Aktienmarkt innerhalb der Anwendung.

## Voraussetzungen

- Java JDK [Version 17]
- Angular CLI [Version 17]
- Maven [Version 4.0.0]
- Spring Boot [Version 3.1.4]
- Datenbank (H2-Console)

## Installation und Einrichtung

Folgen Sie diesen Schritten, um das Projekt zu installieren und einzurichten:

1. Klonen des Repositories: `git clone https://github.com/emisir/ProjektSeminarWi7.git`
2. Wechseln in das Projektverzeichnis: `cd ProjektSeminarWi7/TeamSix/src/main`
3. Backend-Abhängigkeiten installieren: `mvn install`
4. Wechseln in das Frontend-Verzeichnis: `cd public/src`
5. Frontend-Abhängigkeiten installieren: `npm install`

## Ausführung der Anwendung

### Backend-Server starten

Führen Sie die folgenden Schritte aus, um das Spring Boot Backend über IntelliJ IDEA zu starten:

1. Öffnen Sie das Projekt in IntelliJ IDEA.
2. Navigieren Sie im Projektfenster zum `src/main/java/com.example.teamsix`-Verzeichnis.
3. Suchen Sie nach der `TeamSixApplication`-Klasse.
4. Rechtsklicken Sie auf die `TeamSixApplication`-Klasse und wählen Sie `Run 'TeamSixApplication'`, um die Anwendung zu starten.

Das Backend sollte nun auf dem konfigurierten Port 8081 laufen.

### Frontend-Server starten

Um das Angular-Frontend zu starten, befolgen Sie diese Schritte:

1. Öffnen Sie ein Terminal oder eine Eingabeaufforderung auf Ihrem Computer.
2. Navigieren Sie zum Hauptverzeichnis des Angular-Projekts, welches den `package.json` enthält.
3. Führen Sie `npm install` aus, um alle notwendigen Node.js-Pakete zu installieren (dies ist nur beim ersten Mal oder bei Änderungen der Paketabhängigkeiten erforderlich).
4. Starten Sie das Frontend mit `ng serve`, um die Angular-Anwendung zu kompilieren und den Entwicklungsserver zu starten.
5. Nachdem der Server gestartet wurde, öffnen Sie Ihren Webbrowser und gehen Sie zu `http://localhost:4200`, um die Anwendung zu verwenden.

Stellen Sie sicher, dass der Port 4200 verfügbar ist, oder konfigurieren Sie einen anderen Port, falls erforderlich, mit dem Befehl `ng serve --port <anderer-port>`.

## Nutzung

Nachdem Sie das Backend und das Frontend gestartet haben, besuchen Sie bitte `http://localhost:4200` in Ihrem Webbrowser. Beim ersten Zugriff werden Sie von einem Login-Fenster begrüßt. Für den Erstzugang nutzen Sie bitte die folgenden Anmeldedaten:

- **Benutzername:** `john.doe`
- **Passwort:** `mypassword`

Nach einem erfolgreichen Login gelangen Sie zur Homeseite der Anwendung, von wo aus Sie die Bereiche Portfolio, Favoriten und Benutzer erreichen können.

### Portfolio

Auf der Portfolio-Seite können Sie durch Klicken auf das 'Plus-Icon' neue Portfolio-Items hinzufügen. Geben Sie hierfür die ISIN und die gewünschte Anzahl an. Bitte beachten Sie, dass nur ISINs, die in der `API-STOCKS.pdf` aufgeführt sind, verwendet werden können, da diese von unserer API unterstützt werden.

Die Anzeige von Portfolio-Items ist standardmäßig auf fünf Einträge pro Seite eingestellt. Sollten Sie mehr als fünf Portfolio-Items besitzen, können Sie den Paginator nutzen, um durch die Seiten zu navigieren oder die Anzeige auf bis zu 20 Einträge pro Seite zu erweitern.

Für jedes Portfolio-Item stehen Ihnen folgende Funktionen zur Verfügung:

- **Kauf neuer Stocks:** Klicken Sie auf das 'Plus-Icon' innerhalb der Tabelle.
- **Löschen eines Portfolio-Items:** Verwenden Sie das 'Sell-Icon'.
- **Favorisieren eines Items:** Betätigen Sie das 'Herz-Icon'.

Durch einen Klick auf die ISIN eines Portfolio-Items gelangen Sie zu einer Detailseite, auf der alle Käufe zu der jeweiligen ISIN aufgelistet sind.

### Favoriten

Auf der Favoriten-Seite sehen Sie alle von Ihnen, in diesem Fall als Benutzer `john.doe`, favorisierten Items. Hier können Sie Stocks zu Ihren Portfolio-Items kaufen, die Favoriten entfernen oder über die ISIN zur Detailansicht gelangen.

### Benutzer

Die Benutzerseite erlaubt es Ihnen, neue Benutzerkonten anzulegen. Hierzu klicken Sie auf das 'Plus-Icon', woraufhin sich ein Dialogfeld öffnet. Dort können Sie den Namen, den Benutzernamen, das Passwort und die Rolle des neuen Benutzers festlegen. Die Rollen sind in 'User' und 'Admin' unterteilt.

Innerhalb der Benutzertabelle haben Sie die Möglichkeit, Benutzerdaten zu bearbeiten – mit Ausnahme des Benutzernamens, da dieser als eindeutige ID fungiert – oder Benutzer zu löschen.


## Schlusswort

Wir hoffen, dass dieses Projekt Ihnen nützlich ist und freuen uns auf Ihr Feedback und Ihre Beiträge, um es weiter zu verbessern.


## Mitwirkende

Wir möchten uns bei allen Teammitgliedern bedanken, die dieses Projekt zum Leben erweckt haben:

- Atilla Durdu
- Aylin Yamac
- Burak Seyrek
- Ebubekir Misir
- Veronica Nicola

Ihr Einsatz und ihre Beiträge waren entscheidend für den Erfolg dieses Projekts.

