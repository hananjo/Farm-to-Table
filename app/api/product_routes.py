from flask import Blueprint, jsonify, session, request, abort, redirect, url_for
from app.models import Product, db, Review, Image
from app.forms.product_form import ProductForm
from app.forms.image_form import ImageForm
from app.forms.review_form import ReviewForm
from app.forms import NewImageForm
from flask_login import login_required, current_user
from app.aws import (upload_file_to_s3, get_unique_filename)

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
    products = Product.query.all()
    product_list = []
    for product in products:
        product_dict = product.to_dict()
        product_list.append(product_dict)

    return jsonify({'products': product_list})

@product_routes.route('/<category>')
def get_products_by_category(category):
    print("*********category received from route is", category)
    products = Product.query.filter(Product.type == category)
    product_list = []
    for product in products:
        product_dict = product.to_dict()
        product_list.append(product_dict)

    return jsonify({'products': product_list})

@product_routes.route('/<int:id>')
def get_product_details(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(product.to_dict())


@product_routes.route('/', methods=['POST'])
@login_required
def create_product():

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        print('hello2', '&*******')
        name = form.name.data
        description = form.description.data
        price = form.price.data
        type = form.type.data
        owner_id = form.owner_id.data

        new_product = Product(
            name=name,
            description=description,
            price=price,
            type=type,
            owner_id=owner_id
        )

        image_url = form.image_url.data
        if image_url:
            new_image = Image(image_url=image_url)
            db.session.add(new_image)
            new_product.image.append(new_image)


        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()
    return None

@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    product = Product.query.get(id)

    image = Image.query.get(id)
    print(image, '@@@@@@@@@@@@@@ IMAGE @@@@@@@@@@@@@')
    form = ProductForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data
        price = form.price.data
        type = form.type.data
        owner_id = form.owner_id.data
        image_url = form.image_url.data

        product.name = name
        product.description = description
        product.price = price
        product.type = type
        product.owner_id = owner_id


        image.image_url = image_url
        # new_image = Image(image_url=image_url, product_id=product.id)
        # product.image_url = new_image.image_url
        # db.session.add(new_image)
        # product.image.append(new_image)

        db.session.commit()
        product.image.image_url = image_url
        db.session.commit()

        return product.to_dict()
    else:
        return None

@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    print(product, 'PRINT PRODUCT *********')
    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Successfully deleted product'})


# ADD Review
@product_routes.route('/<int:id>/reviews', methods={"POST"})
@login_required
def add_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    review = form.review.data
    rating = form.rating.data
    user_id = form.user_id.data
    product_id = id

    new_review = Review(
        review=review,
        rating=rating,
        user_id=user_id,
        product_id=product_id
    )

    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict();


# GET Product Reviews
@product_routes.route('/<int:id>/reviews', methods=["GET"])
def get_reviews(id):
    reviews = Review.query.filter_by(product_id=id).all()
    return jsonify([review.to_dict() for review in reviews])


# ADD Image
# @product_routes.route('/<int:id>/images', methods=["POST"])
# # @login_required
# def add_image(id):
#     form = ImageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     product = Product.query.get(id)
#     if not product:
#         return jsonify({"error": "Product not found"}, 404)

#     image_url = form.image_url.data

#     new_image = Image(
#         image_url=image_url,
#         product_id=product.id
#     )

#     db.session.add(new_image)
#     db.session.commit()

#     return new_image.to_dict()


# EDIT Image
# @product_routes.route('/<int:id>/images', methods=["PUT"])
# # @login_required
# def edit_image(id):
#     image = Image.query.get(id)

#     form = ImageForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         image_url = form.image_url.data
#         product_id = form.product_id.data

#         image.image_url = image_url
#         image.product_id = product_id

#         db.session.commit()

#         return image.to_dict()
#     else:
#         return None


# DELETE Image
@product_routes.route('/<int:id>/images', methods=["DELETE"])
# @login_required
def delete_image(id):

    user_id = current_user.id

    image = Image.query.get(id)

    if not image or image.product.user_id != user_id:
        return jsonify({'error': "Image not found or unauthorized"}, 404)

    db.session.delete(image)
    db.session.commit()

    return jsonify({"message": "Image successfully deleted"}, 200)

# GET images
@product_routes.route('/<int:id>/images', methods=["GET"])
def get_images(id):
    images = Image.query.filter_by(product_id=id).all()
    return jsonify([image.to_dict() for image in images])

@product_routes.route('/newImg', methods=["POST"])
def add_url():
    iForm = NewImageForm()

    image = iForm.data['image']

    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", image)

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2", upload)

    # url = upload["url"]

    # newImg = Image(url = url, product_id = id)

    # db.session.add(newImg)
    # db.session.commit()

    return upload
