import { ExecutionContext } from 'ava';
import { TestScheduler } from 'rxjs/testing';

export function getTestScheduler(executionContext: ExecutionContext) {
  return new TestScheduler(
    (t => (actual: any, expected: any) => {
      t.deepEqual(actual, expected);
    })(executionContext)
  );
}
