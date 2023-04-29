from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    apple = Product(
        name='apple', description='granny apple', price=.50, type='fruit', owner_id=1)
    banana = Product(
        name='banana', description='5 yellow bananas in a bunch', price=3, type='fruit', owner_id=1)
    pear = Product(
        name='pear', description='green and yellow pears', price=.50, type='fruit', owner_id=2)
    oranges = Product(
        name='oranges', description='orange oranges from Florida', price=.50, type='fruit', owner_id=2)
    blueberries = Product(
        name='blueberries', description='very blue blueberries', price=5, type='fruit', owner_id=3)
    strawberries = Product(
        name='strawberries', description='large red strawberries', price=6, type='fruit', owner_id=3)

    db.session.add(apple)
    db.session.add(banana)
    db.session.add(pear)
    db.session.add(oranges)
    db.session.add(blueberries)
    db.session.add(strawberries)
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
