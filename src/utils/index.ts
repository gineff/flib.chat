
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

const goToElementHref = (event: HTMLElementEvent<HTMLButtonElement>) :void => {
  const {target} = event;
  const href = target!.getAttribute("href");
  window.location = href;
};

// eslint-disable-next-line no-underscore-dangle
const _context = ["0"];

const setContext = (el: any): number => _context.push(el) - 1;
const getContext = (i: number): any => _context[i];

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

let id = 1;

// eslint-disable-next-line no-plusplus
const nextId = (): number => id++;

const stringifyProps = (props: P, keys : string[]) =>
  Object.entries(props)
    .reduce((prev, [key, value]) => {

      if ((keys && !keys.includes(key)) || value === undefined) {
        return prev;
      }
      if (typeof value === "function") return prev;
      return `${prev} ${key}="${value}"`;
    }, "")
    .trim();

const eventMap = new Map();

const on = (key: string, cb: Function) => {
  let handlers = eventMap.get(key);
  if (!handlers) {
    handlers = [];
  }
  handlers.push(cb);
  eventMap.set(key, handlers);
};

const emit = (key: string, payload: any) => {
  const handlers = eventMap.get(key);
  if (!Array.isArray(handlers)) return;
  handlers.forEach((handler) => {
    handler(payload);
  });
};

const useEventBus = [on, emit];

export { uid, nextId, goToElementHref, stringifyProps, getContext, setContext, useEventBus };
