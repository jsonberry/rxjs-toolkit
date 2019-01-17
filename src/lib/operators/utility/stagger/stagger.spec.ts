import test from 'ava';
import { from } from 'rxjs';
import { pairwise, tap, timestamp } from 'rxjs/operators';
import { stagger } from './stagger';

/**
 * TODO: Replace these tests with testScheduler tests
 */

test('stagger when given no arguments should delay signals by 0ms', t =>
  from([1, 2]).pipe(
    stagger(),
    timestamp(),
    pairwise(),
    tap(([a, b]) => {
      const diff = (b.timestamp - a.timestamp) / 1000;
      const closeTo0msDiff = diff < 0.01;

      t.truthy(closeTo0msDiff);
    })
  ));

test('stagger when given 100 should delay signals by 100ms', t =>
  from([1, 2]).pipe(
    stagger(100),
    timestamp(),
    pairwise(),
    tap(([a, b]) => {
      const diff = (b.timestamp - a.timestamp) / 1000;
      const within100thOfAMs = diff >= 0.1 && diff < 0.11;
      t.truthy(within100thOfAMs);
    })
  ));
