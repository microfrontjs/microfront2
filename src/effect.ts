export default check => {
  const effectPromiseFunction = fn => (...args) => fn(...args).then(value => {
    check()
    return value;
  });

  const effectCallbackFunction = fn => (...args) => {
    args.forEach((item, i) => {
      if (typeof item === 'function') {
        args[i] = function(...parasm) {
          check();
          item(parasm);
        }
      }
    });
    fn(...args);
  };

  return {
    effectPromiseFunction,
    effectCallbackFunction,
  }
}