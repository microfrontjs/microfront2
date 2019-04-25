import { mframe } from '../src';


mframe(document.getElementById('root'), {
  id: '1',
  html: `<div>
    <script src="http://127.0.0.1:8080/1.js"></script>
    <div>
      <script>
        alert(a);
      </script>
    </div>
    <script src="http://127.0.0.1:8080/2.js"></script>
  </div>`
});

console.log(mframe)