//For adding Item to cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

//For deleting Item from cart
export const deleteCart = (product) => {
  return {
    type: "DELETEITEM",
    payload: product,
  };
};
