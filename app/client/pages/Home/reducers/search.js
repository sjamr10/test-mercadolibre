const defaultState = {
  value: null,
};

export const SET_SEARCH_TEXT = 'PRODUCT.SET_SEARCH_TEXT';

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_SEARCH_TEXT: {
      return {
        ...state,
        value: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const Actions = {
  setSearchText: (payload) => (dispatch) => {
    dispatch({ type: 'PRODUCT.SET_SEARCH_TEXT', payload });
  },
};
