import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export function spread() {
  return <T>(source$: Observable<T[]>) =>
    source$.pipe(
      mergeMap(signal => (Array.isArray(signal) ? signal : of(signal)))
    );
}
