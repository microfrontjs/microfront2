# microfront

A JavaScript library for building "micro frontends".


### How to use
```html
<div id="app"></div>
<script src="dist/microfront.umd.js"></script>
<script>
  microfront.create(
    '<div>This is app1</div>',
    document.getElementById('app')
  );
</script>
```

You can also use es6

```js
import { create } from 'microfront'
```

### api

#### create(html: stirng, dom: HTMLElement)

Create a "micro app" which will load html and js just like an iframe but is not a real iframe,and return an object with the following methods:


"html" can contain script, style, link and other html tags

```js
create(
  `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://cdn/index.css" />
      </head>
      <body>
        <div>app</div>
      </body>
      <script src="http://cdn/index.js"></script>
      <script>
        console.log('app');
      </script>
    </head>
  `, dom);
```


- unmount()
  Unmount the app

- on(name: string, cb: any)

  Built in two events: "mount" and "unmount"
  mount: when all html scripts are loaded
  unmount: when calling the app's unmount method

```js
app.on('mount', () => {
  // mount
}).on('unmount', () => {
  // unmount
});
```

- emit(name: string, value: any)

  Emit event

```js
app.on('custom', () => {})
app.emit('custom');
```

- effectPromiseFunction(fn: any)

  Let the function returns promise be processed according to the app state, if the app has been unmounted, the promise will be rejected.

```js
var customFetch = effectPromiseFunction(window.fetch);

customFetch(url)
  .then(response => response.text())
  .then(text => console.log(text))
```

- effectCallbackFunction(fn: any)

  Let the callback function be processed according to the app state, if the app has been unmounted, the callback method will not be called.

```js
var customSetTimeout = effectCallbackFunction(window.setTimeout);

customSetTimeout(() => {
  console.log('app');
}, 1000);
```

### Development

```
$ yarn
$ yarn dev
$ open http://localhost:5000/examples/example1/
```