# Node.js Server Skeleton

[![npm](https://img.shields.io/npm/v/@makenew/nodejs-server.svg)](https://www.npmjs.com/package/@makenew/nodejs-server)
[![GitHub Actions](https://github.com/makenew/nodejs-server/actions/workflows/check.yml/badge.svg)](https://github.com/makenew/nodejs-server/actions/workflows/check.yml)

Package skeleton for a Node.js server.

## Description

Bootstrap a new Node.js server in five minutes or less.

### Features

- Framework agnostic so you can bring one you like.
- Native [ECMAScript module] compatible with [Node.js].
- Package management with [npm].
- [Alpine Linux] based multi-stage [Docker] build for optimized production images.
- Images tagged on the [GitHub Container Registry] using version and commit checksum.
- Super fast, all natural JSON logging with [Pino].
- Graceful shutdown and health checks with [Terminus].
- Examples with configurable options and arguments powered by [yargs] with [landlubber].
- Linting with the [JavaScript Standard Style] using [ESLint].
- [Prettier] code.
- Futuristic debuggable unit testing with [AVA].
- Code coverage reporting with [Istanbul] and [c8].
- Continuous testing, deployment, and package publishing with [GitHub Actions].
- [Keep a CHANGELOG].
- Consistent coding with [EditorConfig].
- Badges from [Shields.io].
- Start coding instantly with [GitHub Codespaces].

[AVA]: https://github.com/avajs/ava
[Alpine Linux]: https://alpinelinux.org/
[Docker]: https://www.docker.com/
[ECMAScript module]: https://nodejs.org/api/esm.html
[ESLint]: https://eslint.org/
[EditorConfig]: https://editorconfig.org/
[GitHub Actions]: https://github.com/features/actions
[GitHub Codespaces]: https://github.com/features/packages
[GitHub Container Registry]: https://github.com/features/packages
[Istanbul]: https://istanbul.js.org/
[JavaScript Standard Style]: https://standardjs.com/
[Keep a CHANGELOG]: https://keepachangelog.com/
[Node.js]: https://nodejs.org/
[Pino]: https://getpino.io/
[Prettier]: https://prettier.io/
[Shields.io]: https://shields.io/
[Terminus]: https://github.com/godaddy/terminus
[c8]: https://github.com/bcoe/c8
[landlubber]: https://github.com/razor-x/landlubber
[npm]: https://www.npmjs.com/
[yargs]: https://yargs.js.org/

### Bootstrapping a new project

1. Create an empty (**non-initialized**) repository on GitHub.
2. Clone the main branch of this repository with
   ```
   $ git clone --single-branch git@github.com:makenew/nodejs-server.git <new-node-app>
   $ cd <new-node-app>
   ```
   Optionally, reset to the latest version with
   ```
   $ git reset --hard <version-tag>
   ```
3. Run
   ```
   $ ./makenew.sh
   ```
   This will replace the boilerplate, delete itself,
   remove the git remote, remove upstream tags,
   and stage changes for commit.
4. Create the required GitHub repository secrets.
5. Review, commit, and push the changes to GitHub with
   ```
   $ git diff --cached
   $ git commit -m "Replace makenew boilerplate"
   $ git remote add origin git@github.com:<user>/<new-node-app>.git
   $ git push -u origin main
   ```
6. Ensure the GitHub action passes,
   then publish the initial version of the package with
   ```
   $ nvm install
   $ npm install
   $ npm version patch
   ```

### Updating from this skeleton

If you want to pull in future updates from this skeleton,
you can fetch and merge in changes from this repository.

Add this as a new remote with

```
$ git remote add upstream git@github.com:makenew/nodejs-server.git
```

You can then fetch and merge changes with

```
$ git fetch --no-tags upstream
$ git merge upstream/main
```

#### Changelog for this skeleton

Note that `CHANGELOG.md` is just a template for this skeleton.
The actual changes for this project are documented in the commit history
and summarized under [Releases].

[Releases]: https://github.com/makenew/nodejs-server/releases

## Usage

### From Docker

The application is distributed as a [Docker container].
Start the server inside a container with

```
$ docker run --init --read-only --publish 8080:8080 ghcr.io/makenew/nodejs-server
```

[Docker container]: https://github.com/makenew/nodejs-server/pkgs/container/nodejs-server

### From npx

The server is included in the published [npm package] and may be run using npx with

```
$ npx @makenew/nodejs-server --production
```

[npm package]: https://www.npmjs.com/package/@makenew/nodejs-server

### From source

[Download a release][Releases] and extract the source code.
Then install the production dependencies and start the server with

```
$ npm ci --omit=dev
$ npm start:production
```

[Releases]: https://github.com/makenew/nodejs-server/releases

## Installation

This app is also published as a package on [npm].
Add this as a dependency to your project using [npm] with

```
$ npm install @makenew/nodejs-server
```

[npm]: https://www.npmjs.com/

## Development and Testing

### Quickstart

```
$ git clone https://github.com/makenew/nodejs-server.git
$ cd nodejs-server
$ nvm install
$ npm install
```

Run each command below in a separate terminal window:

```
$ npm start
$ npm run test:watch
```

Primary development tasks are defined under `scripts` in `package.json`
and available via `npm run`.
View them with

```
$ npm run
```

### Source code

The [source code] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:makenew/nodejs-server.git
```

[source code]: https://github.com/makenew/nodejs-server

### Requirements

You will need [Node.js] with [npm] and a [Node.js debugging] client.

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

Set the active version for each shell session with

```
$ nvm use
```

Install the development dependencies with

```
$ npm install
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm

### Smoke tests

Any test file ending in `.test.js` is a smoke test
and runs separately from tests ending in `.spec.js`.
A smoke test verifies the server passes certain external checks.
During the GitHub Actions check, the Docker container is built and started,
then the smoke tests make requests to the server in a separate process.

To run the smoke tests locally, first start the test server with

```
$ npm start:test
```

and then in a separate terminal, run the smoke tests with

```
$ npm test:smoke
```

### Publishing

Use the [`npm version`][npm-version] command to release a new version.
This will push a new git tag which will trigger a GitHub action.

Publishing may be triggered using a [workflow_dispatch on GitHub Actions].

[npm-version]: https://docs.npmjs.com/cli/version
[workflow_dispatch on GitHub Actions]: https://github.com/makenew/nodejs-server/actions?query=workflow%3Aversion

## GitHub Actions

_GitHub Actions should already be configured: this section is for reference only._

The following repository secrets must be set on [GitHub Actions]:

- `NPM_TOKEN`: npm token for installing and publishing packages.
- `GH_USER`: The GitHub user's username to pull and push containers.
- `GH_TOKEN`: A personal access token for the user to pull and push containers.

These must be set manually.

### Secrets for Optional GitHub Actions

The version and format GitHub actions
require a user with write access to the repository
including access to read, write, and delete packages.
Set these additional secrets to enable the action:

- `GH_TOKEN`: A personal access token for the user.
- `GIT_USER_NAME`: The GitHub user's real name.
- `GIT_USER_EMAIL`: The GitHub user's email.
- `GPG_PRIVATE_KEY`: The GitHub user's [GPG private key].
- `GPG_PASSPHRASE`: The GitHub user's GPG passphrase.

[GitHub Actions]: https://github.com/features/actions
[GPG private key]: https://github.com/marketplace/actions/import-gpg#prerequisites

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/makenew/nodejs-server/fork).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

This app is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
