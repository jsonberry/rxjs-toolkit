import test from 'ava';
import { pairwise, tap, timestamp } from 'rxjs/operators';
import { delayedCollection } from './delayed-collection';

test('delayedCollection should emit two signals 500ms apart', t => {
  return delayedCollection([['foo', 500], ['bar', 500]]).pipe(
    timestamp(),
    pairwise(),
    tap(([a, b]) => {
      // these can be over by a ~few milliseconds
      // that's acceptable
      const diff = Math.round((b.timestamp - a.timestamp) / 100);
      t.is(diff, 5);
    })
  );
});
