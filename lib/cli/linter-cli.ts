import { Config } from '../config/config';
import { ConfigReader } from '../config/config-reader';

export class LinterCli {
    public processArguments(args: string[] = process.argv): Config {
        if (!args.length || args.length < 2) {
            throw new Error('No configuration file specified!');
        }

        const configFilePath = args[2];
        return ConfigReader.read(configFilePath);
    }
}
