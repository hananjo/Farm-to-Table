from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        review='I absolutely love the apples! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=1, user_id=2)
    review2 = Review(
        review='Unfortunately, the apples I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=1, user_id=3)
    review3 = Review(
        review='I absolutely love the bananas I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=2, user_id=2)
    review4 = Review(
        review='Unfortunately, the bananas I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=2, user_id=3)
    review5 = Review(
        review='I absolutely love the raspberries I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=3, user_id=2)
    review6 = Review(
        review='Unfortunately, the raspberries I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=3, user_id=3)
    review7 = Review(
        review='I absolutely love the blueberries I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=4, user_id=2)
    review8 = Review(
        review='Unfortunately, the blueberries I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=4, user_id=3)
    review9 = Review(
        review='I absolutely love the strawberries I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=5, user_id=2)
    review10 = Review(
        review='Unfortunately, the strawberries I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=5, user_id=3)
    review11 = Review(
        review='I absolutely love the tomatoes I receieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=6, user_id=1)
    review12 = Review(
        review='Unfortunately, the tomatoes I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=6, user_id=3)
    review13 = Review(
        review='I absolutely love the onion I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=7, user_id=1)
    review14 = Review(
        review='Unfortunately, the onion I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=7, user_id=3)
    review15 = Review(
        review='I absolutely love the garlic I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=8, user_id=1)
    review16 = Review(
        review='Unfortunately, the garlic I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=8, user_id=3)
    review17 = Review(
        review='I absolutely love the cucumber I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=9, user_id=1)
    review18 = Review(
        review='Unfortunately, the cucumber I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=9, user_id=3)
    review19 = Review(
        review='I absolutely love the lettuce I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=10, user_id=1)
    review20 = Review(
        review='Unfortunately, the lettuce I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=10, user_id=3)
    review21 = Review(
        review='I absolutely love the beef I received! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=11, user_id=2)
    review22 = Review(
        review='Unfortunately, the beef I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=11, user_id=1)
    review23 = Review(
        review='I absolutely love the chicken I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=12, user_id=2)
    review24 = Review(
        review='Unfortunately, the chicken I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=12, user_id=1)
    review25 = Review(
        review='I absolutely love the lamb I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=13, user_id=1)
    review26 = Review(
        review='Unfortunately, the lamb I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=13, user_id=2)
    review27 = Review(
        review='I absolutely love the milk I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=14, user_id=1)
    review28 = Review(
        review='Unfortunately, the milk I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=14, user_id=2)
    review29 = Review(
        review='I absolutely love the cheese I recieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=15, user_id=1)
    review30 = Review(
        review='Unfortunately, the cheese I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=15, user_id=2)
    review31 = Review(
        review='I absolutely love the yogurt I receieved! I thought these were going to dissapoint, but it was far from it! def going to buy again', rating=5, product_id=16, user_id=1)
    review32 = Review(
        review='Unfortunately, the yogurt I recieved were quite disappointing. They were not as fresh as I expected them to be.', rating=2, product_id=16, user_id=2)




    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)
    db.session.add(review31)
    db.session.add(review32)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
