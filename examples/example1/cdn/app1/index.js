(function() {
  console.log('app1');

  app.on('unmount', () => {
    console.log('unload app1');
  }).on('mount', () => {
    console.log('load app1');
  });

  var fetch = app.effectPromiseFunction(window.fetch);
  fetch('/').then(response => response.text()).then(text => {
    console.log('fetch');
  });

  var setTimeout = app.effectCallbackFunction(window.setTimeout);

  setTimeout(function() {
    console.log('setTimeout app1');
  }, 1000);

})();
