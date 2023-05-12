from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(10000))
    price = db.Column(db.Float, nullable=False)
    # rating = db.Column(db.Integer)
    type = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))


    owner = db.relationship("User", secondary=add_prefix_for_prod("cart_items"), back_populates="product")
    cart = db.relationship("Cart_Item", back_populates="product", cascade="all, delete-orphan")
    review = db.relationship("Review", back_populates="product", cascade="all, delete-orphan")
    image = db.relationship("Image", back_populates="product", cascade="all, delete-orphan", lazy=True)

    def to_dict(self):

        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'type': self.type,
            'owner_id': self.owner_id,
            'images': [image.to_dict() for image in self.image]
        }
