var app;
var dom = document.getElementById('microfront_app');
var button1 = document.querySelector('#app1');
var button2 = document.querySelector('#app2');

var url1 = 'cdn/app1/index.html';
var url2 = 'cdn/app2/index.html';

button1.addEventListener('click', () => {
  window.microfront.mframe(dom, { url: url1 })
});

button2.addEventListener('click', () => {
  window.microfront.mframe(dom, { url: url2 });
});


