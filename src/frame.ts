import runScripts from './script';
import { emit, on, removeId } from './event';
import effect from './effect';

const map = {};
let currentId = 0;

function create(html: string, dom: HTMLElement) {
  const frameId = dom['frame_id'];

  if (map[frameId]) {
    map[frameId].unmount();
  }

  const id = `frame_${++currentId}`;
  dom['frame_id'] = id;

  const scriptList: {src?:string, script?:string}[] = [];
  const domList: ChildNode[] = [];
  const div = document.createElement('div');
  div.innerHTML = html;
  const scriptNodes = div.querySelectorAll('script');

  for (let i = 0; i < scriptNodes.length; i++) {
    const node = scriptNodes[i]
    const type = node.getAttribute('type');
    if (!type || type === 'text/javascript') {
      const src = node.getAttribute('src');
      scriptList.push(src ? {
        src,
      }: {
        script: node.innerText,
      });
      node.parentNode.removeChild(node);
    }
  }

  while(div.childNodes.length) {
    const node = div.firstChild;
    dom.appendChild(node);
    domList.push(node);
  }

  if (scriptList.length > 0) {
    runScripts(scriptList, () => {
      emit({ name: 'mount', id });
    });
  }

  const { effectPromiseFunction, effectCallbackFunction } = effect(() => {
    if (!map[id]) {
      throw new Error(`effect warning: The frame with id "${id}" has been been unmounted and you can ignore this error.`);
    }
  });

  const frame = {
    unmount() {
      emit({ name: 'unmount', id });
      domList.forEach(node => node.parentNode.removeChild(node));
      removeId(id);
      delete map[id];
    },
    on(name: string, cb: any) {
      on({ name, id, cb });
      return this;
    },
    emit(name: string, value: any) {
      emit({ name, id, value });
    },
    effectPromiseFunction,
    effectCallbackFunction,
  };
  map[id] = frame;
  return frame;
}

export { create };
