# Frontend - React Cars Management App

React frontend application for managing and viewing cars data.

## Features

- View all cars in a responsive grid
- Add new cars with a form
- Filter cars by year
- Filter cars by maximum price
- Real-time updates with the backend API
- Modern, clean UI with hover effects
- Loading states and error handling

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will start at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Fetch API** - HTTP requests to backend
- **CSS3** - Styling

## API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000`.

### API Endpoints Used:
- `GET /cars` - Fetch all cars
- `GET /cars/year/{year}` - Filter by year
- `GET /cars/price/{price}` - Filter by price
- `POST /cars` - Add new car

## Components

### App Component
Main component that handles:
- State management for cars and filters
- API calls to backend
- Form submission for new cars
- Filter operations
- UI rendering

## Styling

Custom CSS with:
- Responsive grid layout
- Card-based design
- Hover animations
- Loading and error states
- Form styling
- Mobile-friendly design

## Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 8000

### Hot Module Replacement
Vite provides instant hot module replacement during development.

### Environment
Make sure the backend is running before starting the frontend:
```bash
# In Backend folder
uvicorn main:app --reload
```

Then start the frontend:
```bash
# In frontend folder
npm run dev
```

## Features in Detail

### View Cars
- Displays all cars in a responsive grid
- Shows brand, model, year, color, and price
- Hover effects for better UX

### Add Car
- Form with fields: brand, model, year, color, price
- Client-side validation
- Success/error messages
- Auto-refresh after adding

### Filter by Year
- Input field for year
- Search button
- Shows count of results

### Filter by Price
- Input field for maximum price
- Returns cars under or equal to price
- Shows count of results

### Reset Filters
- "Show All Cars" button
- Clears all filters
- Reloads complete list

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### CORS Errors
Make sure the backend has CORS enabled for `http://localhost:3000`.

### Connection Refused
Ensure the backend server is running on port 8000.

### npm install fails
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.
