import { Atom } from '@tldraw/state';
import { Computed } from '@tldraw/state';

/**
 * Get the type of all records in a record store.
 *
 * @public
 */
export declare type AllRecords<T extends Store<any>> = ExtractR<ExtractRecordType<T>>;

/**
 * Assert whether an id correspond to a record type.
 *
 * @example
 *
 * ```ts
 * assertIdType(myId, "shape")
 * ```
 *
 * @param id - The id to check.
 * @param type - The type of the record.
 * @public
 */
export declare function assertIdType<R extends UnknownRecord>(id: string | undefined, type: RecordType<R, any>): asserts id is IdOf<R>;

declare interface BaseMigrationsInfo {
    firstVersion: number;
    currentVersion: number;
    migrators: {
        [version: number]: Migration;
    };
}

/**
 * The base record that all records must extend.
 *
 * @public
 */
export declare interface BaseRecord<TypeName extends string, Id extends RecordId<UnknownRecord>> {
    readonly id: Id;
    readonly typeName: TypeName;
}

declare type ChangeSource = 'remote' | 'user';

/**
 * A diff describing the changes to a collection.
 *
 * @public
 */
export declare type CollectionDiff<T> = {
    added?: Set<T>;
    removed?: Set<T>;
};

/** @public */
export declare function compareRecordVersions(a: RecordVersion, b: RecordVersion): -1 | 0 | 1;

/** @public */
export declare const compareSchemas: (a: SerializedSchema, b: SerializedSchema) => -1 | 0 | 1;

/**
 * A record store is a collection of records of different types.
 *
 * @public
 */
export declare type ComputedCache<Data, R extends UnknownRecord> = {
    get(id: IdOf<R>): Data | undefined;
};

/**
 * Create a record type.
 *
 * @example
 *
 * ```ts
 * const Book = createRecordType<Book>('book')
 * ```
 *
 * @param typeName - The name of the type to create.
 * @public
 */
export declare function createRecordType<R extends UnknownRecord>(typeName: R['typeName'], config: {
    migrations?: Migrations;
    validator?: StoreValidator<R>;
    scope: RecordScope;
}): RecordType<R, keyof Omit<R, 'id' | 'typeName'>>;

declare type Decrement<n extends number> = n extends 0 ? never : n extends 1 ? 0 : n extends 2 ? 1 : n extends 3 ? 2 : n extends 4 ? 3 : n extends 5 ? 4 : n extends 6 ? 5 : n extends 7 ? 6 : n extends 8 ? 7 : n extends 9 ? 8 : n extends 10 ? 9 : n extends 11 ? 10 : n extends 12 ? 11 : n extends 13 ? 12 : n extends 14 ? 13 : n extends 15 ? 14 : n extends 16 ? 15 : n extends 17 ? 16 : n extends 18 ? 17 : n extends 19 ? 18 : n extends 20 ? 19 : n extends 21 ? 20 : n extends 22 ? 21 : n extends 23 ? 22 : n extends 24 ? 23 : n extends 25 ? 24 : n extends 26 ? 25 : n extends 27 ? 26 : n extends 28 ? 27 : n extends 29 ? 28 : n extends 30 ? 29 : n extends 31 ? 30 : n extends 32 ? 31 : n extends 33 ? 32 : n extends 34 ? 33 : n extends 35 ? 34 : n extends 36 ? 35 : n extends 37 ? 36 : n extends 38 ? 37 : n extends 39 ? 38 : n extends 40 ? 39 : n extends 41 ? 40 : n extends 42 ? 41 : n extends 43 ? 42 : n extends 44 ? 43 : n extends 45 ? 44 : n extends 46 ? 45 : n extends 47 ? 46 : n extends 48 ? 47 : n extends 49 ? 48 : n extends 50 ? 49 : n extends 51 ? 50 : never;

