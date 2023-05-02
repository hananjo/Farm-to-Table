from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

cart_items = Table(
    "cart_items",
    db.metadata,
    db.Column("product_id", db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
    db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True)
)

if environment == "production":
        __table_args__ = {'schema': SCHEMA}
