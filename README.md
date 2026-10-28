# Blood Donor Manager

IA3 project for **Web Technology (23CS2048)**. A simple CRUD app to add, view, search, update, and delete blood donors.

## Technologies

- Frontend: React, Vite, Bootstrap, Axios
- Backend: Node.js, Express
- Database: MongoDB, Mongoose

## Run

Install Node.js 22.12+ and MongoDB. Start MongoDB locally on port `27017`.

From the project directory, start the backend:

```sh
cd backend-app
npm ci
npm run dev
```

In another terminal, from the project directory, start the frontend:

```sh
cd frontend-app
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. The backend runs at `http://localhost:5000`.

## Schema

Database: `blood_donor_manager` · Collection: `donors`

| Field | Type | Description |
| --- | --- | --- |
| `donorId` | String | Required, unique donor ID |
| `name` | String | Required donor name |
| `bloodGroup` | String | Required blood group |
| `contactNumber` | String | Required contact number |
| `available` | Boolean | Availability to donate; defaults to true |

MongoDB creates `_id` automatically. Mongoose defines the schema and creates the collection. Use the visible Donor ID to edit or delete a donor.