/** @public */
export declare function defineMigrations<FirstVersion extends EMPTY_SYMBOL | number = EMPTY_SYMBOL, CurrentVersion extends EMPTY_SYMBOL | Exclude<number, 0> = EMPTY_SYMBOL>(opts: {
    firstVersion?: CurrentVersion extends number ? FirstVersion : never;
    currentVersion?: CurrentVersion;
    migrators?: CurrentVersion extends number ? FirstVersion extends number ? CurrentVersion extends FirstVersion ? {
        [version in Exclude<Range_2<1, CurrentVersion>, 0>]: Migration;
    } : {
        [version in Exclude<Range_2<FirstVersion, CurrentVersion>, FirstVersion>]: Migration;
    } : {
        [version in Exclude<Range_2<1, CurrentVersion>, 0>]: Migration;
    } : never;
    subTypeKey?: string;
    subTypeMigrations?: Record<string, BaseMigrationsInfo>;
}): Migrations;

/**
 * Freeze an object when in development mode. Copied from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 *
 * @example
 *
 * ```ts
 * const frozen = devFreeze({ a: 1 })
 * ```
 *
 * @param object - The object to freeze.
 * @returns The frozen object when in development mode, or else the object when in other modes.
 * @public
 */
export declare function devFreeze<T>(object: T): T;

declare type EMPTY_SYMBOL = symbol;

declare type ExtractR<T extends RecordType<any, any>> = T extends RecordType<infer S, any> ? S : never;

declare type ExtractRecordType<T extends Store<any>> = T extends Store<infer R> ? R : never;

/** @public */
export declare function getRecordVersion(record: UnknownRecord, serializedSchema: SerializedSchema): RecordVersion;

/**
 * An entry containing changes that originated either by user actions or remote changes.
 *
 * @public
 */
export declare type HistoryEntry<R extends UnknownRecord = UnknownRecord> = {
    changes: RecordsDiff<R>;
    source: ChangeSource;
};

/** @public */
export declare type IdOf<R extends UnknownRecord> = R['id'];

/* Excluded from this release type: IncrementalSetConstructor */

/** @public */
export declare function migrate<T>({ value, migrations, fromVersion, toVersion, }: {
    value: unknown;
    migrations: Migrations;
    fromVersion: number;
    toVersion: number;
}): MigrationResult<T>;

/** @public */
export declare function migrateRecord<R extends UnknownRecord>({ record, migrations, fromVersion, toVersion, }: {
    record: unknown;
    migrations: Migrations;
    fromVersion: number;
    toVersion: number;
}): MigrationResult<R>;

/** @public */
export declare type Migration<Before = any, After = any> = {
    up: (oldState: Before) => After;
    down: (newState: After) => Before;
};

/** @public */
export declare enum MigrationFailureReason {
    IncompatibleSubtype = "incompatible-subtype",
    UnknownType = "unknown-type",
    TargetVersionTooNew = "target-version-too-new",
    TargetVersionTooOld = "target-version-too-old",
    MigrationError = "migration-error",
    UnrecognizedSubtype = "unrecognized-subtype"
}

/** @public */
export declare type MigrationResult<T> = {
    type: 'error';
    reason: MigrationFailureReason;
} | {
    type: 'success';
    value: T;
};

/** @public */
export declare interface Migrations extends BaseMigrationsInfo {
    subTypeKey?: string;
    subTypeMigrations?: Record<string, BaseMigrationsInfo>;
}

declare type OmitMeta<R extends UnknownRecord> = R extends R ? Omit<R, 'id' | 'typeName'> : R;

declare type QueryExpression<R extends object> = {
    [k in keyof R & string]?: ValueMatcher<R[k]>;
};

declare type Range_2<From extends number, To extends number> = To extends From ? From : Range_2<From, Decrement<To>> | To;

declare type RecFromId<K extends RecordId<UnknownRecord>> = K extends RecordId<infer R> ? R : never;

/** @public */
export declare type RecordId<R extends UnknownRecord> = string & {
    __type__: R;
};

