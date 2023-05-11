from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    apple = Product(
        name='apple', description='Our apples are picked straight from the orchard and ready for you to enjoy! Our appless are carefully selected for their vibrant red and green colors, crisp texture and juicy sweetness!', price=1.50, type='Fruit', owner_id=1)
    banana = Product(
        name='banana', description='Fleshly picked and deliciously sweet, our bananas are a perfect snack! With lots of essential vitamins and minerals, our bananas are a healthy choice.', price=3.00, type='Fruit', owner_id=1)
    raspberry = Product(
        name='raspberry', description='Juicy and flavorful, our raspberries are hand-picked for peak ripeness. Perfect for snacking, these berries are a delicious and healthy choice. Grown with care and bursting with freshness.', price=6.00, type='Fruit', owner_id=1)
    blueberry = Product(
        name='blueberry', description='Plump and bursting with sweetness, our blueberries are piceked at the peak of ripeness. Grown with care and bursting with flavor.', price=5.00, type='Fruit', owner_id=1)
    strawberry = Product(
        name='strawberry', description='Get ready for a burst of bold and sweet flavor with our luscious strawberries! Whether you enjoy them on your own, or in a refreshing smoothie, these strawberries will delight your senses', price=5.00, type='Fruit', owner_id=1)
    tomato = Product(
        name='tomato', description='Plump, juicy, and bursting with flavor, our tomatoes are the perfect addition to any dish.', price=1.50, type='Vegetable', owner_id=2)
    onion = Product(
        name='onion', description='Our onions are the perfect combination of pungent and sweet flavors. Whether you\'re looking to carmelize them for soup or use fresh in a salad, our onions are the perfect addition to your cooking needs! **10lb bag**', price=5.00, type='Vegetable', owner_id=2)
    garlic = Product(
        name='garlic', description='Known for its bold and aromatic flavor, our garlic is the perfect ingredient for any dish. With a unique and pungent taste, our garlic is perfect for adding depth to soups, sauces, and marinades. Also packed with antioxidants that support good health. **Comes as a pack of 10 garlic cloves**', price=3.00, type='Vegetable', owner_id=2)
    cucumber = Product(
        name='cucumber', description='Crisp, refreshing, and packed with hydration, our cucumbers are te perfect summer snack.', price=3.50, type='Vegetable', owner_id=2)
    lettuce = Product(
        name='lettuce', description='With its crisp texture and refreshing flavor, our lettuce is the perfect base for any salad. Whether you\'re looking to add some crunch to your sandwihc or create a gourmet salad, our lettuce is the perfect choice!', price=2.50, type='Vegetable', owner_id=2)
    beef = Product(
        name='beef', description='Our beef is tender, juicy, and full of flavor. Raised on grass-fed diets and free from antibiotics and hormones, our beef is a healthy and delicious choice!', price=5.00, type='Meat', owner_id=3)
    chicken = Product(
        name='chicken', description='Our chicken is tender, juicy, and packed with protein. Raised in a free-range environment and free from antibiotics and hormones. Make the healthy choice, our chicken will not disappoint!', price=3.50, type='Meat', owner_id=3)
    lamb = Product(
        name='lamb', description='Our lamb is succulent, flavorful, and perfect for any occasion. Raised on grass-fed diets and free from antibiotics and hormones, our lamb is a healthy and delciious choice for any meal.', price=7.50, type='Meat', owner_id=3)
    milk = Product(
        name='milk', description='Our milk is fresh, creamy, and packed with essential nutrients. Free from artificial hormones and antibiotics.', price=6.50, type='Dairy', owner_id=3)
    cheese = Product(
        name='cheese', description='Our cheese is rich, flavorful, and perfect for any occasion. Made from high-quality milk and crafted using traditional techniques, our cheese is a delicious addition to your meals!', price=7.50, type='Dairy', owner_id=3)
    yogurt = Product(
        name='yogurt', description='Our yogurt is creamy, tangy, and packed with probiotics. Made from high-quality milk and free from artificial perservatives and sweetners, our yogurt is a healthy and delicious choice for any time of day.', price=5.50, type='Dairy', owner_id=3)

    db.session.add(apple)
    db.session.add(banana)
    db.session.add(raspberry)
    db.session.add(blueberry)
    db.session.add(strawberry)
    db.session.add(tomato)
    db.session.add(onion)
    db.session.add(garlic)
    db.session.add(cucumber)
    db.session.add(lettuce)
    db.session.add(beef)
    db.session.add(chicken)
    db.session.add(lamb)
    db.session.add(milk)
    db.session.add(cheese)
    db.session.add(yogurt)
    db.session.commit()
 ## fruit, veg, dairy, meat, bakery

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
