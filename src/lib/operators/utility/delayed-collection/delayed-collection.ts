import { concat, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type DelayedCollectionTuple = [any, number];

export function delayedCollection(
  delayedCollectionTuples: DelayedCollectionTuple[]
) {
  return concat(
    ...delayedCollectionTuples.map(([signal, delayAmount]) =>
      of(signal).pipe(delay(delayAmount))
    )
  );
}
