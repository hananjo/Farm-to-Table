const LOAD = "/products/LOAD";
const ADD_PRODUCT = "/products/ADD_PRODUCT";
const LOAD_DETAILS = "/products/LOAD_DETAILS";
const REMOVE_PRODUCT = "/products/REMOVE_PRODUCT";

const load = (list) => ({
  type: LOAD,
  list,
});

const loadDetails = (id) => ({
  type: LOAD_DETAILS,
  id,
});

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

const removeProduct = (product) => ({
  type: REMOVE_PRODUCT,
  product,
});

export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");

  if (response.ok) {
    const list = await response.json();
    // console.log(list.products, "^^^^^^^^");
    dispatch(load(list.products));
  }
};

export const getProductsByCategory = (category) => async (dispatch) => {
  const response = await fetch(`/api/products/${category}`);

  if (response.ok) {
    const list = await response.json();
    console.log(list.products, "^^^^^^^^");
    dispatch(load(list.products));
  }
};

export const addNewProduct = (data) => async (dispatch) => {
  const { owner_id, price, description, name, type, image_url } = data;
  //   console.log(data, "*****");
  //   console.log(typeof data.price === "string");
  //   console.log(data.type);
  //   data.price = parseFloat(data.price);

  const response = await fetch("/api/products/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      price: Number(price),
      description,
      name,
      type,
      owner_id,
      image_url
    }),
  });
  let product;
  if (response.ok) {
    product = await response.json();
    // console.log(product, "PRODUCT");
    dispatch(addProduct(product));
    return product;
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`);
  if (response.ok) {
    const product = await response.json();
    dispatch(loadDetails(product));
  }
};

// export const getProductImage = (id) => async (dispatch) => {
//   const response = await fetch(`/api/products/${id}/images`);
//   if (response.ok) {
//     const product = await response.json();
//     dispatch(loadDetails(product));
//   }
// };
export const updateProduct = (id, data) => async (dispatch) => {
  const { owner_id, name, description, type, price, image_url } = data;
  // console.log(data, "DATA****");
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      price: Number(price),
      type,
      owner_id,
      image_url
    }),
  });
  if (response.ok) {
    const product = await response.json();

    dispatch(addProduct(product));
    return product;
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  console.log(response, "DELETE RESPONSE");
  if (response.ok) {
    const product = await response.json();
    dispatch(removeProduct(product));
  }
};
const initialState = {};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      action.list.forEach((product) => {
        newState[product.id] = product;
      });
      return {
        ...newState,
      };
    case ADD_PRODUCT:
      return { ...state, [action.product.id]: action.product };
    case LOAD_DETAILS:
      return { ...state, details: action.id };
    case REMOVE_PRODUCT:
      const deleteNewState = { ...state };
      delete deleteNewState[action.product.id];
      return deleteNewState;
    default:
      return state;
  }
};

export default productReducer;
