const defaultState = {
  results: [],
};

export const SET_RESULTS = 'SET_RESULTS';

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_RESULTS: {
      return {
        ...state,
        results: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const Actions = {
  setResults: (payload) => (dispatch) => {
    dispatch({ type: 'SET_RESULTS', payload });
  },
};
