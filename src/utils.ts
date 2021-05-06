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
