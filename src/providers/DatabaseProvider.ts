import knex, { Knex } from 'knex';
import { dbConfig } from 'src/config/database';

class DatabaseProvider {
    private _conn: Knex | undefined;

    getInstance(): Knex {
        if (!this._conn) {
            this._conn = knex({
                client: dbConfig.client,
                connection: {
                    host: dbConfig.host,
                    user: dbConfig.user,
                    password: dbConfig.password,
                    database: dbConfig.database,
                },
                pool: { min: 3 },
            });
        }
        return this._conn;
    }
}
export default DatabaseProvider;
