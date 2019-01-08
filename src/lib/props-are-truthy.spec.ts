import test from 'ava';
import { of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { propsAreTruthy } from './props-are-truthy';

const falsy = { test: '' };
const truthy = { test: 'test' };
const falsyTestedMultipleProps = { foo: { bar: { baz: null } } };
const oneFalsyProp = {
  ...falsyTestedMultipleProps,
  zab: true
};

test('propsAreTruthy will return false if any of the checked props are falsy', t => {
  return of(falsy).pipe(
    propsAreTruthy(),
    tap(signal => t.falsy(signal)),

    mapTo(falsy),
    propsAreTruthy('test'),
    tap(signal => t.falsy(signal)),

    mapTo(null as any),
    propsAreTruthy(),
    tap(signal => t.falsy(signal)),

    mapTo(truthy),
    propsAreTruthy('test'),
    tap(signal => t.deepEqual(signal, truthy)),

    mapTo(truthy),
    propsAreTruthy(),
    tap(signal => t.deepEqual(signal, truthy)),

    mapTo(falsyTestedMultipleProps),
    propsAreTruthy('foo.bar.baz'),
    tap(signal => t.falsy(signal)),

    mapTo(oneFalsyProp),
    propsAreTruthy('zab', 'foo.bar.baz'),
    tap(signal => t.falsy(signal)),

    mapTo(falsyTestedMultipleProps),
    propsAreTruthy('foo.bar.zab'),
    tap(signal => t.falsy(signal))
  );
});
