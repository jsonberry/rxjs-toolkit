import _pick from 'lodash.pick';
import { map } from 'rxjs/operators';

export const pick = (...args: string[]) => map(value => _pick(value, args));
