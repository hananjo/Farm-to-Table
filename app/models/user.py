from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .cart_item import cart_items
from .review import Review
from .product import Product

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    product = db.relationship("Product", secondary=cart_items, back_populates="users")
    # carts = db.relationship("Cart", back_populates="owner")
    review = db.relationship("Review", back_populates="owner" )
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

# join table between user and products
# class Cart(db.Model):
#     __tablename__ = 'carts'

#     userId = db.Column(db.Integer, ForeignKey('users.id'))
#     productId = db.Column(db.Integer, ForeignKey('products.id'))
#     # quantity = db.Column(db.Integer)

#     owner = db.relationship("User")
#     product = db.relationship("Product")
