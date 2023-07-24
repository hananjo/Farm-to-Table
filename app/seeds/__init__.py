from flask.cli import AppGroup
from .users import seed_users, undo_users
from .images import seed_images, undo_images
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .carts import seed_cart_items, undo_cart_items

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_cart_items()
        undo_images()
        undo_reviews()
        undo_products()
        undo_users()
    seed_users()
    seed_products()
    seed_reviews()
    seed_images()
    seed_cart_items()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_cart_items()
    undo_images()
    undo_reviews()
    undo_products()
    undo_users()
