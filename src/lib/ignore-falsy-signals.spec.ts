import test from 'ava';
import { from, of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { ignoreFalsySignals } from './ignore-falsy-signals';

const falsyValues$ = from(['', null, undefined, 0, false, NaN]);
const truthy$ = of(true);

test('hasPropsGuard should return true when the signal has one top level props', t => {
  return falsyValues$.pipe(
    withLatestFrom(truthy$),
    concatMap(arr => from(arr)),
    ignoreFalsySignals(),
    tap(signal => t.truthy(signal))
  );
});
