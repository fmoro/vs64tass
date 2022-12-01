// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { compile } from './commands/compile';
import { run } from './commands/run';

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('64tass');
  let disposable;

  disposable = vscode.commands.registerCommand('64tass.build', () =>
    compile(outputChannel)
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('64tass.build-run', () =>
    run(compile(outputChannel), outputChannel)
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('64tass.build-debug', () =>
    run(compile(outputChannel, { debug: true }), outputChannel, { debug: true })
  );
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