/**
 * Defines the scope of the record
 *
 * instance: The record belongs to a single instance of the store. It should not be synced, and any persistence logic should 'de-instance-ize' the record before persisting it, and apply the reverse when rehydrating.
 * document: The record is persisted and synced. It is available to all store instances.
 * presence: The record belongs to a single instance of the store. It may be synced to other instances, but other instances should not make changes to it. It should not be persisted.
 *
 * @public
 * */
declare type RecordScope = 'document' | 'presence' | 'session';

/**
 * A diff describing the changes to a record.
 *
 * @public
 */
export declare type RecordsDiff<R extends UnknownRecord> = {
    added: Record<IdOf<R>, R>;
    updated: Record<IdOf<R>, [from: R, to: R]>;
    removed: Record<IdOf<R>, R>;
};

/**
 * A record type is a type that can be stored in a record store. It is created with
 * `createRecordType`.
 *
 * @public
 */
export declare class RecordType<R extends UnknownRecord, RequiredProperties extends keyof Omit<R, 'id' | 'typeName'>> {
    /**
     * The unique type associated with this record.
     *
     * @public
     * @readonly
     */
    readonly typeName: R['typeName'];
    readonly createDefaultProperties: () => Exclude<OmitMeta<R>, RequiredProperties>;
    readonly migrations: Migrations;
    readonly validator: {
        validate: (r: unknown) => R;
    } | StoreValidator<R>;
    readonly scope: RecordScope;
    constructor(
    /**
     * The unique type associated with this record.
     *
     * @public
     * @readonly
     */
    typeName: R['typeName'], config: {
        readonly createDefaultProperties: () => Exclude<OmitMeta<R>, RequiredProperties>;
        readonly migrations: Migrations;
        readonly validator?: {
            validate: (r: unknown) => R;
        } | StoreValidator<R>;
        readonly scope?: RecordScope;
    });
    /**
     * Create a new record of this type.
     *
     * @param properties - The properties of the record.
     * @returns The new record.
     */
    create(properties: Pick<R, RequiredProperties> & Omit<Partial<R>, RequiredProperties>): R;
    /**
     * Clone a record of this type.
     *
     * @param record - The record to clone.
     * @returns The cloned record.
     * @public
     */
    clone(record: R): R;
    /**
     * Create a new ID for this record type.
     *
     * @example
     *
     * ```ts
     * const id = recordType.createId()
     * ```
     *
     * @returns The new ID.
     * @public
     */
    createId(customUniquePart?: string): IdOf<R>;
    /**
     * Create a new ID for this record type based on the given ID.
     *
     * @example
     *
     * ```ts
     * const id = recordType.createCustomId('myId')
     * ```
     *
     * @deprecated - Use `createId` instead.
     * @param id - The ID to base the new ID on.
     * @returns The new ID.
     */
    createCustomId(id: string): IdOf<R>;
    /**
     * Takes an id like `user:123` and returns the part after the colon `123`
     *
     * @param id - The id
     * @returns
     */
    parseId(id: IdOf<R>): string;
    /**
     * Check whether a record is an instance of this record type.
     *
     * @example
     *
     * ```ts
     * const result = recordType.isInstance(someRecord)
     * ```
     *
     * @param record - The record to check.
     * @returns Whether the record is an instance of this record type.
     */
    isInstance: (record?: UnknownRecord) => record is R;
    /**
     * Check whether an id is an id of this type.
     *
     * @example
     *
     * ```ts
     * const result = recordType.isIn('someId')
     * ```
     *
     * @param id - The id to check.
     * @returns Whether the id is an id of this type.
     */
    isId(id?: string): id is IdOf<R>;
    /**
     * Create a new RecordType that has the same type name as this RecordType and includes the given
     * default properties.
     *
     * @example
     *
     * ```ts
     * const authorType = createRecordType('author', () => ({ living: true }))
     * const deadAuthorType = authorType.withDefaultProperties({ living: false })
     * ```
     *
     * @param fn - A function that returns the default properties of the new RecordType.
     * @returns The new RecordType.
     */
    withDefaultProperties<DefaultProps extends Omit<Partial<R>, 'id' | 'typeName'>>(createDefaultProperties: () => DefaultProps): RecordType<R, Exclude<RequiredProperties, keyof DefaultProps>>;
    /**
     * Check that the passed in record passes the validations for this type. Returns its input
     * correctly typed if it does, but throws an error otherwise.
     */
    validate(record: unknown): R;
}

