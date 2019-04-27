import runScripts from './script';
import { emit, on, removeId } from './event';

interface Config {
  dom: HTMLElement,
  id?: string;
  html: string;
}


const map = {};
let currentId = 0;

function create(config: Config) {
  const { dom, html } = config;
  const frameId = dom['frame_id'];
  
  if (map[frameId]) {
    map[frameId].dispose();
    delete map[frameId];
  }

  let { id } = config;
  id = id || `frame_${++currentId}`;
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
      emit({
        name: 'load',
        id,
      });
    });
  }


  const obj = {
    id,
    dispose() {
      emit({
        name: 'unload',
        id
      });
      domList.forEach(node => node.parentNode.removeChild(node));
      removeId(id);
    },
    on(name: string, cb: any) {
      on({
        name,
        id,
        cb,
      });
      return this;
    },
    emit(name: string, value: any) {
      emit({
        name,
        id,
        value,
      });
    }
  };
  map[id] = obj;
  return obj;
}

function get(id: string) {
  return map[id];
}

export { create, get };
