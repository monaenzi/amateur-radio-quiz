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

## Erste Schritte

### 1. Repository klonen & Dependencies installieren

```bash
git clone https://github.com/monaenzi/amateur-radio-quiz
cd amateur-radio-quiz
npm install
```

### 2. Umgebungsvariablen einrichten

```bash
cp .env.example .env
```

Dann `.env` befüllen:

```env
DATABASE_URL="mysql://root:PASSWORT@localhost:3306/amateurfunk_db"
NEXTAUTH_SECRET="dein-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dein-cloud-name"
CLOUDINARY_URL="cloudinary://api-key:api-secret@cloud-name"
```

### 3. Datenbank einrichten

MariaDB starten und Datenbank `amateurfunk_db` anlegen, dann:

```bash
npx prisma migrate dev
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) öffnen.

---

## Voraussetzungen

- Node.js 18+
- npm 9+ oder pnpm/yarn
- MariaDB oder MySQL

---

## Offene Punkte

### Externe User Authentifizierung
Der ÖVSV hat eine bestehende Mitgliederdatenbank.
Die Integration ist geplant aber noch nicht umsetzbar weil technische Details zum externen System fehlen

Sobald die Info vorliegt:
1. `externalId` Feld zum User Model hinzufügen
2. Zweiten Auth Provider in `auth.ts` einbauen
3. Login Page um "Als Mitglied anmelden" Button erweitern


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
