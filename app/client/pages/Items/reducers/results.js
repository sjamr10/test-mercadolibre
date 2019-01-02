const defaultState = {
  categories: null,
  items: null,
};

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_ITEMS = 'SET_ITEMS';

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    case SET_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const Actions = {
  setCategories: (payload) => (dispatch) => {
    dispatch({ type: 'SET_CATEGORIES', payload });
  },
  setItems: (payload) => (dispatch) => {
    dispatch({ type: 'SET_ITEMS', payload });
  },
};
