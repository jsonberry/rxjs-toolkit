import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const neverNullableErrorMessage = 'Signal was nullable';

export function isNonNullable<T>(signal: T): signal is NonNullable<T> {
  return signal !== null && signal !== undefined;
}

export function neverNullable<T>(source$: Observable<T>) {
  return source$.pipe(
    mergeMap((signal: T) =>
      isNonNullable(signal)
        ? of(signal)
        : throwError(new Error(neverNullableErrorMessage))
    )
  );
}
