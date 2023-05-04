from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, SubmitField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description')
    price = FloatField('Price', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
    owner_id = IntegerField('Owner_id', validators=[DataRequired()])
    submit = SubmitField('Submit')
