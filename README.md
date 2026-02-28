# xe-web-challenge

# XE Challenge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![AdonisJS](https://img.shields.io/badge/AdonisJS-v6-green)](https://docs.adonisjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)](https://www.postgresql.org/)

Μια responsive εφαρμογή για αγγελίες με **AdonisJS v6** (backend) και **React/Ant Design** (frontend).  
Οι χρήστες μπορούν να δημιουργούν, επεξεργάζονται και διαγράφουν αγγελίες, ενώ η επιλογή περιοχής γίνεται μέσω autocomplete.

---

## 🌟 Features

- **User Authentication**: Login & Logout
- **CRUD Αγγελιών**: Δημιουργία, Επεξεργασία, Διαγραφή
- **Autocomplete Περιοχών**: Βάση Google Places API
- **Responsive Dashboard**: Δύο αγγελίες ανά γραμμή, cards ίδιου μεγέθους
- **Clean Design**: Κίτρινα highlights, cards με hover effects

---

## 🛠️ Τεχνολογίες

- **Backend:** AdonisJS v6, PostgreSQL
- **Frontend:** React, Ant Design, Axios
- **State Management:** React Hooks

---

## ⚡ Εγκατάσταση

1. Κλωνοποίηση repository:

```bash
git clone https://github.com/USERNAME/xe-challenge.git
```

2. Backend dependencies:

```bash
cd xe-challenge/server
npm install
```

3. Frontend dependencies:

```bash
cd ../client
npm install
```

4. Δημιουργία .env αρχείου στο backend:

```env
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=xe_db
```

5. Τρέξε migrations και seeders:

```bash
cd ../server
node ace migration:run
node ace db:seed
```

6. Τρέξε το project:

```bash
# Backend
npm run dev

# Frontend
cd ../client
npm start
```

## Χρήση

- Άνοιξε τον browser στο http://localhost:3000￼
- Κάνε login με τους χρήστες που δημιουργούνται από τον seeder
- Στον dashboard μπορείς να:
  - Δημιουργήσεις νέα αγγελία
  - Επεξεργαστείς υπάρχουσες
  - Διαγράψεις αγγελίες
  - Δεις περιοχές με autocomplete
