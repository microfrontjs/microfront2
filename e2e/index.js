var app;
var dom = document.getElementById('microfront_app');
var button1 = document.querySelector('#app1');
var button2 = document.querySelector('#app2');

window.appName = 'app';


var { create, on } = window.microfront;

function render(url) {
  fetch(url, {
    credentials: 'include',
  })
  .then(response => response.text())
  .then(html => {
    create({
      dom,
      id: appName,
      html,
    });
  });
}


button1.addEventListener('click', () => render('cdn/app1/index.html'));
button2.addEventListener('click', () => render('cdn/app2/index.html'));

