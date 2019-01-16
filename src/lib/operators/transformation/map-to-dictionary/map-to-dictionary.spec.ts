import test from 'ava';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { mapToDictionary } from './map-to-dictionary';

test('mapToDictionary should map an array of objects to a dictionary', t => {
  const stub = { id: '123', foo: 'foo' };
  const dict = { '123': { ...stub } };

  return of([stub]).pipe(
    mapToDictionary(),
    tap(signal => t.deepEqual(signal, dict))
  );
});

test('mapToDictionary should take a string as an IdSelector', t => {
  const stub = { _id: '123', foo: 'foo' };
  const dict = { '123': { ...stub } };

  return of([stub]).pipe(
    mapToDictionary('_id'),
    tap(signal => t.deepEqual(signal, dict))
  );
});

test('mapToDictionary should take a predicate to pick an ID from', t => {
  const stub = { abc: '123', foo: 'foo' };
  const dict = { '123foo': { ...stub } };

  return of([stub]).pipe(
    mapToDictionary(signal => signal.abc + signal.foo),
    tap(signal => t.deepEqual(signal, dict))
  );
});

test('mapToDictionary should return the signal exactly if it is not an array', t => {
  const stub = { abc: '123', foo: 'foo' } as any;

  return of(stub).pipe(
    mapToDictionary(),
    tap(signal => t.deepEqual(signal, stub))
  );
});
