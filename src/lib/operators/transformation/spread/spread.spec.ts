import test from 'ava';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { spread } from './spread';

test('spread should spread out an array into multiple signals', t =>
  of([1, 2, 3]).pipe(
    spread(),
    tap(signal => t.true(typeof signal === 'number'))
  ));

test('spread should not spread out a non-array signal', t =>
  of('foo' as any).pipe(
    spread(),
    tap(signal => t.is(signal, 'foo'))
  ));
