from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review, db


review_routes = Blueprint('reviews', __name__)

# REMINDERS
# in __init__.py add an import for review routes and add app.register_blueprint() for review_routes
# in Review model, include UserMixin, and def to_dict(self): -> return {'id': self.id, 'review':self.review, 'user_id': self.user_id, etc}

@review_routes.route('/', methods=["GET"])
def reviews():
    return {review.id: review.to_dict() for review in Review.query.all}

@review_routes.route('/products/<id>/reviews', methods=["POST"])
@login_required
def add_review():
    user_id = current_user.id

    data = request.json
    review_text = data.get('review', '')
    rating = data.get('rating', '')

    product = Product.query.get(id)

    if not product:
        return jsonify(error='Product not found', 404)

    review = Review(
        review=review_text,
        rating=rating,
        user_id=user_id,
        product_id=product.id
    )

    db.session.add(review)
    db.session.commit()

    return jsonify(review.to_dict())
