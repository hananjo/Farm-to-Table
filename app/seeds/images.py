from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_images():
    apple_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664610/apples_yzprms.jpg', product_id=1)
    banana_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664610/banana_gxijb3.jpg', product_id=2)
    raspberry_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/Raspberry_i67vj8.webp', product_id=3)
    blueberry_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683851469/Blueberry-1_cw5yqq.jpg', product_id=4)
    strawberry_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/strawberry_osczdv.jpg', product_id=5)
    tomato_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/tomato_g1uouy.jpg', product_id=6)
    onion_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664612/onion_dkhr4u.jpg', product_id=7)
    garlic_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/garlic_bjob2v.jpg', product_id=8)
    cucumber_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/cucumber_qyc6sj.jpg', product_id=9)
    lettuce_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/lettuce_mc2yye.png', product_id=10)
    beef_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664610/beef_e1aw4d.jpg', product_id=11)
    chicken_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664610/chicken_dnxot6.jpg', product_id=12)
    lamb_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/lamb_ztjhtl.jpg', product_id=13)
    milk_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/milk_rvls4z.jpg', product_id=14)
    cheese_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683664611/cheese_y78koc.jpg', product_id=15)
    yogurt_image = Image(
        image_url='https://res.cloudinary.com/dwphwqyrn/image/upload/v1683851210/yogurt_rtqnj1.jpg', product_id=16)

    db.session.add(apple_image)
    db.session.add(banana_image)
    db.session.add(raspberry_image)
    db.session.add(blueberry_image)
    db.session.add(strawberry_image)
    db.session.add(tomato_image)
    db.session.add(onion_image)
    db.session.add(garlic_image)
    db.session.add(cucumber_image)
    db.session.add(lettuce_image)
    db.session.add(beef_image)
    db.session.add(chicken_image)
    db.session.add(lamb_image)
    db.session.add(milk_image)
    db.session.add(cheese_image)
    db.session.add(yogurt_image)
    db.session.commit()
 ## fruit, veg, dairy, meat, bakery

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
