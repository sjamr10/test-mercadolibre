const defaultState = {
  product: {},
};

export const SET_PRODUCT = 'SET_PRODUCT';

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_PRODUCT: {
      return {
        ...state,
        product: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const Actions = {
  setProduct: (payload) => (dispatch) => {
    dispatch({ type: 'SET_PRODUCTS', payload });
  },
};
