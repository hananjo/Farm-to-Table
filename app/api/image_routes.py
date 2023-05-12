from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import Image, Product, db
from app.forms.image_form import ImageForm

image_routes = Blueprint('images', __name__)


@image_routes.route('/', methods={"GET"})
def get_images():
    pass

# Add Image
# @image_routes.route('/products/<int:id>/images', methods=["POST"])
# @login_required
# def add_images():
#     form = ImageForm()

#     image_url = form.image_url.data
#     product_id = form.product_id.data

#     new_image = Image(
#         image_url=image_url,
#         product_id=product_id
#     )

#     db.session.add(new_image)
#     db.session.commit()

#     return jsonify({"message": "Photo posted!"}, 201)

# Delete Image
# @image_routes.route('/images/<int:id>', methods=["DELETE"])
# @login_required
# def delete_image(id):

#     user_id = current_user.id

#     image = Image.query.get(id)

#     if not image or image.product.user_id != user_id:
#         return jsonify({'error': 'Image not found or unauthorized'}, 404)

#     db.session.delete(image)
#     db.session.commit()

#     return jsonify(success=True)
