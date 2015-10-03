# Procore Client

[![Circle CI](https://circleci.com/gh/procore/wrench/tree/master.svg?style=svg&circle-token=f0bde5ea8669ef98eb7d7987c822c8ccef6f1656)](https://circleci.com/gh/procore/wrench/tree/master)

## Getting Started
- npm install
- npm run dev

## Testing
We're currently using [mocha](https://github.com/mochajs/mocha) as our
testing framework with the [chai](https://github.com/chaijs/chai)
assertion library.

Tests should go in a `__tests__/` alongside whatever source code they
test.

In order to run tests, simply run the following:
```sh
npm test
```

To have tests run as you edit and save them, run:
```sh
npm run test:watch
```

## Deployment
In order to avoid committing built bundles into master, we've setup a script that compiles the built files into their own repository: `<repository-name>-built`.

This paradigm gives us two things:
- the ability to keep our master branch clean of any built files
- During a staging/production deploy Rails can clone `<repository-name>-built` into its `public/assets` folder. Exposing our bundles to the asset pipeline.

In order to compile a branch for testing or deployment run:
```sh
npm run release
```

