from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

cart_items = Table(
    "cart_items",
    Base.metadata,
    db.Column("productId", ForeignKey("products.id"), primary_key=True),
    db.Column("userId", ForeignKey("users.id"), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    products = db.relationship("Product", back_populates="users")
    carts = db.relationship("Cart", back_populates="owner")

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



class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(50))
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Integer)
    ownerId = db.Column(db.Integer, ForeignKey('users.id'))

    owner = db.relationship("User", back_populates="product")
    cart = db.relationship("Cart", back_populates="product")




# join table between user and products
# class Cart(db.Model):
#     __tablename__ = 'carts'

#     userId = db.Column(db.Integer, ForeignKey('users.id'))
#     productId = db.Column(db.Integer, ForeignKey('products.id'))
#     # quantity = db.Column(db.Integer)

#     owner = db.relationship("User")
#     product = db.relationship("Product")
