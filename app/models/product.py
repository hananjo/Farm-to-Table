from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String
from .user import User
from .cart_item import cart_items
from .review import Review
from .image import Image

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(50))
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Integer)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'))

    owner = db.relationship("User", secondary=cart_items, back_populates="product")
    # cart = db.relationship("Cart", back_populates="product")
    review = db.relationship("Review", back_populates="product")
    image = db.relationship("Image", back_populates="product")
