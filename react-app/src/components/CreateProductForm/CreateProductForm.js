import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addNewProduct } from "../../store/product";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CreateProductForm.css";
import { loadReviews } from "../../store/review";
const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Fruit");
  const [image, setImage] = useState('');

  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => {
    return state.session.user.id;
  });

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

    if (!image) {
      validationErrors.push("Please provide an image url")
    }
    setErrors(validationErrors);
  }, [name, description, price, type, image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errors.length) {
      let addedNewProduct;

      const formData = new FormData()

      formData.append("image", image)

      const res = await fetch('/api/products/newImg', {
        method: 'POST',
        body: formData
      })

      console.log("new image url fetch called", res.url);

      if (res.ok) {
        let url = await res.json()
        let img_url = url.url

        console.log(img_url);

        const productFormInput = {
          name,
          description,
          price,
          type,
          owner_id: user,
          image_url: img_url
        };

        addedNewProduct = await dispatch(addNewProduct(productFormInput));

        if (addedNewProduct) {
          history.push(`/products/${addedNewProduct.id}`);
        }
      }

      // const productFormInput = {
      //   name,
      //   description,
      //   price,
      //   type,
      //   owner_id: user,
      //   image_url: image
      // };
      // let addedNewProduct;
      // addedNewProduct = await dispatch(addNewProduct(productFormInput));
    }

    setName("");
    setDescription("");
    setPrice(0);
    setType("");
    setImage("");
  };

  return (
    <form action="/posts/new" method="POST" enctype="multipart/form-data" onSubmit={handleSubmit}>

      <div className="form-title-banner"></div>
      <div className="form-container">
        <div className="form-title">
          <h1>Farm-to-Table</h1>
        </div>
        <div className="sub-title">
          <p>
            Share the fruits of your labor, showcase your products for all to
            see! Fill out what you can for now-- you can always edit this later.
          </p>
        </div>
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
                step="0.01"
                name="price"
                value={price}
                placeholder="0"
                onChange={(e) => setPrice(e.target.value)}
                className="price-input-area"
              />
            </div>
          </div>
        </div>
        <div className="description-container">
          <div className="description-title">
            <h2>Product description</h2>
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

        <div className="image-container">
          <div className="image-title">
            <h2>Image</h2>

          </div>

          <div className="image-and-input">
            <div className="image-area">
              <h3>Upload Image *</h3>
              <p>Upload an image of your product. </p>
            </div>

            <div className="image-input">
              <input
                style={{ height: "40px" }}
                type="file"
                name="image"
                accept="image/*"
                // placeholder="Show us what your product looks like!"
                // value={image}
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="image-input-area"
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
            Create Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProductForm;
