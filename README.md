# amateur-radio-quiz

Eine moderne Web-App zur Vorbereitung auf die österreichische Amateurfunkprüfung (ÖVSV).

---

## Features

- **Gastmodus** — Lernen ohne Registrierung (Fortschritt nur für aktuelle Session)
- **Lernmodus** — Karteikarten mit gewichtetem Spaced-Repetition-System
- **Prüfungssimulation** — nur für angemeldete Nutzer
- **Persistenter Fortschritt** — Statistiken und Lernstand werden gespeichert
- **Admin-Panel** — Fragen verwalten, erstellen, bearbeiten und Vorschau anzeigen
- **Bild-Anhänge** — Fragen können Bilder via Cloudinary enthalten
- **PWA-fähig** — als App installierbar

---

## Tech Stack

| Tool | Zweck |
|------|-------|
| **Next.js 15** | React-Framework (App Router) |
| **React 19** | Komponentenbasierte UI-Bibliothek |
| **TypeScript** | Typsichere Entwicklung |
| **Tailwind CSS** | Utility-first Styling |
| **Node.js** | Laufzeitumgebung für Next.js |
| **Prisma** | ORM für Datenbankzugriff |
| **MariaDB/MySQL** | Relationale Datenbank |
| **NextAuth.js v5** | Authentifizierung & Session Management |
| **Cloudinary** | Bild-Upload und -Speicherung |
| **Zod** | Schema-Validierung |
| **ESLint** | Linting und Code-Qualitätsprüfung |
| **Prettier** | Code-Formatierung |

---

## Architektur

Das Projekt verwendet das **Repository Pattern**:

Client → API Route → Service → Repository → Prisma → DB

- `repositories/` — Datenbankzugriffe
- `services/` — Business Logik
- `app/api/` — HTTP-Handling
- `lib/` — Hilfsfunktionen, Schemas, Error-Handling

---

## Projektstruktur

```
amateur-radio-quiz/
├── .github/                  # PR-Templates und GitHub-Workflows
├── app/
│   ├── admin/                # Admin-Panel (Dashboard, Fragenverwaltung)
│   ├── api/                  # API Routes
│   │   ├── admin/            # Admin-spezifische Endpoints
│   │   ├── progress/         # Lernfortschritt speichern
│   │   ├── questions/        # Fragen abrufen
│   │   └── upload/           # Bild-Upload (Cloudinary)
│   ├── dashboard/            # User Dashboard
│   ├── examSimulation/       # Prüfungssimulation
│   ├── examResults/          # Prüfungsergebnisse
│   ├── learn/                # Lernmodus Auswahl
│   ├── login/                # Login-Seite
│   ├── member/               # Member-Bereich
│   ├── quiz/                 # Karteikarten
│   ├── statistics/           # Statistiken
│   ├── layout.tsx            # Root Layout
│   ├── page.tsx              # Startseite
│   └── globals.css           # Globale Styles
├── components/               # Wiederverwendbare UI-Komponenten
├── lib/                      # Hilfsfunktionen, Schemas, Error-Handling
├── prisma/                   # Datenbankschema und Migrationen
├── public/                   # Statische Assets
├── repositories/             # Datenbankzugriffe (Repository Pattern)
├── services/                 # Business Logik
├── tests/                    # Tests
├── types/                    # TypeScript Typen
├── auth.ts                   # NextAuth Konfiguration
├── middleware.ts              # Route-Schutz
├── .env.example
└── README.md
```
---

## Voraussetzungen

- Docker
- Docker Compose (in aktuellen Docker Desktop Versionen enthalten)

---

## Cloudinary-Account einrichten

Bild-Uploads für Fragen-Anhänge laufen über [Cloudinary](https://cloudinary.com/). Vor dem ersten Start:

1. Kostenlosen Account auf cloudinary.com anlegen
2. Im Dashboard **Cloud Name**, **API Key** und **API Secret** kopieren
3. In `.env` eintragen:
```env
   CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dein-cloud-name"
```

---

## Erste Schritte

### 1. Repository klonen

```bash
git clone https://github.com/monaenzi/amateur-radio-quiz
cd amateur-radio-quiz
```

### 2. Umgebungsvariablen einrichten

```bash
cp .env.example .env
```

Dann `.env` befüllen (Cloudinary-Zugangsdaten und `NEXTAUTH_SECRET` anpassen). Der `DATABASE_URL`-Host bleibt `db` — das ist der Container-Name aus `docker-compose.yml`, **nicht** auf `localhost` ändern.

> **SSO-Variablen:** `SSO_CLIENT_ID`, `SSO_CLIENT_SECRET` und `SSO_ISSUER` können vorerst auf `change_me` stehen bleiben — das blockiert den regulären Login über E-Mail/Passwort nicht. Der "Als Mitglied anmelden"-Button funktioniert damit natürlich noch nicht, das braucht echte ÖVSV-SSO-Zugangsdaten.

### 3. Container starten

```bash
docker compose up -d
```

Baut die Images (App + DB) und startet beide Container im Hintergrund. Datenbank-Migrationen und das Einspielen der Demo-Daten (Admin-/Test-User, Fragenkatalog) laufen beim ersten Start automatisch.

### 4. App öffnen

[http://localhost:3000](http://localhost:3000)

### Nützliche Befehle

```bash
docker compose logs -f app     # Logs verfolgen
docker compose down            # Container stoppen
docker compose down -v         # Container stoppen + DB-Volume löschen (Reset)
docker compose exec app npx prisma db seed   # Demo-Daten manuell neu einspielen (idempotent)
docker compose exec app npx prisma studio    # Prisma Studio öffnen (DB-GUI, Port 5555)
```

## Weiteren Admin-User anlegen

```bash
docker compose exec app npx tsx scripts/create-admin.ts <email> <passwort>
```

Legt einen neuen Admin an oder setzt einen bestehenden User (bei bereits existierender E-Mail) auf die Rolle `ADMIN`.

---

## Autoren

### Alamer Alia
- GitHub: [Alia-Alamer](https://github.com/Alia-Alamer)
- alia.alamer@edu.fh-joanneum.at

### Enzi Ramona
- GitHub: [monaenzi](https://github.com/monaenzi)
- ramona.enzi@edu.fh-joanneum.at

### Kadyrova Linda
- GitHub: [lindakadyrova](https://github.com/lindakadyrova)
- linda.kadyrova@edu.fh-joanneum.at

---

## Lizenz

TBD
