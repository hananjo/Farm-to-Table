from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

review_routes = Blueprint('reviews', __name__)

# REMINDERS
# in seeds/__init__.py add an import for review routes and add app.register_blueprint() for review_routes

@review_routes.route('/', methods=["GET"])
def reviews():
    pass
