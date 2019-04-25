import { mframe } from '../src';


mframe(document.getElementById('microfront_app1'), {
  id: 'app1',
  html: `
    <div>
      <link rel="stylesheet" href="cdn/index.css" />
      <p class="a">This is a app1</a>
    </div>
    <script src="cdn/common.js"></script>
    <script>alert(a)</script>
    <script src="cdn/index.js"></script>
  `
});

mframe(document.getElementById('microfront_app2'), {
  id: 'app2',
  html: `
    <div>
      This is a app2
    </div>
    <script>
      alert('app2');
    </script>
  `
});
