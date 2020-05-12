import * as path from 'path';
import { window, workspace, OutputChannel } from 'vscode';
import { spawnSync } from 'child_process';

export type CompileOptions = {
  debug?: boolean;
};

export function compile(
  outputChannel: OutputChannel,
  options: CompileOptions = {}
): string | void {
  const { debug } = options;
  outputChannel.clear();
  outputChannel.show();
  const config = workspace.getConfiguration('64tass');

  if (!window.activeTextEditor) {
    outputChannel.append('No active editor');
  } else if (!window.activeTextEditor.document) {
    outputChannel.append('No active editor');
  } else if (!window.activeTextEditor.document.fileName) {
    outputChannel.append('File not saved');
  } else {
    const currentFile = window.activeTextEditor.document.fileName;
    const outputFile = `${path.basename(currentFile, '.asm')}.prg`;
    const workDir = path.dirname(currentFile);

    outputChannel.appendLine(`Compiling ${currentFile}`);

    const args = ['-Wall'];
    const debugArgs = debug ? ['--dump-labels', '--vice-labels'] : [];
    const proc = spawnSync(
      config.compiler,
      [...args, ...debugArgs, currentFile, '-o', outputFile],
      { cwd: workDir }
    );
    outputChannel.append(proc.stdout.toString());

    if (proc.status !== 0) {
      window.showErrorMessage('Compilation failed with errors.');
      window.showInformationMessage(proc.stderr.toString());
      outputChannel.append(proc.stderr.toString());
    } else {
      outputChannel.append(`${outputFile} successfully compiled`);
      return outputFile;
    }
  }
}
