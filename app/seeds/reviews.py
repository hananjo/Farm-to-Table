from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    jessica = Review(
        review='So yummy!', rating=5, product_id=1, user_id=3)
    john = Review(
        review='these were rotten, gross', rating=1, product_id=2, user_id=3)
    david = Review(
        review='perfect fruit in season', rating=5, product_id=3,  user_id=1)
    laila = Review(
        review='will def buy these again', rating=5, product_id=4, user_id=1)
    hanan = Review(
        review='i dont like blueberries but these are delicious', rating=5, product_id=5,  user_id=2)
    justin = Review(
        review='used these for strawberry short cake, super yummy', rating=5, product_id=6, user_id=2)

    db.session.add(jessica)
    db.session.add(john)
    db.session.add(david)
    db.session.add(laila)
    db.session.add(hanan)
    db.session.add(justin)
    db.session.commit()
 ## fruit, veg, dairy, meat, bakery

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
