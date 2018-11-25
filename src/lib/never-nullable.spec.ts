import test from 'ava';
import { of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import {
  isNonNullable,
  neverNullable,
  neverNullableErrorMessage
} from './never-nullable';

test('neverNullable should pass the signal as is when it is not nullable', t => {
  return of('foo').pipe(
    neverNullable,
    tap(signal => t.is(signal, 'foo')),

    mapTo(''),
    neverNullable,
    tap(signal => t.is(signal, '')),

    mapTo([]),
    neverNullable,
    tap(signal => t.deepEqual(signal, [])),

    mapTo({}),
    neverNullable,
    tap(signal => t.deepEqual(signal, {})),

    mapTo(true),
    neverNullable,
    tap(signal => t.is(signal, true)),

    mapTo(false),
    neverNullable,
    tap(signal => t.is(signal, false)),

    mapTo(1),
    neverNullable,
    tap(signal => t.is(signal, 1)),

    mapTo(0),
    neverNullable,
    tap(signal => t.is(signal, 0)),

    mapTo(-1),
    neverNullable,
    tap(signal => t.is(signal, -1))
  );
});

test('neverNullable should throw an error when the value is nullable', t => {
  return of(null).pipe(
    neverNullable,
    catchError(error => of(error.message)),
    tap(message => t.is(message, neverNullableErrorMessage)),

    mapTo(undefined),
    neverNullable,
    catchError(error => of(error.message)),
    tap(message => t.is(message, neverNullableErrorMessage))
  );
});

test('isNonNullable should be true when signal is not null or undefined', t => {
  ['foo', '', [], {}, true, false, 1, 0, -1].forEach(element => {
    t.true(isNonNullable(element));
  });
});

test('isNonNullable should be false when signal is not null or undefined', t => {
  [null, undefined].forEach(element => {
    t.false(isNonNullable(element));
  });
});
