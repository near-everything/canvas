import { Observable } from 'rxjs';
import type { AppState, Action } from '../types.js';
export declare function dispatch(action: Action): void;
declare function select(): Observable<AppState>;
declare function select<T extends keyof AppState>(stateKey: T): Observable<AppState[T]>;
declare function get(): AppState;
export declare const state: {
    select: typeof select;
    get: typeof get;
};
export {};
