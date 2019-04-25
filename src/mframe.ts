import { runScripts } from './utils/script';

interface Config {
  id: string;
  html: string;
}

// interface HTML extends HTMLElement {
//   __microfrontmframe: MicrofrontFrame;
// }


// interface MicrofrontFrame {
//   id?: string;
//   html: string;
// }


function dispose(dom: HTMLElement) {
  const id = dom.getAttribute('microfrontmframe');
  // postMessage(id, 'willDispose').then(() => {
    
  // });
}

function mframe(dom: HTMLElement, config: Config) {
  const { id, html } = config;
  if (dom.getAttribute('microfrontmframe')) {
    return () => dispose(dom);
  }

  const scriptList = [];

  const div = document.createElement('div');
  div.innerHTML = html;

  // script
  const scriptNodes = div.querySelectorAll('script');
  for (let i = 0; i < scriptNodes.length; i++) {
    const node = scriptNodes[i]
    const type = node.getAttribute('type');
    if (!type || type === 'text/javascript') {
      const src = node.getAttribute('src');
      if (src) {
        scriptList.push({
          src,
        });
      } else {
        scriptList.push({
          script: node.innerText,
        });
      }
      node.parentNode.removeChild(node);
    }
  }

  while(div.childNodes.length) {
    dom.appendChild(div.firstChild);
  }
  
  runScripts(scriptList, () => {});

}

export default mframe;
