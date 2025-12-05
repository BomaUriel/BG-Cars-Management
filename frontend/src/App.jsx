import { useState, useEffect } from 'react'
import './index.css'

const API_URL = 'http://localhost:8000'

function App() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // Filter states
  const [filterYear, setFilterYear] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  
  // Form states
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: '',
    color: '',
    price: ''
  })

  // Fetch all cars on mount
  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/cars`)
      if (!response.ok) throw new Error('Failed to fetch cars')
      const data = await response.json()
      setCars(data.cars)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCarsByYear = async () => {
    if (!filterYear) {
      fetchCars()
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/cars/year/${filterYear}`)
      if (!response.ok) throw new Error('Failed to fetch cars by year')
      const data = await response.json()
      setCars(data.cars)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCarsByPrice = async () => {
    if (!filterPrice) {
      fetchCars()
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/cars/price/${filterPrice}`)
      if (!response.ok) throw new Error('Failed to fetch cars by price')
      const data = await response.json()
      setCars(data.cars)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCar = async (e) => {
    e.preventDefault()
    
    try {
      setError(null)
      setSuccess(null)
      
      const carData = {
        brand: newCar.brand,
        model: newCar.model,
        year: parseInt(newCar.year),
        color: newCar.color,
        price: parseInt(newCar.price)
      }
      
      const response = await fetch(`${API_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData)
      })
      
      if (!response.ok) throw new Error('Failed to add car')
      
      setSuccess('Car added successfully!')
      setNewCar({ brand: '', model: '', year: '', color: '', price: '' })
      fetchCars() // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleInputChange = (e) => {
    setNewCar({
      ...newCar,
      [e.target.name]: e.target.value
    })
  }

  const resetFilters = () => {
    setFilterYear('')
    setFilterPrice('')
    fetchCars()
  }

  return (
    <div className="app">
      <h1>🚗 Cars Management</h1>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      {/* Add Car Form */}
      <div className="add-car-form">
        <h2>Add New Car</h2>
        <form onSubmit={handleAddCar}>
          <div className="form-row">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={newCar.brand}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newCar.year}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={newCar.color}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newCar.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Add Car</button>
        </form>
      </div>

      {/* Filters */}
      <div className="filters">
        <h2>Filter Cars</h2>
        <div className="filter-group">
          <input
            type="number"
            placeholder="Filter by year (e.g., 2023)"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />
          <button onClick={fetchCarsByYear}>Search by Year</button>
        </div>
        <div className="filter-group">
          <input
            type="number"
            placeholder="Max price (e.g., 50000)"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          />
          <button onClick={fetchCarsByPrice}>Search by Price</button>
        </div>
        <div className="filter-group">
          <button onClick={resetFilters}>Show All Cars</button>
        </div>
      </div>

      {/* Cars Grid */}
      {loading ? (
        <div className="loading">Loading cars...</div>
      ) : cars.length === 0 ? (
        <div className="no-cars">No cars found</div>
      ) : (
        <div className="cars-grid">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <h3>{car.brand} {car.model}</h3>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Color:</strong> {car.color}</p>
              <p className="price">${car.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