/** @public */
export declare type RecordVersion = {
    rootVersion: number;
    subTypeVersion?: number;
};

/** @public */
export declare function reverseRecordsDiff(diff: RecordsDiff<any>): RecordsDiff<any>;

declare type RSIndex<R extends UnknownRecord, Property extends string & keyof R = string & keyof R> = Computed<Map<R[Property], Set<IdOf<R>>>, RSIndexDiff<R, Property>>;

declare type RSIndexDiff<R extends UnknownRecord, Property extends string & keyof R = string & keyof R> = Map<R[Property], CollectionDiff<IdOf<R>>>;

/** @public */
export declare interface SerializedSchema {
    /** Schema version is the version for this type you're looking at right now */
    schemaVersion: number;
    /**
     * Store version is the version for the structure of the store. e.g. higher level structure like
     * removing or renaming a record type.
     */
    storeVersion: number;
    /** Record versions are the versions for each record type. e.g. adding a new field to a record */
    recordVersions: Record<string, {
        version: number;
        subTypeVersions: Record<string, number>;
        subTypeKey: string;
    } | {
        version: number;
    }>;
}

/**
 * A serialized snapshot of the record store's values.
 *
 * @public
 */
export declare type SerializedStore<R extends UnknownRecord> = Record<IdOf<R>, R>;

/**
 * Squash a collection of diffs into a single diff.
 *
 * @param diffs - An array of diffs to squash.
 * @returns A single diff that represents the squashed diffs.
 * @public
 */
export declare function squashRecordDiffs<T extends UnknownRecord>(diffs: RecordsDiff<T>[]): RecordsDiff<T>;

/**
 * A store of records.
 *
 * @public
 */
