export interface User {
    id: number;
    name: string;
    email: string;
    cpf: string;
    gender: 'male' | 'female';
    birth_date: Date;
    created_at: Date;
    updated_at: Date | null;
}

export interface UserCreate {
    name: string;
    email: string;
    cpf: string;
    gender: 'male' | 'female';
    birth_date: Date;
}
