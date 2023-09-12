export type Class<T extends object = any> = new (...args: any[]) => T

export class SingletonNotFoundException extends Error {
    public constructor(constructor: Class) {
        super(`Singleton not found: [ ${constructor.name} ].`)
    }
}

/**
 * A simple container for singletons.
 */
export class SingletonContainer {
    /**
     * Mappings from constructors to singleton objects.
     * @private
     */
    private readonly byClass: Map<Class, object> = new Map()

    /**
     * Registers a singleton object.
     * @param singleton The singleton object to register
     */
    public register(singleton: object): void {
        const constructor = Object.getPrototypeOf(singleton).constructor

        this.byClass.set(constructor, singleton)
    }

    /**
     * Returns a singleton object.
     * @param constructor
     * @throws SingletonNotFoundException
     */
    public get<T extends object>(constructor: Class<T>): T {
        const object = this.byClass.get(constructor)

        if (!object) {
            throw new SingletonNotFoundException(constructor)
        }

        return object as T
    }
}