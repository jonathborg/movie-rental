import { red, green } from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';

export const log = {
    success(message: string): void {
        console.log(green('✓ '), message);
    },
    error(message: string): void {
        console.log(red('✗ '), message);
    },
};

export const runCommand = (command: string): Promise<string | void> =>
    promisify(exec)(command)
        .then((value) => value.stdout.trim())
        .catch(console.error);

export function proxyBinds<T>(target: T): T {
    const cache = new WeakMap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler: ProxyHandler<any> = {
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        },
    };
    return new Proxy(target, handler);
}
