console.log('app1 index.js');

var frame = microfront.get(window.appName);

frame.on('unload', () => {
  alert('unload app1');
}).on('load', () => {
  alert('load app1');
});
