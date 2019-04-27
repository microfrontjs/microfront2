import { create, get } from './frame';
import { emit as eventEmit, on as eventOn } from './event';

function emit(name: string, value: any) {
  eventEmit({name, value});
}

function on(name: string, cb: any) {
  eventOn({name, cb });
}

export { create, get, emit, on };

