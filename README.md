[![npm version](https://badge.fury.io/js/%40attilagyongyosi%2Fpath-linter.svg)](https://badge.fury.io/js/%40attilagyongyosi%2Fpath-linter)

# @attilagyongyosi/path-linter
Lightweight, zero-dependency library to lint file paths in a project.

1. [❔ But Why?](#but-why)
2. [❤ Neat Things](#neat-things)
3. [⚙ Installing](#installing)
4. [🛠 Configuration](#configuration)
    1. [Built-in Naming Convention Support](#built-in-conventions)
    2. [Linting Severity](#severity)
    3. [Ignoring Parts of Paths](#ignoring-parts)
    4. [Example Config](#example-config)
5. [🔄 Usage](#usage)
6. [👦 Contributing](#contributing)
7. [👨 Authors](#authors)
8. [📄 License](#license)

## 1. ❔ But Why? <a name="but-why"></a>
Well, my therapist says that I'm a bit too keen on static analysis.
I can't really help it though, so recently, I started to look for a way to
enforce a file naming convention for a big software project.

The NPM registry is not overly saturated with solutions to this problem, and
the ones I found left me hungry for more. Some way or the other, there was always
something bothering me.

For a while, I also wanted to do some open source project on my own, just for the sake
of trying myself in this game.  
So here it is!

It is currently **~12kb in size**, comes with **no dependencies**. The size could be smaller, I sacrificed it a bit on the altar 
of structural well-being.

Enjoy!

## 2. ❤ Neat Things <a name="neat-things"></a>
* ~12kb package size
* no dependencies
* supports file extension linting
* supports different naming convention per folder
* did I say it's flexible? It uses regular expressions, after all
* 100% test coverage

## 3. ⚙ Installing <a name="installing"></a>
`path-linter` should be added as a `devDependency`:
```bash
npm install --save-dev @attilagyongyosi/path-linter
```
or
```bash
yarn add --dev @attilagyongyosi/path-linter
```

## 4. 🛠 Configuration <a name="configuration"></a>
`path-linter` needs a JSON configuration file somewhere in your project where you specify
your linting rules.

You can specify different linting rules for different directories in your project.
Rules can either be a regular expression or one of the built-in naming conventions that
`path-linter` supports out of the box.

### 4.1 Built-in Naming Convention Support <a name="built-in-conventions"></a>
`path-linter` supports the following naming conventions, so you don't need to configure a
regular expression for them:
- `kebab-case`

### 4.2 Linting Severity <a name="severity"></a>
You can configure linting severity in the top-level `severity` configuration property.  

It is `error` by default which will fail the linting process when file path do not adhere
to configured conventions, or can be `warning` to just log warnings on failing files.

### 4.3 Ignoring Parts of the Paths <a name="ignoring-parts"></a>
There are situations where you want to skip certain parts of a file path and not have them linted.

One common example would be when you want your paths to adhere to `kebab-case` naming but you
also use Jest for testing. Jest mocks need to be in a directory called `__mocks__` which break
the linting rule.

To accommodate this situation, you can specify an `ignore` property for a linting rule config.
This property should be an array of strings and `path-linter` will ignore these substrings in file paths.

### 4.4 Example Config <a name="example-config"></a>
```json
{
    "severity": "warning",
    "rules": [{
        "directory": "src",
        "rule": "kebab-case",
        "ignore": [ "__tests__", "__mocks__" ]
    }, {
        "directory": "tests",
        "rule": ".*\\.spec\\.ts"
    }]
}
```

You can also find an example in [sample-config.json](sample-config.json).

## 5. 🔄 Usage <a name="usage"></a>
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

## 6. ‍👦 Contributing <a name="contributing"></a>
Feel free to open issues or pull requests if you have some improvement on the library. I'm open to everything!

## 7. 👨 Authors <a name="authors"></a>
* **Attila Gyöngyösi** - [GitHub](https://github.com/attilagyongyosi)

## 8. 📄 License <a name="license"></a>
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
