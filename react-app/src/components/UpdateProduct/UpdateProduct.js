import { updateProduct } from "../../store/product";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./UpdateProductForm.css";

const UpdateProductForm = () => {
  const { id } = useParams();
  const products = useSelector((state) => {
    return state?.product.details;
  });
  console.log(products, "PRODUCTS STATE");
  const user = useSelector((state) => {
    return state.session.user.id;
  });
  console.log(user, "USER STATE");
  const [name, setName] = useState(products.name);
  const [description, setDescription] = useState(products.description);
  const [price, setPrice] = useState(products.price);
  const [type, setType] = useState(products.type);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const validationErrors = [];
    if (!name.length) {
      validationErrors.push("Name is required");
    }
    if (description.length < 10) {
      validationErrors.push("Description needs 10 or more characters");
    }
    if (price < 0.01) {
      validationErrors.push("Price is required");
    }
    if (type === "(select one)") {
      validationErrors.push("Product type is required");
    }
    setErrors(validationErrors);
  }, [name, description, price, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.length) {
      const productFormInput = {
        name,
        description,
        price,
        type,
        owner_id: user,
      };
      let updatedProduct;

      updatedProduct = await dispatch(updateProduct(id, productFormInput));

      if (updatedProduct) {
        history.push(`/products/${id}`);
      }
    }
  };

  return products ? (
    <form onSubmit={handleSubmit}>
      <div className="form-title-banner"></div>
      <div className="form-container">
        <h2 className="title">Edit your product</h2>
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="product-name-container">
          <div className="name-title">
            <h2>Product name</h2>
          </div>
          <div className="name-and-input">
            <div className="name-area">
              <h3>Name *</h3>
              <p>
                What is the name of your product? Choose a name that best
                represents your product.
              </p>
            </div>

            <div className="name-input-area2">
              <input
                style={{ height: "40px" }}
                type="text"
                name="name"
                placeholder="What is the name of your product?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="name-input-area"
              />
            </div>
          </div>
        </div>
        <div className="type-container">
          <div className="type-title">
            <h2>Category</h2>
          </div>
          <div className="type-and-input">
            <div className="type-area">
              <h3>Type *</h3>
              <p>What type of product is this?</p>
              <p>Please select one:</p>
            </div>
            <div className="type-options-area">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Fruit"
                  checked={type === "Fruit"}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Fruit</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Vegetable"
                  checked={type === "Vegetable"}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Vegetable</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Meat"
                  checked={type === "Meat"}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Meat</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Dairy"
                  checked={type === "Dairy"}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Dairy</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Bread"
                  checked={type === "Bread"}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>Bread</span>
              </label>
            </div>
          </div>
        </div>

        <div className="price-container">
          <div className="pricing-title">
            <h2>Pricing</h2>
          </div>
          <div className="price-and-input">
            <div className="price-area">
              <h3>Price *</h3>
              <p>How much does your product cost?</p>
            </div>
            <div className="price-input-area2">
              <input
                style={{ height: "40px" }}
                type="number"
                name="price"
                value={price}
                step="0.01"
                placeholder="0"
                onChange={(e) => setPrice(e.target.value)}
                className="price-input-area"
              />
            </div>
          </div>
        </div>

        <div className="description-container">
          <div className="description-title">
            <h2>Product Description</h2>
          </div>
          <div className="description-and-input">
            <div className="description-area">
              <h3>Description *</h3>
              <p>Describe your product here:</p>
              <p>
                People will want to know more about what their buying, please
                describe what you're selling to your customers.
              </p>
            </div>
            <div className="description-input-area">
              <textarea
                style={{ height: "200px" }}
                type="text"
                name="about"
                placeholder="Please write at least 10 characters"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-input-area2"
              />
            </div>
          </div>
        </div>
        <div className="form-submit">
          <button
            className="form-submit-button"
            type="submit"
            disabled={errors.length > 0}
          >
            Update Product
          </button>
        </div>
      </div>
    </form>
  ) : (
    <div>Product Loading...</div>
  );
};

export default UpdateProductForm;
