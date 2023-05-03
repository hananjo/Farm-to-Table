from flask import Blueprint, jsonify, session, request, abort
from app.models import Product, db

product_routes = Blueprint('products', __name__)

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
