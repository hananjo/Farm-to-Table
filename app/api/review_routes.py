from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review


review_routes = Blueprint('reviews', __name__)

# REMINDERS
# in __init__.py add an import for review routes and add app.register_blueprint() for review_routes
# in Review model, include UserMixin, and def to_dict(self): -> return {'id': self.id, 'review':self.review, 'user_id': self.user_id, etc}

@review_routes.route('/', methods=["GET"])
def reviews():
    return {review.id: review.to_dict() for review in Review.query.all}
