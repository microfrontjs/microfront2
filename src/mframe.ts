import { runScripts } from './utils/script';

interface Config {
  id?: string;
  html: string;
}


function mframe(dom: HTMLElement, config: Config) {
  const { id, html } = config;
  const scriptList = [];
  const domList = [];

  const div = document.createElement('div');
  div.innerHTML = html;

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
    const node = div.firstChild;
    dom.appendChild(node);
    domList.push(node);
  }
  
  runScripts(scriptList, () => {});

  return {
    dispose() {
      domList.forEach(node => node.parentNode.removeChild(node));
    }
  }
}

export default mframe;
