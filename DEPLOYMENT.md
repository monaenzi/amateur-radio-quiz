# Betriebshandbuch

## 1. Überblick

Diese Anwendung läuft als Docker-Compose-Setup mit zwei Kernservices:

- `app`: Next.js-Webanwendung
- `db`: MySQL 8 Datenbank

Die zentrale Ziel-URL ist normalerweise:

- `http://<server-ip>:3000`

Die Datenbank wird in einem Docker-Volume gespeichert und bleibt bei Container-Neustarts erhalten.

---

## 2. Services, Ports & Technik

### 2.1 Services und Ports

| Service | Container-Port | Host-Port | Bedeutung |
|---|---:|---:|---|
| `app` | 3000 | 3000 | Web-Frontend der Quiz-App |
| `db` | 3306 | 3306 | MySQL-Datenbank |
| `app` | 5555 | 5555 | Optional, für Prisma Studio / Admin-Werkzeuge |

### 2.2 Verwendete Technik

- Next.js 16
- Node.js 20
- MySQL 8
- Prisma ORM
- Docker / Docker Compose

### 2.3 Persistenz

Die Datenbank speichert ihre Daten im Docker-Volume `db_data`. Das bedeutet:

- Container-Neustarts löschen die Daten nicht.
- Ein Rebuild des `app`-Containers betrifft nur die Anwendung, nicht die Datenbank.
- **Nur** der Befehl `docker compose down -v` löscht das Volume und damit alle Daten. Im normalen Betrieb niemals verwenden.

---

## 3. Zwei Wege, ein neues Image zu bekommen

Je nachdem, wie die Umgebung eingerichtet ist, gilt einer der beiden Wege:

### Weg A: Lokal aus dem Repository bauen (Standard, empfohlen)

```bash
git pull origin docker-setup
docker compose build --no-cache
docker compose up -d
```

### Weg B: Fertiges Image aus der GitHub Container Registry ziehen

Voraussetzung: In `docker-compose.yml` ist bei `app` statt `build: .` folgendes eingetragen:

```yaml
services:
  app:
    image: ghcr.io/monaenzi/amateur-radio-quiz:latest
```

Ablauf:

```bash
git pull origin docker-setup
docker pull ghcr.io/monaenzi/amateur-radio-quiz:latest
docker compose up -d
```

`git pull` ist bei **beiden** Wegen nötig, da `docker-compose.yml`, Migrationsdateien und `.env.example` aus dem Repository kommen. Nur das fertige App-Image selbst kommt bei Weg B von GHCR.

**Wichtig:** Prüfen, welcher Eintrag (`build:` oder `image:`) aktuell in der `docker-compose.yml` steht, bevor Befehle ausgeführt werden.

---

## 4. Konfiguration (.env)

Alle Zugangsdaten und Secrets werden über eine `.env`-Datei im Projektverzeichnis eingelesen. Diese Datei ist **nicht** im Repository enthalten.

### Einrichtung

```bash
cp .env.example .env
```

Anschließend die echten Werte eintragen. Die `.env.example` listet alle benötigten Variablen auf, unter anderem:

| Variable | Zweck |
|---|---|
| `DATABASE_URL` | Verbindung zur MySQL-Datenbank |
| `NEXTAUTH_SECRET` | Secret für Auth-Sessions |
| `NEXTAUTH_URL` | Öffentliche Basis-URL der Anwendung |
| `SSO_CLIENT_ID` / `SSO_CLIENT_SECRET` | SSO-Zugangsdaten |
| `SSO_ISSUER` | SSO-Issuer-URL |
| `AUTH_TRUST_HOST` | Host-Trust für Auth-Requests |

### Hinweise

- Für Produktion echte, eigene Secrets verwenden, keine Beispielwerte übernehmen.
- Keine Secrets in Git committen.
- Idealerweise über einen Secret-Manager oder Docker Secrets verwalten statt Klartext in `.env`.

---

## 5. Starten / Stoppen

