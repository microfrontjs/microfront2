(function() {
  console.log('app2');

  app.on('unmount', () => {
    console.log('unload app2');
  }).on('mount', () => {
    console.log('load app2');
  });

})();
