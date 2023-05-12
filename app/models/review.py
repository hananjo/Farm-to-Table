from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(10000))
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

    owner = db.relationship("User", back_populates="review")
    product = db.relationship("Product", back_populates='review')

    def to_dict(self):
        return {
            'id': self.id,
            'review': self.review,
            'rating': self.rating,
            'userId': self.user_id,
            'productId': self.product_id
        }
