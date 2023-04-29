from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String
from .user import User
from .product import Product

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(2000))
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey("user.id"))
    product_id = db.Column(db.Integer, ForeignKey("product.id"))

    owner = db.relationship("User", back_populates="review")
    product = db.relationship("Product", back_populates='review')
