from flask import Blueprint, jsonify, session, request, abort, redirect, url_for
from app.models import Product, db, Review, Image
from app.forms.product_form import ProductForm
# from sqlalchemy.orm import joinedload
from app.forms.review_form import ReviewForm
from flask_login import login_required, current_user

product_routes = Blueprint('products', __name__,
# url_prefix='/products'
)

@product_routes.route('/')
def get_all_products():
    products = Product.query.all()
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
    return jsonify(id=product.id,
                    name=product.name,
                    description=product.description,
                    price=product.price,
                    type=product.type,
                    owner_id=product.owner_id)


@product_routes.route('/', methods=['POST'])
def create_product():
    form = ProductForm()
    # print(form, 'FORM')
    # print('hello')
    # print(form.price.data, form.type.data, 'TESTING')
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

        db.session.add(new_product)
        db.session.commit()
        # return redirect(url_for('get_product_details', id=new_product.id))
        return new_product.to_dict()

    # return jsonify({'message': 'Invalid data'}), 404

@product_routes.route('/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)
    print(product, 'PRODUCT_UPDATE')
    form = ProductForm()
    print(form, 'FORM_UPDATE')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data
        price = form.price.data
        type = form.type.data
        owner_id = form.owner_id.data

        product.name = name
        product.description = description
        product.price = price
        product.type = type
        product.owner_id = owner_id

        db.session.commit()

        return product.to_dict()
    else:
        return None

@product_routes.route('/<int:id>', methods=['DELETE'])
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
@product_routes.route('/<int:id>/images', methods=["POST"])
@login_required
def add_image(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    product = Product.query.get(id)
    if not productId:
        return jsonify({"error": "Product not found"}, 404)

    image_url = form.image_url.data

    new_image = Image(
        image_url=image_url,
        product_id=product.id
    )

    db.session.add(new_image)
    db.session.commit()

    return jsonify({"message": "Image posted"}, 201)


# DELETE Image
@product_routes.route('/<int:id>/images', methods=["DELETE"])
@login_required
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
