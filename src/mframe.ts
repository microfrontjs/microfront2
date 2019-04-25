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
  const headList = [];
  const bodyList = [];

  const div = document.createElement('div');
  div.innerHTML = html;

  const scriptNodes = [...div.querySelectorAll('script')];
  scriptNodes.forEach(node => {
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
    } else {
      bodyList.push(node);
    }
  });

  runScripts(scriptList, () => {});

}

export default mframe;
