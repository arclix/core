/**
 * A class decorator to create singleton class.
 * @param constructor refers to the class inferred by it's usage.
 * @returns singleton class that extends the inferred class.
 */
export function singleton<T extends { new (...args: any[]): object }>(
    constructor: T,
) {
    return class Singleton extends constructor {
        static instance: Singleton;

        constructor(...args: any[]) {
            super(...args);

            if (!Singleton.instance) {
                Singleton.instance = this;
            }
            return Singleton.instance;
        }
    };
}
