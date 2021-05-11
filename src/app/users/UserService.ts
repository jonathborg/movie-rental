import DatabaseProvider from 'src/providers/DatabaseProvider';
import { User, UserCreate } from './UserDto';

export class UserService {
    constructor(private db: DatabaseProvider) {}

    find(): Promise<User[]> {
        return this.db.getInstance().from('user').whereNull('deleted_at').select();
    }

    findById(userId: number): Promise<User> {
        return this.db
            .getInstance()
            .from('user')
            .where('id', userId)
            .whereNull('deleted_at')
            .select()
            .first();
    }

    async create(data: UserCreate): Promise<User> {
        const [id] = await this.db.getInstance().from('user').insert(data);
        return { id, created_at: new Date(), updated_at: null, ...data };
    }

    async update(userId: number, data: Partial<UserCreate>): Promise<User | null> {
        const update = await this.db
            .getInstance()
            .from('user')
            .where('id', userId)
            .whereNull('deleted_at')
            .update(data);

        if (!update) {
            return null;
        }
        return this.db.getInstance().from('user').where('id', userId).select().first();
    }

    async delete(userId: number): Promise<boolean> {
        const deleted = await this.db
            .getInstance()
            .from('user')
            .where('id', userId)
            .whereNull('deleted_at')
            .update({ deleted_at: new Date() });

        return Boolean(deleted);
    }
}
