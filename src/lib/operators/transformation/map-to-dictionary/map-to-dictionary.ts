import { Dictionary } from '@app/models';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapToDictionary<T>(
  idSelector?: string | ((signal: T) => number | string)
): OperatorFunction<T[], Dictionary<T>> {
  return (source$: Observable<T[]>): Observable<Dictionary<T>> =>
    source$.pipe(
      map(signal => {
        if (!Array.isArray(signal)) {
          return signal;
        }

        return signal.reduce(
          (acc, curr: any) => ({
            ...acc,
            [typeof idSelector === 'function'
              ? idSelector(curr)
              : curr[typeof idSelector === 'string' ? idSelector : 'id']]: curr
          }),
          {}
        );
      })
    );
}
