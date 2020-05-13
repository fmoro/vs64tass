# 64tass README

Visual Studio Code language support for C64 development with [64tass](http://tass64.sourceforge.net/)

This extension is based in [VSCode KickAss (C64)](https://github.com/CaptainJiNX/vscode-kickass-c64) extension, coded by Roger Wilson.

## Features

- language configuration/syntax coloring
- build, run and debug commands
- support for [VICE](http://vice-emu.sourceforge.net/) and [C64 Debugger](https://c64-debugger.sourceforge.io/)

## Requirements

- 64tass cross-compiler for build
- [VICE](http://vice-emu.sourceforge.net/) and/or [C64 Debugger](https://c64-debugger.sourceforge.io/) for run and debug

## Extension Settings

This extension contributes the following settings:

- `64tass.compiler`: Full path to 64tass cross-compiler binary
- `64tass.vice`: Full path to VICE binary
- `4tass.c64Debugger`: Full path to C64 Debugger binary
- `64tass.runner`: Runner (VICE or C64 Debugger)
- `64tass.debugger`: Debugger (VICE or C64 Debugger)

## Known Issues

- Missing language server

## How to contribute

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) (with `esbenp.prettier-vscode`, `dbaeumer.vscode-eslint` extensions installed)
- [nvm](https://github.com/creationix/nvm) (download and install)

After you clone the repo, run

`nvm install` to get the latest node version

then

`npm install` to install all dependencies

then

`code .` to start coding...

If everything is setup correctly, the code should be automatically formatted correctly on each save.

Running the extension locally:

- Press `F5` to open a new window with the extension loaded.
- Create a new .asm file
- Verify that stuff works as expected.
- Relaunch the extension from the debug toolbar after making changes to the files listed above.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window load your changes.

Read more about extension development [here](https://code.visualstudio.com/api).

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release of 64tass
