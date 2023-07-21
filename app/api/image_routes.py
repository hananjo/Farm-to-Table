from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import Image, Product, db
from app.forms.image_form import ImageForm

image_routes = Blueprint('images', __name__)


@image_routes.route('/', methods={"GET"})
def get_images():
    pass

