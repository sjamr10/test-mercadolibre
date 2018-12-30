const React = require('react');
const { Provider } = require('react-redux');
const { hydrate, render } = require('react-dom');
const { renderToString } = require('react-dom/server');

const buildComponentToRender = (source) => {
  const { store } = source.META;
  const Component = source.default;
  const ComponentWithStore = () => (
    <Provider store={store}>
      <Component />
    </Provider>
  );
  const ComponentWithoutStore = () => <Component />;
  return store ? ComponentWithStore() : ComponentWithoutStore();
};

class SSR {
  components = [];

  requireApp(appName, state) {
    try {
      const path = '../client/pages/';
      const app = require(`${path}${appName}`);
      this.components = [...this.components, ...app(state)];
    } catch (err) {
      console.error(err);
    }
  }

  mountComponent(name) {
    const defaultItem = {
      META: {},
    };
    const source = this.components.reduce((accumulator, item = defaultItem) => {
      if (item.META.name === name) {
        return item;
      }

      return accumulator;
    }, null);

    if (source === null) {
      return `Component ${name} is not registered`;
    }

    const useSSR = source.META.ssr === undefined || source.META.ssr;
    return useSSR ? renderToString(buildComponentToRender(source)) : '';
  }
}

class Renderer {
  constructor() {
    this.components = [];
  }

  register(components, store) {
    const componentsToRegister = components.map((component) => {
      const c = component;
      c.META.store = store;
      return c;
    });
    this.components = [...this.components, ...componentsToRegister];
  }

  render() {
    if (__SSR__) {
      return this.components;
    }

    return this.components.forEach((component) => {
      const componentTarget = document.querySelector(component.META.target);
      if (componentTarget !== null) {
        const hasSsr = component.META.ssr || true;
        const renderFN = hasSsr ? hydrate : render;
        renderFN(buildComponentToRender(component, this.store), componentTarget);
      } else {
        const { name, target } = component.META;
        console.log(`Component ${name} cannot find target ${target}`);
      }
    });
  }
}

const AppRegister = (generateStore, componentList) => {
  const radio = new Renderer();
  const localRender = (state) => {
    const store = generateStore(state);
    radio.register(componentList, store);

    return radio.render();
  };

  let renderFN = localRender;
  if (!__SSR__) {
    renderFN = localRender(window.__REACT_STATE__);
  }

  return renderFN;
};

module.exports = {
  SSR,
  Renderer,
  AppRegister,
};
