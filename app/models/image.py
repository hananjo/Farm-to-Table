from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(2000), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    product = db.relationship("Product", back_populates='image')

def to_dict(self):
    return {
        "id": self.id,
        "image_url": self.image_url,
        "product_id": self.product_id
    }
