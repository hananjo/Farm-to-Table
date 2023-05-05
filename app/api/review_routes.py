from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms.review_form import ReviewForm

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
    form = ReviewForm()

    review = form.review.data
    rating = form.rating.data
    user_id = form.user_id.data
    product_id = form.product_id.data


    new_review = Review(
        review=review,
        rating=rating,
        user_id=user_id,
        product_id=product_id
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({"message": "Review posted!"}, 201)


@review_routes.route('/reviews/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):

    user_id = current_user.id

    review = Review.query.get(id)

    if not review or review.user_id != user_id:
        return jsonify({'error':'Review not found or unauthorized'}, 404)

    db.session.delete(review)
    db.session.commit()

    return jsonify(success=True)
