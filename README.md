# Seminar-Anmeldung

Dier ist eine Oberfläche für die Anmeldung zu Seminaren.

## Voraussetzungen

- PHP 8.3 oder neuer
- Composer 2.x
- Node.js 18+ (Node.js 20+ empfohlen)
- npm (wird mit Node.js mitgeliefert)
- Eine unterstützte Datenbank (SQLite, MySQL, PostgreSQL usw.)

## Installation

1. Klone das Repository und wechsle in das Projektverzeichnis:

   ```bash
   cd example-app
   ```

2. Installiere die PHP-Abhängigkeiten:

   ```bash
   composer install
   ```

3. Installiere die JavaScript-Abhängigkeiten:

   ```bash
   npm install
   ```

4. Kopiere die Umgebungsdatei und generiere einen Anwendungsschlüssel:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Konfiguriere die Datenbankeinstellungen in `.env`.

6. Führe die Datenbank-Migrationen aus:

   ```bash
   php artisan migrate
   ```

## Lokale Entwicklung

Starte die Anwendung:

```bash
composer run dev
```

## Entscheidungen & Annahmen

- Der berechnete Preis wird nur im Frontend angezeigt und nicht in die DB gespeichert.
  Stattdessen wird in der Datenbank ein Fremdschlüssel zum Seminar und die Anzehl der Teilnehmer übernommen.

- In der Live-Vorschau werden die Felder bis die ausgefüllt werden als leere Strings, bzw. als o,oo € angezeigt

- Validierung und Meldung der Validierungsfehler über eigenen FormRequest (StoreSeminarRegistrationRequest)

- Meldung über Erfolg kommt aus dem Backend