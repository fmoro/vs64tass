import * as path from 'path';
import { workspace } from 'vscode';
import { spawn } from 'child_process';

export type DebugOptions = {
  debug?: boolean;
};

export function run(file?: string | void, options: DebugOptions = {}) {
  if (!file) {
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
      ];
    } else {
      command = config.c64Debugger;
      args = [
        'layout',
        '10',
        '-wait',
        '2500',
        '-pgr',
        file,
        '-autojmp',
        '-debuginfo',
        `${fileName}.dbg`,
      ];
    }
  } else {
    if (config.runner === 'vice') {
      command = config.vice;
      args = ['-logfile', `${fileName}-vice.log`];
    } else {
      command = config.c64Debugger;
      args = ['layout', '1', '-wait', '2500', '-pgr', file, '-autojmp'];
    }
  }

  const spawnOptions: any = {
    cwd: workDir,
    detached: true,
    stdio: 'inherit',
    shell: true,
  };

  spawn(command, args, spawnOptions);
}
