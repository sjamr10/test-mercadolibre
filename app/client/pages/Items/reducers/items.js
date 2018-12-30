const defaultState = {
  items: [],
};

export const SET_ITEMS = 'SET_ITEMS';

export default function (state = defaultState, action) {
  switch (action.type) {
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
  setItems: (payload) => (dispatch) => {
    dispatch({ type: 'SET_ITEMS', payload });
  },
};
