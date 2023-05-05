from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    image_url = StringField("Image", validators=[DataRequired()])
    product_id = IntegerField("Product_id", validators=[DataRequired()])
