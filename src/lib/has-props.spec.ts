import test from 'ava';
import { of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { hasProps, hasPropsErrorMessage, hasPropsGuard } from './has-props';

const fixture = { foo: 'foo', bar: 'bar', baz: 'baz', orb: { rob: 'bro' } };

test('hasPropsGuard should return true when the signal has one top level props', t => {
  t.true(hasPropsGuard(fixture, ['foo']));
});

test('hasPropsGuard should return true when the signal has multiple top level props', t => {
  t.true(hasPropsGuard(fixture, ['foo', 'bar']));
});

test('hasPropsGuard should return true when the signal has one nested prop', t => {
  t.true(hasPropsGuard(fixture, ['orb.rob']));
});

test('hasPropsGuard should return true when the signal has props from mixed depths', t => {
  t.true(hasPropsGuard(fixture, ['foo', 'orb.rob']));
});

test('hasPropsGuard should return false when the signal is missing a prop', t => {
  t.false(hasPropsGuard(fixture, ['rob']));
});

test('hasPropsGuard should return false when the signal has props but is still missing one', t => {
  t.false(hasPropsGuard(fixture, ['foo', 'orb.rob', 'zar']));
});

test('hasProps should pass the signal as is when it has all props being checked', t => {
  return of(fixture).pipe(
    hasProps('foo'),
    tap(signal => t.deepEqual(signal, fixture)),
    hasProps('foo', 'bar'),
    tap(signal => t.deepEqual(signal, fixture)),
    hasProps('orb.rob'),
    tap(signal => t.deepEqual(signal, fixture)),
    hasProps('foo', 'orb.rob'),
    tap(signal => t.deepEqual(signal, fixture))
  );
});
test('hasProps should throw an error when there are missing props', t => {
  return of(fixture).pipe(
    hasProps('rob'),
    catchError((error: Error) => of(error.message)),
    tap(message => t.is(message, hasPropsErrorMessage)),

    mapTo(fixture),
    hasProps('foo', 'orb.rob', 'zar'),
    catchError((error: Error) => of(error.message)),
    tap(message => t.is(message, hasPropsErrorMessage))
  );
});
