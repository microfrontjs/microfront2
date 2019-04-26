import { runScripts } from './utils/script';
import { emit, on } from './event';

interface Config {
  id?: string;
  html?: string;
  url?: string;
}


const map = {};
let currentId = 0;

function mframe(dom: HTMLElement, config: Config) {
  const mframeId = dom['mframe_id'];
  
  if (map[mframeId]) {
    map[mframeId].dispose();
    delete map[mframeId];
  }

  let { id } = config;
  id = id || `mframe_${++currentId}`;
  dom['mframe_id'] = id;

  const scriptList: {src?:string, script?:string}[] = [];
  const domList: ChildNode[] = [];

  const render = (str: string) => {
    const div = document.createElement('div');
    div.innerHTML = str;
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

    runScripts(scriptList, () => {
      // emit({
      //   name: 'load',
      //   id,
      // });
    });

  }


  const {html, url} = config;

  if (url) {
    fetch(url, {
      credentials: 'include',
    })
    .then(response => response.text())
    .then(text => {
      render(text);
    });
  } else {
    render(html);
  }

  const obj = {
    id,
    dispose() {
      domList.forEach(node => node.parentNode.removeChild(node));
    },
    on(name: string, cb: () => {}) {
      // on({
      //   name,
      //   id,
      //   cb,
      // });
      return this;
    },
    emit(name: string, data: any) {

    },
  };
  map[id] = obj;
  return obj;
}

export default mframe;
