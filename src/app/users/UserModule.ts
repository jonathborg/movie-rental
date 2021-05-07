import DatabaseProvider from 'src/providers/DatabaseProvider';
import { proxyBinds } from 'src/utils';
import { UserController } from './UserController';
import { UserService } from './UserService';

const databaseProvider = new DatabaseProvider();
const userService = new UserService(databaseProvider);

export default proxyBinds(new UserController(userService));
