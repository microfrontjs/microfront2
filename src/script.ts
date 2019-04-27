function loadScript(src, cb) {
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = src;
  const head = document.querySelector('head');
  script.addEventListener('load', () => {
    head.removeChild(script);
    cb();
  });
  head.appendChild(script);
}


function runScripts(list, cb) {
  function runScript(index) {
    if (list.length === index) {
      cb();
      return;
    }
    const obj = list[index];
    if (obj.src) {
      loadScript(obj.src, () => {
        runScript(index + 1);
      });
    } else {
      (new Function(obj.script))();
      runScript(index + 1);
    }
  }
  runScript(0);
}

export default runScripts;