export declare class Store<R extends UnknownRecord = UnknownRecord, Props = unknown> {
    /**
     * The random id of the store.
     */
    readonly id: string;
    /* Excluded from this release type: atoms */
    /**
     * An atom containing the store's history.
     *
     * @public
     * @readonly
     */
    readonly history: Atom<number, RecordsDiff<R>>;
    /**
     * A StoreQueries instance for this store.
     *
     * @public
     * @readonly
     */
    readonly query: StoreQueries<R>;
    /* Excluded from this release type: listeners */
    /* Excluded from this release type: historyAccumulator */
    /* Excluded from this release type: historyReactor */
    readonly schema: StoreSchema<R, Props>;
    readonly props: Props;
    readonly scopedTypes: {
        readonly [K in RecordScope]: ReadonlySet<R['typeName']>;
    };
    constructor(config: {
        /** The store's initial data. */
        initialData?: SerializedStore<R>;
        /**
         * A map of validators for each record type. A record's validator will be called when the record
         * is created or updated. It should throw an error if the record is invalid.
         */
        schema: StoreSchema<R, Props>;
        props: Props;
    });
    _flushHistory(): void;
    /**
     * Filters out non-document changes from a diff. Returns null if there are no changes left.
     * @param change - the records diff
     * @returns
     */
    filterChangesByScope(change: RecordsDiff<R>, scope: RecordScope): {
        added: { [K in IdOf<R>]: R; };
        updated: { [K_1 in IdOf<R>]: [from: R, to: R]; };
        removed: { [K in IdOf<R>]: R; };
    } | null;
    /**
     * Update the history with a diff of changes.
     *
     * @param changes - The changes to add to the history.
     */
    private updateHistory;
    validate(phase: 'createRecord' | 'initialize' | 'tests' | 'updateRecord'): void;
    /**
     * A callback fired after each record's change.
     *
     * @param prev - The previous value, if any.
     * @param next - The next value.
     */
    onBeforeCreate?: (next: R, source: 'remote' | 'user') => R;
    /**
     * A callback fired after a record is created. Use this to perform related updates to other
     * records in the store.
     *
     * @param record - The record to be created
     */
    onAfterCreate?: (record: R, source: 'remote' | 'user') => void;
    /**
     * A callback before after each record's change.
     *
     * @param prev - The previous value, if any.
     * @param next - The next value.
     */
    onBeforeChange?: (prev: R, next: R, source: 'remote' | 'user') => R;
    /**
     * A callback fired after each record's change.
     *
     * @param prev - The previous value, if any.
     * @param next - The next value.
     */
    onAfterChange?: (prev: R, next: R, source: 'remote' | 'user') => void;
    /**
     * A callback fired before a record is deleted.
     *
     * @param prev - The record that will be deleted.
     */
    onBeforeDelete?: (prev: R, source: 'remote' | 'user') => false | void;
    /**
     * A callback fired after a record is deleted.
     *
     * @param prev - The record that will be deleted.
     */
    onAfterDelete?: (prev: R, source: 'remote' | 'user') => void;
    private _runCallbacks;
    /**
     * Add some records to the store. It's an error if they already exist.
     *
     * @param records - The records to add.
     * @public
     */
    put: (records: R[], phaseOverride?: 'initialize') => void;
    /**
     * Remove some records from the store via their ids.
     *
     * @param ids - The ids of the records to remove.
     * @public
     */
    remove: (ids: IdOf<R>[]) => void;
    /**
     * Get the value of a store record by its id.
     *
     * @param id - The id of the record to get.
     * @public
     */
    get: <K extends IdOf<R>>(id: K) => RecFromId<K> | undefined;
    /**
     * Get the value of a store record by its id without updating its epoch.
     *
     * @param id - The id of the record to get.
     * @public
     */
    unsafeGetWithoutCapture: <K extends IdOf<R>>(id: K) => RecFromId<K> | undefined;
    /**
     * Creates a JSON payload from the record store.
     *
     * @param scope - The scope of records to serialize. Defaults to 'document'.
     * @returns The record store snapshot as a JSON payload.
     */
    serialize: (scope?: 'all' | RecordScope) => SerializedStore<R>;
    /**
     * Get a serialized snapshot of the store and its schema.
     *
     * ```ts
     * const snapshot = store.getSnapshot()
     * store.loadSnapshot(snapshot)
     * ```
     *
     * @param scope - The scope of records to serialize. Defaults to 'document'.
     *
     * @public
     */
    getSnapshot(scope?: 'all' | RecordScope): StoreSnapshot<R>;
    /**
     * Migrate a serialized snapshot of the store and its schema.
     *
     * ```ts
     * const snapshot = store.getSnapshot()
     * store.migrateSnapshot(snapshot)
     * ```
     *
     * @param snapshot - The snapshot to load.
     * @public
     */
    migrateSnapshot(snapshot: StoreSnapshot<R>): StoreSnapshot<R>;
    /**
     * Load a serialized snapshot.
     *
     * ```ts
     * const snapshot = store.getSnapshot()
     * store.loadSnapshot(snapshot)
     * ```
     *
     * @param snapshot - The snapshot to load.
     * @public
     */
    loadSnapshot(snapshot: StoreSnapshot<R>): void;
    /**
     * Get an array of all values in the store.
     *
     * @returns An array of all values in the store.
     * @public
     */
    allRecords: () => R[];
    /**
     * Removes all records from the store.
     *
     * @public
     */
    clear: () => void;
    /**
     * Update a record. To update multiple records at once, use the `update` method of the
     * `TypedStore` class.
     *
     * @param id - The id of the record to update.
     * @param updater - A function that updates the record.
     */
    update: <K extends IdOf<R>>(id: K, updater: (record: RecFromId<K>) => RecFromId<K>) => void;
    /**
     * Get whether the record store has a id.
     *
     * @param id - The id of the record to check.
     * @public
     */
    has: <K extends IdOf<R>>(id: K) => boolean;
    /**
     * Add a new listener to the store.
     *
     * @param onHistory - The listener to call when the store updates.
     * @param filters - Filters to apply to the listener.
     * @returns A function to remove the listener.
     */
    listen: (onHistory: StoreListener<R>, filters?: Partial<StoreListenerFilters>) => () => void;
    private isMergingRemoteChanges;
    /**
     * Merge changes from a remote source without triggering listeners.
     *
     * @param fn - A function that merges the external changes.
     * @public
     */
    mergeRemoteChanges: (fn: () => void) => void;
    extractingChanges(fn: () => void): RecordsDiff<R>;
    applyDiff(diff: RecordsDiff<R>, runCallbacks?: boolean): void;
    /**
     * Create a computed cache.
     *
     * @param name - The name of the derivation cache.
     * @param derive - A function used to derive the value of the cache.
     * @public
     */
    createComputedCache: <T, V extends R = R>(name: string, derive: (record: V) => T | undefined, isEqual?: ((a: V, b: V) => boolean) | undefined) => ComputedCache<T, V>;
    /**
     * Create a computed cache from a selector
     *
     * @param name - The name of the derivation cache.
     * @param selector - A function that returns a subset of the original shape
     * @param derive - A function used to derive the value of the cache.
     * @public
     */
    createSelectedComputedCache: <T, J, V extends R = R>(name: string, selector: (record: V) => T | undefined, derive: (input: T) => J | undefined) => ComputedCache<J, V>;
    getRecordType: <T extends R>(record: R) => T;
    private _integrityChecker?;
    /* Excluded from this release type: ensureStoreIsUsable */
    private _isPossiblyCorrupted;
    /* Excluded from this release type: markAsPossiblyCorrupted */
    /* Excluded from this release type: isPossiblyCorrupted */
}

