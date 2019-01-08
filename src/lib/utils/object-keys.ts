// https://github.com/Microsoft/TypeScript/pull/28899#issuecomment-446044663
export const objectKeys = <S extends object>(o: S): Array<keyof S> =>
  <Array<keyof S>>Object.keys(o);
