import { router, Route } from 'src/core/router';
import user from './UserModule';

const routes: Route[] = [
    { method: 'GET', path: '/users', handler: user.list },
    { method: 'GET', path: '/users/:id', handler: user.show },
    { method: 'POST', path: '/users', handler: user.create },
    { method: 'PATCH', path: '/users/:id', handler: user.edit },
    { method: 'DELETE', path: '/users/:id', handler: user.delete },
];

export default router(routes);
