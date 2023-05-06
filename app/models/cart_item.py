from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

class Cart_Item(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    product = db.relationship("Product", back_populates='cart')
    user = db.relationship("User", back_populates='cart')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'product_id': self.product.to_dict(),
            'quantity': self.quantity
        }
