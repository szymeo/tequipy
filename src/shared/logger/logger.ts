import { LogLevel } from './log-level';
import { Namespace } from './namespace';
import { prettyLog } from './pretty-log';

export class Logger {
  private readonly _namespace: Namespace;

  constructor(namespace: string) {
    this._namespace = new Namespace(namespace);
  }

  error(message: any, ...args: unknown[]): void {
    this._log(LogLevel.ERROR, message, ...args);
  }

  info(message: any, ...args: unknown[]): void {
    this._log(LogLevel.INFO, message, ...args);
  }

  debug(message: any, ...args: unknown[]): void {
    this._log(LogLevel.DEBUG, message, ...args);
  }

  warn(message: any, ...args: unknown[]): void {
    this._log(LogLevel.WARN, message, ...args);
  }

  private _log(level: LogLevel, message: string, ...args: unknown[]): void {
    prettyLog(level, this._namespace, message, ...args);
  }
}