```bash
docker compose up -d          # Container starten
docker compose down            # Container stoppen (Daten bleiben erhalten)
docker compose restart app     # Nur die App neu starten
docker compose restart db      # Nur die Datenbank neu starten
docker compose ps              # Status prüfen
```

---

## 6. Logs und Fehlersuche

```bash
docker compose logs -f app
docker compose logs -f db
docker compose logs app | tail -n 100
```

Wenn die Anwendung nicht erreichbar ist:

1. `docker compose ps`: Laufen beide Container?
2. `docker compose logs app`: Fehlermeldungen prüfen
3. `docker compose logs db`: Datenbankstart prüfen
4. Direkter DB-Zugriff zur Kontrolle:
   ```bash
   docker compose exec db mysql -u root -p amateurfunk_db
   ```

---

## 7. Checks nach jedem Deployment

**Webanwendung**
- `http://<server>:3000` ist erreichbar
- Login funktioniert
- Keine Fehler in `docker compose logs app`

**Datenbank**
- Container `db` läuft stabil
- Volume `db_data` ist vorhanden
- Datenbank `amateurfunk_db` existiert

**Container**
```bash
docker compose ps
```

---

## 8. Datenbank: Backup & Restore

### Backup

```bash
docker compose exec db mysqldump -u root -p amateurfunk_db > backup-amateurfunk.sql
```

### Restore

```bash
docker compose exec -T db mysql -u root -p amateurfunk_db < backup-amateurfunk.sql
```

**Empfehlung:** Regelmäßiges Backup (täglich im produktiven Betrieb), extern gesichert.

---

## 9. Updates und Prisma-Migrationen

Nach jedem Update prüfen, ob sich das Datenbankschema geändert hat. Falls ja:

```bash
docker compose exec app npx prisma migrate deploy
```

Kompletter Update-Ablauf (Weg A, siehe Abschnitt 3):

```bash
git pull origin docker-setup
docker compose build --no-cache
docker compose up -d
docker compose exec app npx prisma migrate deploy
docker compose logs -f app
```

---

## 10. Häufige Probleme

| Problem | Mögliche Ursache | Lösung |
|---|---|---|
| App startet nicht | DB noch nicht bereit, falsche `.env`-Werte | `docker compose logs app` und `logs db` prüfen |
| Login schlägt fehl | `NEXTAUTH_SECRET`/`NEXTAUTH_URL` falsch, SSO nicht korrekt konfiguriert | `.env` gegen `.env.example` abgleichen |
| DB-Verbindung schlägt fehl | Falscher Host/Passwort in `DATABASE_URL` | `DATABASE_URL` muss auf Service-Namen `db`, nicht `localhost`, zeigen |
| Port-Konflikt | Port 3000/3306 bereits belegt | Port-Mapping in `docker-compose.yml` anpassen oder belegenden Prozess stoppen |

---

## 11. Checkliste vor jeder Übergabe/Wartung

- [ ] Container laufen stabil (`docker compose ps`)
- [ ] App unter der Host-URL erreichbar
- [ ] DB-Volume vorhanden, keine Daten verloren
- [ ] `.env` korrekt und vollständig befüllt
- [ ] Aktuelles Backup vorhanden und geprüft
- [ ] Logs zeigen keine kritischen Fehler
- [ ] Prisma-Migrationen angewendet

---

## 12. Kurzfassung für den Alltag

```bash
git pull origin docker-setup
docker compose build --no-cache
docker compose up -d
docker compose ps
docker compose logs -f app
docker compose exec app npx prisma migrate deploy
```

- App-Port: `3000`
- DB-Port: `3306`
- DB-Volume: `db_data`
- Backup nicht vergessen

---

## 13. Hinweis zur Produktionsreife

Das aktuelle Setup eignet sich gut für lokalen Betrieb oder eine kleine Testumgebung. Für echten Produktivbetrieb zusätzlich empfohlen:

- Sichere Secret-Verwaltung statt Klartext in `.env`
- Externer, automatisierter Backup-Mechanismus
- Monitoring/Alerting
- Reverse Proxy mit HTTPS (z. B. nginx/Traefik + Let's Encrypt)
- Getrennte Produktions- und Testumgebungen