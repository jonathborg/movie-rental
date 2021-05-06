import { log, runCommand } from './utils';

(async () => {
    const dockerVersion = await runCommand("docker -v | cut -d ' ' -f3 | cut -d ',' -f1");

    if (!dockerVersion) {
        return log.error('Do you have Docker installed?');
    }

    const [major, minor] = dockerVersion.split('.').map(Number);
    if (major < 19 || (major === 19 && minor < 3)) {
        return log.error('Please, update your Docker version to 19.03.0+');
    }
})();
