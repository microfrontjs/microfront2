function render(id) {
  fetch(`cdn/${id}/index.html`)
  .then(response => response.text())
  .then(html => {
    window.app = microfront.create(
      html,
      document.querySelector('#microfront_app'),
    );
  });
}

document.querySelector('#app1').addEventListener('click', () => render('app1'));
document.querySelector('#app2').addEventListener('click', () => render('app2'));

