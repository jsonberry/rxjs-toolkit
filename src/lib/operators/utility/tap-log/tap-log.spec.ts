import test from 'ava';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { tapLog } from './tap-log';

/**
 * AVA does not have built in stubs
 * These should get tested with stubs/spies
 */

test('tapLog should log the signal to the console', t => {
  return of('tapLog no name test - this console.log is expected').pipe(
    tapLog(),
    tap(x => {
      t.is(x, 'tapLog no name test - this console.log is expected');
    })
  );
});

test('tapLog should log the signal to the console with a name', t => {
  return of(
    'there should be a name before this, this console.log is expected'
  ).pipe(
    tapLog('tapLog name test'),
    tap(x => {
      t.is(
        x,
        'there should be a name before this, this console.log is expected'
      );
    })
  );
});
