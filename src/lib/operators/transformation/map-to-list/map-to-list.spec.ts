import test from 'ava';
import { of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { mapToList } from './map-to-list';

test('mapToList should map a dictionary to a list', t => {
  const stub = { id: 'abc', foo: 'foo' };
  const dict = { abc: { ...stub } };
  const list = [{ ...stub }];

  return of(dict).pipe(
    mapToList(),
    tap(signal => t.deepEqual(signal, list))
  );
});

test('mapToList should let non Dictionary values pass through', t =>
  of(null as any).pipe(
    mapToList(),
    tap(signal => t.deepEqual(signal, null)),

    mapTo(undefined as any),
    mapToList(),
    tap(signal => t.deepEqual(signal, undefined)),

    mapTo(['foo'] as any),
    mapToList(),
    tap(signal => t.deepEqual(signal, ['foo'])),

    mapTo(0 as any),
    mapToList(),
    tap(signal => t.deepEqual(signal, 0)),

    mapTo(1 as any),
    mapToList(),
    tap(signal => t.deepEqual(signal, 1)),

    mapTo(true as any),
    mapToList(),
    tap(signal => t.deepEqual(signal, true))
  ));
