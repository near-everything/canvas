/* Excluded from this release type: annotateError */

/* Excluded from this release type: assert */

/* Excluded from this release type: assertExists */

/* Excluded from this release type: compact */

/**
 * Debounce a function.
 *
 * @example
 *
 * ```ts
 * const A = debounce(myFunction, 1000)
 * ```
 *
 * @public
 * @see source - https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
 */
export declare function debounce<T extends unknown[], U>(callback: (...args: T) => PromiseLike<U> | U, wait: number): {
    (...args: T): Promise<U>;
    cancel(): void;
};

/**
 * Deduplicate the items in an array
 *
 * @public
 */
export declare function dedupe<T>(input: T[], equals?: (a: any, b: any) => boolean): T[];

/**
 * Deep copy function for TypeScript.
 *
 * @example
 *
 * ```ts
 * const A = deepCopy({ a: 1, b: { c: 2 } })
 * ```
 *
 * @param obj - Target value to be copied.
 * @public
 * @see Source - project, ts-deeply https://github.com/ykdr2017/ts-deepcopy
 * @see Code - pen https://codepen.io/erikvullings/pen/ejyBYg
 */
export declare function deepCopy<T = unknown>(obj: T): T;

declare type ErrorAnnotations = {
    tags: Record<string, bigint | boolean | null | number | string | symbol | undefined>;
    extras: Record<string, unknown>;
};

/** @public */
export declare type ErrorResult<E> = {
    readonly ok: false;
    readonly error: E;
};

/* Excluded from this release type: exhaustiveSwitchError */

/** @public */
export declare type Expand<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;

/**
 * Helpers for files
 *
 * @public
 */
export declare class FileHelpers {
    /* Excluded from this release type: base64ToFile */
    /**
     * Convert a file to base64.
     *
     * @example
     *
     * ```ts
     * const A = fileToBase64('./test.png')
     * ```
     *
     * @param value - The file as a blob.
     * @public
     */
    static fileToBase64(file: Blob): Promise<string>;
}

/* Excluded from this release type: filterEntries */

/* Excluded from this release type: getErrorAnnotations */

/**
 * Get the first item from an iterable Set or Map.
 *
 * @example
 *
 * ```ts
 * const A = getFirstItem(new Set([1, 2, 3])) // 1
 * const B = getFirstItem(
 * 	new Map([
 * 		['a', 1],
 * 		['b', 2],
 * 	])
 * ) // 1
 * ```
 *
 * @param value - The iterable Set or Map.
 * @public
 */
export declare function getFirstFromIterable<T = unknown>(set: Map<any, T> | Set<T>): T;

/**
 * Hash a string using the FNV-1a algorithm.
 *
 * @public
 */
export declare function getHashForObject(obj: any): string;

/**
 * Hash a string using the FNV-1a algorithm.
 *
 * @public
 */
export declare function getHashForString(string: string): string;

/* Excluded from this release type: getOwnProperty */

/* Excluded from this release type: hasOwnProperty */

/**
 * Get whether a value is not undefined.
 *
 * @param value - The value to check.
 * @public
 */
export declare function isDefined<T>(value: T): value is typeof value extends undefined ? never : T;

/**
 * Get whether a value is null
 *
 * @param value - The value to check.
 * @public
 */
export declare function isNonNull<T>(value: T): value is typeof value extends null ? never : T;

/**
 * Get whether a value is nullish (null, undefined).
 *
 * @param value - The value to check.
 * @public
 */
export declare function isNonNullish<T>(value: T): value is typeof value extends undefined ? never : typeof value extends null ? never : T;

/** @public */
export declare function isValidUrl(url: string): boolean;

/** @public */
export declare type JsonArray = JsonValue[];

/** @public */
export declare type JsonObject = {
    [key: string]: JsonValue | undefined;
};

/** @public */
export declare type JsonPrimitive = boolean | null | number | string;

/** @public */
export declare type JsonValue = JsonArray | JsonObject | JsonPrimitive;

/* Excluded from this release type: last */

