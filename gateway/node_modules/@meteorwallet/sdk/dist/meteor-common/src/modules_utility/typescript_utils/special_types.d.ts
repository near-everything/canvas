export type DeepPartial<T, F = undefined> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : F extends undefined ? T[P] : F;
};
export type TObjectKeySet<T = 1, R = any> = {
    [key in keyof R]: T;
};
export type TObjectKeyEnumSet<E extends string, T = any> = {
    [key in E]: T;
};
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export interface ISelectItem<T extends string | number = string> {
    id: T;
    name: string;
    description?: string;
}
export type TPromiseOrDirect<I> = Promise<I> | I;
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
