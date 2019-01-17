import { Observable, of, OperatorFunction } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

export function stagger<T>(time: number = 0): OperatorFunction<T, T> {
  return (source$: Observable<T>) =>
    source$.pipe(concatMap(signal => of(signal).pipe(delay(time))));
}
