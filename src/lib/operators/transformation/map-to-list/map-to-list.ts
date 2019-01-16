import { Dictionary } from '@app/models';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { objectKeys } from '../../../utils';

export function mapToList<T>(): OperatorFunction<Dictionary<T>, T[]> {
  return (source$: Observable<Dictionary<T>>): Observable<T[]> =>
    source$.pipe(
      map(signal => {
        if (!signal || typeof signal !== 'object' || Array.isArray(signal)) {
          return signal;
        }

        return objectKeys(signal).map(id => signal[id]);
      })
    );
}
