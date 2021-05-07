type DbConfig = {
    client: string;
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
};

export const dbConfig: DbConfig = {
    client: process.env.DB_CLIENT || 'mysql2',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'movie_rental',
};
