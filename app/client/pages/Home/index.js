import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { AppRegister } from 'app/shared/radioactive';
import reducer from './reducers';

if (!__SSR__) {
  require('offline-plugin/runtime').install();
  require('./styles.scss');
}

// Enable webpack hot module reload on development
if (module.hot) {
  module.hot.accept();
}

const generateStore = (state) => {
  let store;
  if (typeof reducer !== 'undefined') {
    const composeEnhancers =
      (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    store = createStore(reducer, state, composeEnhancers(applyMiddleware(thunk)));
    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  return store;
};

module.exports = AppRegister(generateStore, [
  require(`${__dirname}/components/Views/SearchView`),
]);
