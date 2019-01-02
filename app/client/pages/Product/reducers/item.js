const defaultState = {
  item: null,
};

export const SET_ITEM = 'SET_ITEM';

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_ITEM: {
      return {
        ...state,
        item: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const Actions = {
  setItem: (payload) => (dispatch) => {
    dispatch({ type: 'SET_ITEM', payload });
  },
};
