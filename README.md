[![npm version](https://badge.fury.io/js/%40attilagyongyosi%2Fpath-linter.svg)](https://badge.fury.io/js/%40attilagyongyosi%2Fpath-linter)

# @attilagyongyosi/path-linter
Lightweight, zero-dependency library to lint file paths in a project.

## But why?
Well, my therapist says that I'm a bit too keen on static analysis.
I can't really help it though, so recently, I started to look for a way to
enforce a file naming convention for a big software project.

The NPM registry is not overly saturated with solutions to this problem, and
the ones I found left me hungry for more. Some way or the other, there was always
something bothering me.

For a while, I also wanted to do some open source project on my own, just for the sake
of trying myself in this game.  
So here it is!

It is currently **~8kb in size**, comes with **no dependencies**. The size could be smaller, I sacrificed it a bit on the altar 
of structural well-being.

Enjoy!

## Neat things
* ~8kb package size
* no dependencies
* supports file extension linting
* supports different naming convention per folder
* did I say it's flexible? It uses regular expressions, after all
* 100% test coverage

## Installing
`path-linter` should be added as a `devDependency`:
```bash
npm install --save-dev @attilagyongyosi/path-linter
```
or
```bash
yarn add --dev @attilagyongyosi/path-linter
```

## Configuration
`path-linter` needs a JSON configuration file somewhere in your project where you specify
your linting rules.

You can specify different linting rules for different directories in your project.
Rules can either be a regular expression or one of the built-in naming conventions that
`path-linter` supports out of the box.

These include, at the moment:
- `kebab-case`

Example:
```json
{
    "rules": [{
        "directory": "src",
        "rule": "kebab-case"
    }, {
        "directory": "tests",
        "rule": ".*\\.spec\\.ts"
    }]
}
```

You can also find an example in [sample-config.json](sample-config.json).

## Usage
Wire it into your NPM scripts in `package.json`.  
For example:
```json
{
    "scripts": {
        "lint:paths": "path-linter --config some-config.json --colorize"
    }
}
```
Then you can execute it with  
```bash
npm run lint:paths
```
or
```bash
yarn lint:paths
```

`--config <path>`  
Specifies the relative path to a configuration file. If not specified, the library will try to look up a 
`path-linter.json` file in the project root.

`--colorize`  
Enables colorization for the console output.

## Contributing
Feel free to open issues or pull requests if you have some improvement on the library. I'm open to everything!

## Authors
* **Attila Gyöngyösi** - [GitHub](https://github.com/attilagyongyosi)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