/** @public */
export declare type StoreError = {
    error: Error;
    phase: 'createRecord' | 'initialize' | 'tests' | 'updateRecord';
    recordBefore?: unknown;
    recordAfter: unknown;
    isExistingValidationIssue: boolean;
};

/**
 * A function that will be called when the history changes.
 *
 * @public
 */
export declare type StoreListener<R extends UnknownRecord> = (entry: HistoryEntry<R>) => void;

declare type StoreListenerFilters = {
    source: 'all' | ChangeSource;
    scope: 'all' | RecordScope;
};

/**
 * A class that provides a 'namespace' for the various kinds of indexes one may wish to derive from
 * the record store.
 */
declare class StoreQueries<R extends UnknownRecord> {
    private readonly atoms;
    private readonly history;
    constructor(atoms: Atom<Record<IdOf<R>, Atom<R>>>, history: Atom<number, RecordsDiff<R>>);
    /* Excluded from this release type: indexCache */
    /* Excluded from this release type: historyCache */
    /**
     * Create a derivation that contains the hisotry for a given type
     *
     * @param typeName - The name of the type to filter by.
     * @returns A derivation that returns the ids of all records of the given type.
     * @public
     */
    filterHistory<TypeName extends R['typeName']>(typeName: TypeName): Computed<number, RecordsDiff<Extract<R, {
        typeName: TypeName;
    }>>>;
    /**
     * Create a derivation that returns an index on a property for the given type.
     *
     * @param typeName - The name of the type.
     * @param property - The name of the property.
     * @public
     */
    index<TypeName extends R['typeName'], Property extends string & keyof Extract<R, {
        typeName: TypeName;
    }>>(typeName: TypeName, property: Property): RSIndex<Extract<R, {
        typeName: TypeName;
    }>, Property>;
    /* Excluded from this release type: __uncached_createIndex */
    /**
     * Create a derivation that will return a signle record matching the given query.
     *
     * It will return undefined if there is no matching record
     *
     * @param typeName - The name of the type?
     * @param queryCreator - A function that returns the query expression.
     * @param name - (optinal) The name of the query.
     */
    record<TypeName extends R['typeName']>(typeName: TypeName, queryCreator?: () => QueryExpression<Extract<R, {
        typeName: TypeName;
    }>>, name?: string): Computed<Extract<R, {
        typeName: TypeName;
    }> | undefined>;
    /**
     * Create a derivation that will return an array of records matching the given query
     *
     * @param typeName - The name of the type?
     * @param queryCreator - A function that returns the query expression.
     * @param name - (optinal) The name of the query.
     */
    records<TypeName extends R['typeName']>(typeName: TypeName, queryCreator?: () => QueryExpression<Extract<R, {
        typeName: TypeName;
    }>>, name?: string): Computed<Array<Extract<R, {
        typeName: TypeName;
    }>>>;
    /**
     * Create a derivation that will return the ids of all records of the given type.
     *
     * @param typeName - The name of the type.
     * @param queryCreator - A function that returns the query expression.
     * @param name - (optinal) The name of the query.
     */
    ids<TypeName extends R['typeName']>(typeName: TypeName, queryCreator?: () => QueryExpression<Extract<R, {
        typeName: TypeName;
    }>>, name?: string): Computed<Set<IdOf<Extract<R, {
        typeName: TypeName;
    }>>>, CollectionDiff<IdOf<Extract<R, {
        typeName: TypeName;
    }>>>>;
    exec<TypeName extends R['typeName']>(typeName: TypeName, query: QueryExpression<Extract<R, {
        typeName: TypeName;
    }>>): Array<Extract<R, {
        typeName: TypeName;
    }>>;
}

