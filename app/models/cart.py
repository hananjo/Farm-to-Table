from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# join table between user and products
class Cart(db.Model):
    __tablename__ = 'carts'

    userId = db.Colulmn(db.Integer, ForeignKey('users.id'))
    quantity = db.Column(db.Integer)
    productId = db.Column(db.Integer, ForeignKey('products.id'))

    owner = db.relationship("User", back_populates="carts")
    products = db.relationship("Product", back_populates="carts")


# class CartItem(db.Model):
#     __tablename__ = 'cart_items'

#     id = db.Column(db.Integer, primary_key)
