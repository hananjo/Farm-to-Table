const LOAD = "/products/LOAD";

const load = (list) => ({
  type: LOAD,
  list,
});

export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");

  if (response.ok) {
    const list = await response.json();
    console.log(list.products, "^^^^^^^^");
    dispatch(load(list.products));
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
    default:
      return state;
  }
};

export default productReducer;
