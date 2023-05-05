from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    user_id = IntegerField("User_id", validators=[DataRequired()])
    product_id = IntegerField("Product_id", validators=[DataRequired()])
    submit = SubmitField("Submit")
