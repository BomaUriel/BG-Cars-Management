"""
Script to migrate data from db.json to SQLite database
"""
import json
from database import SessionLocal, CarDB

def migrate_data():
    # Read from JSON file
    with open("db.json", "r") as f:
        data = json.load(f)
    
    # Get database session
    db = SessionLocal()
    
    try:
        # Check if database already has data
        existing_count = db.query(CarDB).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} cars. Skipping migration.")
            return
        
        # Insert each car into SQLite
        for car_data in data["cars"]:
            # Remove id from JSON data, let SQLite auto-generate
            car_dict = {k: v for k, v in car_data.items() if k != 'id'}
            db_car = CarDB(**car_dict)
            db.add(db_car)
        
        db.commit()
        print(f"Successfully migrated {len(data['cars'])} cars to SQLite!")
        
    except Exception as e:
        print(f"Error during migration: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    migrate_data()
