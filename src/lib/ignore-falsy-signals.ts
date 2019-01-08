import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const ignoreFalsySignals = () => <T>(source$: Observable<T>) =>
  source$.pipe(filter<T>(signal => !!signal));
