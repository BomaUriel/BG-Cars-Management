from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db, CarDB, engine, Base

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

class Car(BaseModel):
    brand: str
    model: str
    year: int
    color: str
    price: int

    class Config:
        from_attributes = True

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/names")
def read_names():
    return {"names": ["Alice", "Bob", "Charlie"]}

@app.get("/cars")
def get_cars(db: Session = Depends(get_db)):
    cars = db.query(CarDB).all()
    return {"cars": cars}

@app.get("/cars/year/{year}")
def get_cars_by_year(year: int, db: Session = Depends(get_db)):
    cars = db.query(CarDB).filter(CarDB.year == year).all()
    return {"cars": cars, "count": len(cars)}

@app.get("/cars/price/{price}")
def get_cars_by_price(price: int, db: Session = Depends(get_db)):
    cars = db.query(CarDB).filter(CarDB.price <= price).all()
    return {"cars": cars, "count": len(cars)}

@app.get("/cars/{car_id}")
def get_car(car_id: int, db: Session = Depends(get_db)):
    car = db.query(CarDB).filter(CarDB.id == car_id).first()
    if car:
        return car
    return {"error": "Car not found"}

@app.post("/cars")
def create_car(car: Car, db: Session = Depends(get_db)):
    db_car = CarDB(**car.model_dump())
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return {"message": "Car created successfully", "car": db_car}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
