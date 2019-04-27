interface Event {
  name: string;
  id?: string;
  value?: any;
  cb?: (...args: any) => any;
}

const list: Event[] = [];

export function emit(event: Event) {
  const { name, id, value } = event;
  list.forEach(item => {
    if (item.name === name && (typeof id !== 'undefined' && typeof item.id !== 'undefined' ? item.id === id : true)) {
      item.cb(value);
    }
  });
}


export function on(event: Event) {
  list.push(event);
}

export function removeId(id: string) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.id === id) {
      list.splice(i, 1);
      i--;
    }
  }
}
