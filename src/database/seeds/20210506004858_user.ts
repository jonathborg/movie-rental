import { Knex } from 'knex';
import { name, random } from 'faker';

const TABLE_NAME = 'user';

// Generated by: https://www.4devs.com.br/gerador_de_cpf
const VALID_CPF = ['64122611091', '33182288008', '91466039051', '04887390041', '90769136095'];

export async function seed(knex: Knex): Promise<void> {
    await knex(TABLE_NAME).del();

    await knex(TABLE_NAME).insert(
        Array(5)
            .fill(null)
            .map((_, i) => ({
                name: name.findName(),
                gender: random.arrayElement(['male', 'female']),
                cpf: VALID_CPF[i],
            })),
    );
}