# Backend - FastAPI with SQLite

FastAPI backend server with SQLite database for the Cars Management application.

## Features

- RESTful API with FastAPI
- SQLite database with SQLAlchemy ORM
- CORS enabled for frontend communication
- Auto-generated API documentation
- Data validation with Pydantic
- Hot reload for development

## Setup

### 1. Create Virtual Environment
```bash
python -m venv venv
```

### 2. Activate Virtual Environment
**Windows PowerShell:**
```bash
.\venv\Scripts\Activate.ps1
```

**Windows CMD:**
```bash
.\venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Server
```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

## Project Structure

```
Backend/
├── main.py              # FastAPI application and endpoints
├── database.py          # SQLAlchemy models and database setup
├── migrate_data.py      # Script to migrate JSON data to SQLite
├── requirements.txt     # Python dependencies
├── cars.db             # SQLite database (auto-generated)
├── db.json             # Original JSON database (legacy)
└── venv/               # Virtual environment (not in git)
```

## API Endpoints

### GET `/`
Returns a welcome message.

**Response:**
```json
{"message": "Hello World"}
```

### GET `/cars`
Get all cars from the database.

**Response:**
```json
{
  "cars": [
    {
      "id": 1,
      "brand": "Toyota",
      "model": "Camry",
      "year": 2022,
      "color": "Silver",
      "price": 28000
    }
  ]
}
```

### GET `/cars/{car_id}`
Get a specific car by ID.

**Parameters:**
- `car_id` (integer): The ID of the car

**Response:**
```json
{
  "id": 1,
  "brand": "Toyota",
  "model": "Camry",
  "year": 2022,
  "color": "Silver",
  "price": 28000
}
```

### GET `/cars/year/{year}`
Filter cars by manufacturing year.

**Parameters:**
- `year` (integer): The year to filter by

**Response:**
```json
{
  "cars": [...],
  "count": 2
}
```

### GET `/cars/price/{price}`
Get cars with price less than or equal to specified amount.

**Parameters:**
- `price` (integer): Maximum price

**Response:**
```json
{
  "cars": [...],
  "count": 3
}
```

### POST `/cars`
Add a new car to the database.

**Request Body:**
```json
{
  "brand": "Honda",
  "model": "Accord",
  "year": 2023,
  "color": "Blue",
  "price": 30000
}
```

**Response:**
```json
{
  "message": "Car created successfully",
  "car": {
    "id": 8,
    "brand": "Honda",
    "model": "Accord",
    "year": 2023,
    "color": "Blue",
    "price": 30000
  }
}
```

## Database

### SQLite Database
- **File:** `cars.db`
- **ORM:** SQLAlchemy
- **Tables:** `cars`

### Schema
```sql
CREATE TABLE cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    year INTEGER NOT NULL,
    color VARCHAR NOT NULL,
    price INTEGER NOT NULL
);
```

### Migration
To migrate data from `db.json` to SQLite:
```bash
python migrate_data.py
```

## Dependencies

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **sqlalchemy** - SQL toolkit and ORM
- **pydantic** - Data validation

## API Documentation

Once the server is running:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## CORS Configuration

CORS is enabled for:
- `http://localhost:3000` (React dev server)

To add more origins, update the `allow_origins` in `main.py`.

## Development

### Hot Reload
The server automatically reloads when you make changes to the code (when using `--reload` flag).

### Database Reset
To reset the database:
1. Delete `cars.db`
2. Restart the server (tables will be recreated)
3. Run `python migrate_data.py` to restore initial data
