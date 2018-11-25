import _has from 'lodash.has';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export function hasPropsGuard<T>(
  signal: T,
  args: string[]
): signal is Required<T> {
  for (const arg of args) {
    if (!_has(signal, arg)) {
      return false;
    }
  }

  return true;
}

export function hasProps<T>(...args: string[]) {
  return (source$: Observable<T>) =>
    source$.pipe(
      mergeMap((signal: T) =>
        hasPropsGuard(signal, args)
          ? of(signal)
          : throwError(
              new Error(
                'Signal was missing required property. Check the interface of the signal for the properties being asked for.'
              )
            )
      )
    );
}
