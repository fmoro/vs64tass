import * as path from 'path';
import { workspace, window } from 'vscode';
import { spawn } from 'child_process';

export type DebugOptions = {
  debug?: boolean;
};

export function run(outputFile?: string | void, options: DebugOptions = {}) {
  if (!outputFile) {
    throw new Error('lalala');
    return;
  }
  const workDir = path.dirname(outputFile);

  if (!workDir) {
    throw new Error('lalala');
    return;
  }
  const config = workspace.getConfiguration('64tass');
  const { debug } = options;

  const spawnOptions: any = {
    cwd: workDir,
    detached: true,
    stdio: 'inherit',
    shell: true,
  };

  if (config.useC64Debugger) {
    const layoutArg = `-layout ${debug ? '10' : '1'}`;
    const args = ['-wait 2500', '-prg', outputFile, '-autojmp'];
    const debugArgs = debug
      ? ['-debuginfo', `${path.basename(outputFile, '.prg')}.dbg`]
      : [];
    spawn(
      config.c64DebuggerBin,
      [layoutArg, ...debugArgs, ...args],
      spawnOptions
    );
  } else {
    const logfile = `${path.basename(outputFile)}-vice.log`;
    const args = ['-logfile', logfile];
    const debugArgs = debug
      ? ['-moncommands', `${path.basename(outputFile, '.prg')}.vs`]
      : [];
    spawn(config.viceBin, [...args, ...debugArgs, outputFile], spawnOptions);
  }
}
