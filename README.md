[![NPM version](https://badge.fury.io/js/path-linter.svg)](http://badge.fury.io/js/path-linter)

# path-linter
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

It is currently **6kb in size**, comes with **no dependencies**. The size could be smaller, I sacrificed it a bit on the altar 
of structural well-being.

Enjoy!

## Installing
`path-linter` should be added as a `devDependency`:
```bash
npm install --save-dev path-linter
```
or
```bash
yarn add --dev path-linter
```

## Configuration
`path-linter` needs a JSON configuration file somewhere in your project where you specify
your linting rules.

Linting rules are regular expressions and you can specify different rules for different folders.

Example:
```json
{
    "your-subdirectory": "<regex-for-linting>",
    "other/directory": "<another-regex-for-linting>"
}
```

You can also find an example in [sample-config.json](sample-config.json).

## Usage
```bash
npm run path-linter --config your-config-file.json
```
`--config <path>`  
Specifies the relative path to a configuration file. Required.

`--colorize`  
Enables colorization for the console output.

## Contributing
Feel free to open issues or pull requests if you have some improvement on the library. I'm open to everything!

## Authors
* **Attila Gyöngyösi** - [GitHub](https://github.com/attilagyongyosi)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
