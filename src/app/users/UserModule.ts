import { UserController } from './UserController';
import { UserService } from './UserService';

// TODO: better typing
function proxyBinds(target: any) {
    const cache = new WeakMap();
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

// TODO: maybe export controllers
export default {
    controller: proxyBinds(new UserController(new UserService())),
};
