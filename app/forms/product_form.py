from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField, TextAreaField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    owner_id = IntegerField('Owner_id', validators=[DataRequired()])
    image_url = StringField('Image_url', validators=[DataRequired()])
    submit = SubmitField('Submit')