/**
 * Linear interpolate between two values.
 *
 * @example
 *
 * ```ts
 * const A = lerp(0, 1, 0.5)
 * ```
 *
 * @public
 */
export declare function lerp(a: number, b: number, t: number): number;

/** @public */
export declare function lns(str: string): string;

/* Excluded from this release type: mapObjectMapValues */

/**
 * Helpers for media
 *
 * @public
 */
export declare class MediaHelpers {
    /**
     * Get the size of a video from its source.
     *
     * @param src - The source of the video.
     * @public
     */
    static getVideoSizeFromSrc(src: string): Promise<{
        w: number;
        h: number;
    }>;
    /**
     * Get the size of an image from its source.
     *
     * @param dataURL - The file as a string.
     * @public
     */
    static getImageSizeFromSrc(dataURL: string): Promise<{
        w: number;
        h: number;
    }>;
}

/* Excluded from this release type: minBy */

/**
 * Modulate a value between two ranges.
 *
 * @example
 *
 * ```ts
 * const A = modulate(0, [0, 1], [0, 100])
 * ```
 *
 * @param value - The interpolation value.
 * @param rangeA - From [low, high]
 * @param rangeB - To [low, high]
 * @param clamp - Whether to clamp the the result to [low, high]
 * @public
 */
export declare function modulate(value: number, rangeA: number[], rangeB: number[], clamp?: boolean): number;

/* Excluded from this release type: noop */

/* Excluded from this release type: objectMapEntries */

/* Excluded from this release type: objectMapFromEntries */

/* Excluded from this release type: objectMapKeys */

/* Excluded from this release type: objectMapValues */

/** @public */
export declare type OkResult<T> = {
    readonly ok: true;
    readonly value: T;
};

/* Excluded from this release type: omitFromStackTrace */

/* Excluded from this release type: partition */

/** @public */
export declare class PngHelpers {
    static isPng(view: DataView, offset: number): boolean;
    static getChunkType(view: DataView, offset: number): string;
    static readChunks(view: DataView, offset?: number): Record<string, {
        dataOffset: number;
        size: number;
        start: number;
    }>;
    static parsePhys(view: DataView, offset: number): {
        ppux: number;
        ppuy: number;
        unit: number;
    };
    static findChunk(view: DataView, type: string): {
        dataOffset: number;
        size: number;
        start: number;
    };
    static setPhysChunk(view: DataView, dpr?: number, options?: BlobPropertyBag): Blob;
}

/* Excluded from this release type: promiseWithResolve */

/* Excluded from this release type: rafThrottle */

/** @public */
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

declare type _Required<T> = {
    [K in keyof T]-?: T[K];
};

/* Excluded from this release type: Required_2 */

/** @public */
export declare type Result<T, E> = ErrorResult<E> | OkResult<T>;

/** @public */
export declare const Result: {
    ok<T>(value: T): OkResult<T>;
    err<E>(error: E): ErrorResult<E>;
};

/**
 * Seeded random number generator, using [xorshift](https://en.wikipedia.org/wiki/Xorshift). The
 * result will always be betweeen -1 and 1.
 *
 * Adapted from [seedrandom](https://github.com/davidbau/seedrandom).
 *
 * @public
 */
export declare function rng(seed?: string): () => number;

/**
 * Rotate the contents of an array.
 *
 * @public
 */
export declare function rotateArray<T>(arr: T[], offset: number): T[];

/** @public */
export declare function sortById<T extends {
    id: any;
}>(a: T, b: T): -1 | 1;

/** @public */
declare const structuredClone_2: <T>(i: T) => T;
export { structuredClone_2 as structuredClone }

/**
 * Throttle a function.
 *
 * @example
 *
 * ```ts
 * const A = throttle(myFunction, 1000)
 * ```
 *
 * @public
 * @see source - https://github.com/bameyrick/throttle-typescript
 */
export declare function throttle<T extends (...args: any) => any>(func: T, limit: number): (...args: Parameters<T>) => ReturnType<T>;

/* Excluded from this release type: throttledRaf */

export { }
