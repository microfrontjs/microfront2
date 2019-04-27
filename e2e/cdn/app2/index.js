console.log('app2 index.js');

var frame = microfront.get(window.appName);

frame.on('unload', () => {
  alert('unload app2');
}).on('load', () => {
  alert('load app2');
});
