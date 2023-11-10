// Dependencies
import process from 'node:process'
import chalk from 'chalk'

function log(message: string) {
  return process.stdout.write(message + '\n')
}

function logError(message: string) {
  return process.stderr.write(message + '\n')
}

function baseLog(
  logger: typeof log | typeof logError,
  colorizePrefix: any,
  colorizeText: any,
  symbol: string,
  prefix: string,
  text?: string | string[]
) {
  const textParts = Array.isArray(text) ? text : [text || ''].filter(Boolean)
  const formattedText = textParts
    .map(textPart => colorizeText(textPart))
    .join('')

  logger(
    `${colorizePrefix(symbol)}  ${colorizePrefix(
      `[${prefix}]:`
    )} ${formattedText}`
  )
}

function warn(prefix: string, text?: string | string[]) {
  baseLog(log, chalk.yellow, chalk.yellow, '!', prefix, text)
}

function debug(prefix: string, text?: string | string[]) {
  if (process.env['NODE_ENV'] === 'development')
    baseLog(log, chalk.magenta, chalk.dim, '●', prefix, text)
}

function info(prefix: string, text?: string | string[]) {
  baseLog(log, chalk.cyan, chalk.dim, '◼', prefix, text)
}

function success(prefix: string, text: string) {
  baseLog(logError, chalk.green, chalk.dim, '✔', prefix, text)
}

function error(prefix: string, text?: string | string[]) {
  baseLog(logError, chalk.red, chalk.red, '▲', prefix, text)
}

export const logger = {
  colors: chalk,
  log,
  debug,
  info,
  warn,
  success,
  error
}