/** @public */
export declare class StoreSchema<R extends UnknownRecord, P = unknown> {
    readonly types: {
        [Record in R as Record['typeName']]: RecordType<R, any>;
    };
    private readonly options;
    static create<R extends UnknownRecord, P = unknown>(types: {
        [TypeName in R['typeName']]: {
            createId: any;
        };
    }, options?: StoreSchemaOptions<R, P>): StoreSchema<R, P>;
    private constructor();
    get currentStoreVersion(): number;
    validateRecord(store: Store<R>, record: R, phase: 'createRecord' | 'initialize' | 'tests' | 'updateRecord', recordBefore: null | R): R;
    migratePersistedRecord(record: R, persistedSchema: SerializedSchema, direction?: 'down' | 'up'): MigrationResult<R>;
    migrateStoreSnapshot(snapshot: StoreSnapshot<R>): MigrationResult<SerializedStore<R>>;
    /* Excluded from this release type: createIntegrityChecker */
    serialize(): SerializedSchema;
    serializeEarliestVersion(): SerializedSchema;
}

/** @public */
export declare type StoreSchemaOptions<R extends UnknownRecord, P> = {
    /** @public */
    snapshotMigrations?: Migrations;
    /** @public */
    onValidationFailure?: (data: {
        error: unknown;
        store: Store<R>;
        record: R;
        phase: 'createRecord' | 'initialize' | 'tests' | 'updateRecord';
        recordBefore: null | R;
    }) => R;
    /* Excluded from this release type: createIntegrityChecker */
};

/** @public */
export declare type StoreSnapshot<R extends UnknownRecord> = {
    store: SerializedStore<R>;
    schema: SerializedSchema;
};

/** @public */
export declare type StoreValidator<R extends UnknownRecord> = {
    validate: (record: unknown) => R;
};

/** @public */
export declare type StoreValidators<R extends UnknownRecord> = {
    [K in R['typeName']]: StoreValidator<Extract<R, {
        typeName: K;
    }>>;
};

/** @public */
export declare type UnknownRecord = BaseRecord<string, RecordId<UnknownRecord>>;

declare type ValueMatcher<T> = {
    eq: T;
} | {
    gt: number;
} | {
    neq: T;
};

export { }
