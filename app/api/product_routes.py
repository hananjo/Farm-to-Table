from flask import Blueprint, jsonify, session, request
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
    print(products, '*****')
    return jsonify({'products': product_list})
