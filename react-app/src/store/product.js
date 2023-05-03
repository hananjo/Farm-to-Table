const LOAD = "/products/LOAD";
const LOAD_DETAILS = "/products/LOAD_DETAILS";

const load = (list) => ({
  type: LOAD,
  list,
});

const loadDetails = (id) => ({
    type: LOAD_DETAILS,
    id,
});

export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");

  if (response.ok) {
    const list = await response.json();
    console.log(list.products, "^^^^^^^^");
    dispatch(load(list.products));
  }
};

export const getProductDetails = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`);
    if (response.ok) {
        const product = await response.json();
        dispatch(loadDetails(product));
    }
}
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
      case LOAD_DETAILS:
        return { ...state, details: action.id}
    default:
      return state;
  }
};

export default productReducer;
