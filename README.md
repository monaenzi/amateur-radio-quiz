# amateur-radio-quiz

Eine einfache und moderne Web-App zur Vorbereitung auf die österreichische Amateurfunkprüfung (ÖVSV).

---

## Features

- Gastmodus zum Lernen ohne Registrierung (Fortschritt wird nur für die aktuelle Session gespeichert)
- Lernmodus mit Prüfungsfragen nach Themenbereichen
- Prüfungssimulation mit Zeitlimit und Auswertung (nur für angemeldete Nutzer)
- Persistente Fortschrittsanzeige und Statistiken (nur für angemeldete Nutzer)
- Inhalte speziell auf den österreichischen Prüfungsstoff zugeschnitten

---

## Tech Stack

| Tool | Zweck |
|------|-------|
| **Next.js** | React-Framework für das Frontend |
| **React** | Komponentenbasierte UI-Bibliothek |
| **JavaScript/TypeScript** | Hauptprogrammiersprachen |
| **Tailwind CSS** | Utility-first CSS-Framework für das Styling |
| **Node.js** | Laufzeitumgebung |
| **Prisma** | ORM für Datenbankzugriff |
| **ESLint** | Linting und Code-Qualitätsprüfung |
| **Prettier** | Code-Formatierung |

---

## Projektstruktur

```
amateur-radio-quiz/
├── .github/              # PR-Templates und GitHub-Workflows
├── app/
│   ├── page.tsx          # Startseite (Einstiegspunkt)
│   ├── layout.tsx        # Gemeinsames Layout (Header, Footer, Metadaten)
│   └── globals.css       # Globale Styles
├── components/           # Wiederverwendbare UI-Komponenten
├── public/               # Statische Assets (Bilder, Icons, etc.)
├── .gitignore
├── .prettierrc
├── CONTRIBUTING.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## Erste Schritte

### 1. Repository klonen

```bash
git clone https://github.com/monaenzi/amateur-radio-quiz
cd amateur-radio-quiz
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Entwicklungsserver starten

```bash
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) im Browser öffnen.

---

## Voraussetzungen

- Node.js 18+
- npm 9+ oder pnpm/yarn

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

### Bloomfield Vincent
- GitHub: [VinceChiv](https://github.com/VinceChiv)
- vincent.bloomfield@edu.fh-joanneum.at

---

## Lizenz

TBD
