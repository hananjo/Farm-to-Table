from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Products(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(50))
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Integer)
    ownerId = db.Column(db.Integer, ForeignKey('usesrs.id'))

