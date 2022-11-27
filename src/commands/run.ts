import * as path from 'path';
import { workspace, OutputChannel } from 'vscode';
import { spawn } from 'child_process';

export type DebugOptions = {
  debug?: boolean;
};

export function run(
  file?: string | void, 
  outputChannel?: OutputChannel | void, 
  options: DebugOptions = {}
) {
  if (!file) {
    return;
  }

  if (!outputChannel) {
    return;
  }

  const workDir = path.dirname(file);
  if (!workDir) {
    return;
  }

  const fileName = path.basename(file, '.prg');

  const config = workspace.getConfiguration('64tass');
  const { debug } = options;

  let command: string;
  let args: string[];
  if (debug) {
    if (config.debugger === 'vice') {
      command = config.vice;
      args = [
        '-logfile',
        `${fileName}-vice.log`,
        '-moncommands',
        `${fileName}.vs`,
        file,
      ];
    } else {
      command = config.c64Debugger;
      args = [
        'layout',
        '10',
        '-wait',
        '2500',
        '-prg',
        file,
        '-autojmp',
        '-debuginfo',
        `${fileName}.dbg`,
      ];
    }
  } else {
    if (config.runner === 'vice') {
      command = config.vice;
      args = ['-logfile', `${fileName}-vice.log`, file];
    } else {
      command = config.c64Debugger;
      args = ['layout', '1', '-wait', '2500', '-prg', file, '-autojmp'];
    }
  }

  const spawnOptions: any = {
    cwd: workDir,
    detached: true,
    stdio: 'inherit',
    shell: true,
  };

  // Helpful debugging information
  outputChannel.appendLine("");
  outputChannel.appendLine("************************************************************");
  outputChannel.appendLine('Running command   : ' + command);
  outputChannel.appendLine('  with args       : ' + JSON.stringify(args));
  outputChannel.appendLine('  and spawnOptions: ' + JSON.stringify(spawnOptions));

  spawn(command, args, spawnOptions);
}
