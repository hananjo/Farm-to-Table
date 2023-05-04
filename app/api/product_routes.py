from flask import Blueprint, jsonify, session, request, abort, redirect, url_for
from app.models import Product, db
from app.forms.product_form import ProductForm

product_routes = Blueprint('products', __name__,
# url_prefix='/products'
)

@product_routes.route('/')
def get_all_products():
    products = Product.query.all()
    product_list = []
    for product in products:
        product_dict = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'type': product.type,
            'owner_id': product.owner_id
        }
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
        print('hello2')
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
