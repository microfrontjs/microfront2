interface Event {
  name?: string;
  id?: string;
  cb?: (...args: any) => any;
}

const list: Event[] = [];

export function emitId(name: string, id: string | undefined, value?: any) {
  list.forEach(item => {
    if (item.name === name && (typeof id !== undefined ? item.id === id : true)) {
      item.cb(value);
    }
  });
}

export function emit(name: string, value?: any) {
  emitId(name, undefined, value);
}

export function on(event: Event) {
  list.push(event);
}


export function test() {
  const num = (new Function('return num'))();
  alert(num);
}

// export function remove(event: Event) {
//   for (let i = 0; i < list.length; i++) {
//     const item = list[i];
//     if (item.name === name && item.cb === cb) {
//       list.slice(i, 1);
//       return;
//     }
//   }
// }

