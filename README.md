# Cars Management App

Full-stack application with FastAPI backend (using SQLite database) and React frontend.

## Project Structure

```
├── Backend/          # FastAPI server with SQLite database
├── frontend/         # React application
└── Script/          # Utility scripts
```

## Backend Setup

1. Navigate to Backend folder:
```bash
cd Backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server with hot reload:
```bash
uvicorn main:app --reload
```

Backend will be available at `http://localhost:8000`

### Database

The backend uses **SQLite** database (`cars.db`) with SQLAlchemy ORM for data persistence.

- Database file: `Backend/cars.db`
- Auto-creates tables on startup
- Migration script available: `migrate_data.py`

## Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Features

### Backend Endpoints
- `GET /` - Hello World message
- `GET /cars` - Get all cars from database
- `GET /cars/{car_id}` - Get car by ID
- `GET /cars/year/{year}` - Filter cars by year
- `GET /cars/price/{price}` - Get cars with price <= specified amount
- `POST /cars` - Add a new car to database

### Frontend Features
- View all cars in a responsive grid layout
- Add new cars via form
- Filter cars by year
- Filter cars by maximum price
- Real-time updates with hot reload
- CORS enabled for local development

## Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** - Lightweight SQL database
- **SQLAlchemy** - SQL toolkit and ORM
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend
- **React** - JavaScript library for UI
- **Vite** - Build tool and dev server
- **Fetch API** - HTTP client for API calls

## API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI).
Visit `http://localhost:8000/redoc` for alternative API documentation (ReDoc).

## Development Notes

- Backend uses SQLite for easy setup and portability
- CORS is configured for `http://localhost:3000`
- Hot reload enabled on both frontend and backend
- Virtual environment isolates Python dependencies
