import { mframe } from '../src';


let app;


document.querySelector('#app1').addEventListener('click', () => {
  if (app) {
    app.dispose();
  }
  app = mframe(document.getElementById('microfront_app'), {
    html: `
      <div>
        <link rel="stylesheet" href="cdn/index.css" />
        <p class="a">This is a app1</a>
      </div>
      <script src="cdn/app1/common.js"></script>
      <script>console.log('app1 script')</script>
      <script src="cdn/app1/index.js"></script>
    `
  });
});

document.querySelector('#app2').addEventListener('click', () => {
  if (app) {
    app.dispose();
  }
  app = mframe(document.getElementById('microfront_app'), {
    html: `
      <div>
        <link rel="stylesheet" href="cdn/index.css" />
        <p class="a">This is a app2</a>
      </div>
      <script src="cdn/app2/common.js"></script>
      <script>console.log('app2 script')</script>
      <script src="cdn/app2/index.js"></script>
    `
  });
});


