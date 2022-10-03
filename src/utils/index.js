const goToElementHref = (event) => {
  const href = event.target.getAttributeNode("href").value;
  if (href !== undefined) window.location = href;
};

// eslint-disable-next-line no-underscore-dangle
const _context = ["0"];

const setContext = (el) => _context.push(el) - 1;
const getContext = (i) => _context[i];

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

let id = 1;

// eslint-disable-next-line no-plusplus
const nextId = () => id++;

const stringifyProps = (props, keys = false) =>
  Object.entries(props)
    .reduce((prev, [key, value]) => {
      if ((keys && !keys.include(key)) || value === undefined) {
        return prev;
      }
      if (typeof value === "function") return prev;
      return `${prev} ${key}="${value}"`;
    }, "")
    .trim();

const eventMap = new Map();

const on = (key, cb) => {
  let handlers = eventMap.get(key);
  if (!handlers) {
    handlers = [];
  }
  handlers.push(cb);
  eventMap.set(key, handlers);
};

const emit = (key, payload) => {
  const handlers = eventMap.get(key);
  if (!Array.isArray(handlers)) return;
  handlers.forEach((handler) => {
    handler(payload);
  });
};

const useEventBus = [on, emit];

export { uid, nextId, goToElementHref, stringifyProps, getContext, setContext, useEventBus };
