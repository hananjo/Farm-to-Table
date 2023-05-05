const LOAD = "/products/LOAD";
const ADD_PRODUCT = "/products/ADD_PRODUCT";
const LOAD_DETAILS = "/products/LOAD_DETAILS";

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

export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");

  if (response.ok) {
    const list = await response.json();
    console.log(list.products, "^^^^^^^^");
    dispatch(load(list.products));
  }
};

export const addNewProduct = (data) => async (dispatch) => {
  const response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
  //   console.log(response, "RESPONSE");
  if (response.ok) {
    const product = await response.json();
    console.log(product, "PRODUCT");
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

export const updateProduct = (id, data) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const product = await response.json();
    dispatch(addProduct(product));
    return product;
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
    default:
      return state;
  }
};

export default productReducer;
