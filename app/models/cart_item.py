from .db import db, environment, SCHEMA, add_prefix_for_prod

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
