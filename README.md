<h1 align="center">ARCLIX - An open source CLI for React.</h1>

<br>
<p align="center">
    <img src="./public/images/arclix.svg">
     <br><br>
    <i>The <b>ARCLIX</b> is a command-line interface tool that you use to initialize and generate.
    <br> <b>React</b> applications directly from a command shell.</i>
  <br>
</p>
<br>

<hr>

<br>

## Documentation

Get started with ARCLIX, learn the commands for initializing and generating react components.

-   [Get Started](#getting-started)
-   [Creating an App](#creating-project) – How to create a new app.
-   [Generate a Component](#generating-component) - How to generate a component
-   [Contribution Guidelines](https://github.com/arclix/core/blob/master/CONTRIBUTING.md) - How to contribute to this project.
-   [LICENSE](#license)

If something doesn’t work, please [file an issue](https://github.com/arclix/core/issues/new).<br>
If you have questions or need help, please ask in [GitHub Discussions](https://github.com/arclix/core/issues/discussions)

For detailed documentation please visit [Arclix](https://arclix.github.io/arclix-docs/) website.

## Getting started

### Prerequisites

-   Install [Node.js](https://nodejs.org) which includes `npm`

### Setting Up a Project

Install the ARCLIX globally:

```
npm install -g arclix
```

## Creating project

```
npx arclix create [PROJECT NAME]
```

**_Note:_** It uses `create-react-app` by `Facebook` as a base to create a react project and add additional dependencies according to your needs.

After running the `create` command you'll be prompted with following questions

1. What template would you like to use?
    ```
    [TEMPLATE]
    ├── JavaScript
    └── TypeScript
    ```
2. What styling would you like to use?
    ```
    [STYLING]
    ├── CSS
    └── SCSS/SASS
    ```

Then it will create a directory named `[PROJECT NAME]` inside the current folder based on the prompts.

Inside the created directory, it will initialize the project and install the dependencies:

```
[PROJECT NAME]
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
    └── setupTests.js
```

### Run the application

```
cd [PROJECT NAME]
npm start
```

or

```
cd [PROJECT NAME]
yarn start
```

### Test the application

```
npm test
```

or

```
yarn test
```

Runs the test watcher in an interactive mode provided by `create-react-app` by `Facebook`.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

### Build the application

```
npm run build
```

or

```
yarn build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## Generating component

Go inside any React project including project generated by `create-react-app` or `next.js` or `arclix` to generate a component

```
npx arclix generate component [COMPONENT NAME]
```

or

```
npx arclix g c [COMPONENT NAME]
```

This will create a folder named `[COMPONENT NAME]` and generate the component inside the created folder that will reside on the folder you run the command.<br>

The template and stylings of the component will be taken from the React project.<br>

If you run the command in the root folder, by default this will generate it inside `src` directory.

**_Note:_** You cannot run this command outside of `React` project

Component Structure:

```
[COMPONENT NAME]
├── [COMPONENT NAME].css
├── [COMPONENT NAME].jsx
└── [COMPONENT NAME].test.jsx
```

Options or Flags available:

| Flag              | Description                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --addIndex        | Let's to import component without the folder name.<br/> For e.g: Instead of `import Sample from "./Sample/Sample"`, we can do `import { Sample } from "./Sample"` |
| --scopeStyle      | Scopes the style to the component.                                                                                                                                |
| --skipTest        | Skip the test file while generating component.                                                                                                                    |
| -p, --path [path] | Generates component based on the path.                                                                                                                            |
| -f, --flat        | Generates component without parent folder.                                                                                                                        |
| -v, --version     | Displays version number of Arclix in use.                                                                                                                         |
| -h, --help        | Provides help about the use of Arclix.                                                                                                                            |

## License

[MIT](https://github.com/arclix/core/blob/master/LICENSE)
