import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addNewProduct } from "../../store/product";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Fruit");

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
    if (price <= 0) {
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
      console.log(type, "TYPE");
      let addedNewProduct;
      addedNewProduct = await dispatch(addNewProduct(productFormInput));

      if (addedNewProduct) {
        history.push(`/products/${addedNewProduct.id}`);
      }
    }

    setName("");
    setDescription("");
    setPrice(0);
    setType("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Farm-to-Table</h1>
      <h2>
        Share the fruits of your labor, showcase your products for all to see!
      </h2>
      <ul className="errors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <h3>What is the name of your product?</h3>
      <p>
        {" "}
        Choose a name that best represents your product so that your customers
        have a clear idea of what they are purchasing. Please be as descriptive
        as possible. you can always edit this later.
      </p>
      <input
        style={{ width: "352px" }}
        type="text"
        name="name"
        placeholder="What is the name of your product?"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h3>What type of product is this? Please select one:</h3>
      <select
        style={{ width: "200px", height: "20px" }}
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value={"Fruit"}>Fruit</option>
        <option value={"Vegetable"}>Vegetable</option>
        <option value={"Dairy"}>Dairy</option>
        <option value={"Meat"}>Meat</option>
        <option value={"Bakery"}>Bakery</option>
      </select>

      <h3>How much does your product cost?</h3>
      <input
        type="number"
        step="0.01"
        name="price"
        value={price}
        placeholder="0"
        onChange={(e) => setPrice(e.target.value)}
      />

      <h3>Describe your product here:</h3>
      <p>
        People will want to know more about what their buying, please describe
        what you're selling to your customers.
      </p>
      <textarea
        style={{ width: "352px", height: "200px" }}
        type="text"
        name="about"
        placeholder="Please write at least 10 characters"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={errors.length > 0}>
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
