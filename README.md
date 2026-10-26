# Blood Donor Manager — Class Starter

Simple React + Vite + Bootstrap frontend and Node.js + Express + Mongoose backend. The code currently implements a **student registration form**, not the donor application. It follows the existing class structure: `frontend-app/src/App.jsx` and `backend-app/server.js`.

## Run locally

Install Node.js 22.12+ and MongoDB Community Server. Start MongoDB locally on port `27017`; the backend currently uses the `college` database and `students` collection. MongoDB Compass is optional.

In one terminal, from this directory:

```sh
cd backend-app
npm ci
npm run dev
```

In another terminal, from this directory:

```sh
cd frontend-app
npm ci
npm run dev
```

The backend runs at `http://localhost:5000`. Open the frontend URL printed by Vite (normally `http://localhost:5173`).

## Current state and remaining work

- Student creation is implemented through `POST /saveStudent`; the root GET route only returns a message.
- Replace student fields and the model with donor ID, name, age, blood group, contact number, address, and availability. Use a unique donor ID and suitable validation.
- Add APIs and UI for viewing all donors, searching by blood group, updating donor details/availability, and deleting donors.
- Fix status messages in `App.jsx` (`setStatus` is unused and `message` is undefined), return responses for backend save errors, and handle frontend connection errors.
- Update the database/collection names, page title, and form labels for Blood Donor Manager.

The original frontend build passes; lint currently reports the two status-message issues above. End-to-end database operation has not been verified. This is a local class starter with unrestricted CORS and no authentication.

Course PDFs, installed dependencies, and generated builds are excluded. Keep real donor data and secrets out of Git. Both package lockfiles are included for reproducible installation.
