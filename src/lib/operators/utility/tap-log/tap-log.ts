import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function tapLog(name?: string) {
  return (source$: Observable<any>) =>
    source$.pipe(tap(x => console.log(name ? `${name}: ${x}` : x)));
}
