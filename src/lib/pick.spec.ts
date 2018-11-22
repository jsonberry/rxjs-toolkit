import test from 'ava';
import { of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { pick } from './pick';

const fixture = { foo: 'foo', bar: 'bar', baz: 'baz', orb: { rob: 'bro' } };

test('pick should pick one or more properties from an object', t => {
  return of(fixture).pipe(
    pick('foo'),
    tap(x => t.deepEqual(x, { foo: 'foo' }))
  );
});

test('pick should get multiple properties', t => {
  return of(fixture).pipe(
    pick('bar', 'baz'),
    tap(x => t.deepEqual(x, { bar: 'bar', baz: 'baz' }))
  );
});

test('pick should return an empty object when the options passed are not valid', t => {
  return of(fixture).pipe(
    pick('zab'),
    tap(x => t.deepEqual(x, {})),
    mapTo(fixture),

    pick('orb.rob.bro'),
    tap(x => t.deepEqual(x, {}))
  );
});
