# বঙ্গ ভাস্কর ক্লাব - Backend API

REST API server for Bongo Vashkor Club community management platform.

## Live API
https://bongo-club-api.onrender.com/api

## Features
- Member management (CRUD operations)
- Event creation and management
- Payment tracking with bKash integration
- Expense management per event
- Club information settings

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/data | GET | Get all data |
| /api/members | POST | Add member |
| /api/members/:id | PUT | Update member |
| /api/members/:id | DELETE | Delete member |
| /api/events | POST | Create event |
| /api/events/:id | PUT | Update event |
| /api/events/:id | DELETE | Delete event |
| /api/payments | POST | Add payment |
| /api/payments/:id | PUT | Update payment status |
| /api/expenses | POST | Add expense |
| /api/expenses/:id | DELETE | Delete expense |
| /api/club-info | POST | Update club info |

## Environment Variables
- MONGO_URI - MongoDB connection string
- PORT - Server port (default: 5000)

## Related Repositories
- Frontend: https://github.com/sanzidd/bongo-club-frontend
- Live Website: https://blood-brothers-bv.netlify.app/

## Author
Sanzid - https://github.com/sanzidd
