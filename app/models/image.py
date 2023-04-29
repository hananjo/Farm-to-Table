from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String
from .product import Product

class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    imageurl = db.Column(db.String(2000), nullable=False)
    productId = db.Column(db.Integer, ForeignKey("products.id"))

    product = db.relationship("Product", back_populates='image')
