from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class CartForm(FlaskForm):
    user_id = IntegerField("User_id", validators=[DataRequired()])
    product_id = IntegerField("Product_id", validators=[DataRequired()])
    quantity = StringField("Quantity", validators=[DataRequired()])
    save = SubmitField('Save')
