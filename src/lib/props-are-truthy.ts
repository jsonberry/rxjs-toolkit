import _get from 'lodash.get';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { objectKeys } from './utils';

function allPropsTruthy<T extends object>(o: T): boolean {
  return objectKeys(o)
    .map(key => o[key])
    .every(Boolean);
}

function pathNotTruthy(object: object, path: string): boolean {
  return !!!_get(object, path);
}

export function propsAreTruthy(...paths: string[]) {
  return <T extends object>(stream$: Observable<T>) =>
    stream$.pipe(
      map((signal: T) => {
        if (!signal) {
          // if for some reason we want to check for typeof 'undefined' in the stream
          return signal;
        }

        if (!paths.length) {
          return (allPropsTruthy(signal) && signal) || false;
        }

        for (const path of paths) {
          if (pathNotTruthy(signal, path)) {
            return false;
          }
        }

        return signal;
      })
    );
}
