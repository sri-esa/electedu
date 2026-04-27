type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  timestamp: string
  level: LogLevel
  service: string
  operation: string
  message: string
  context?: Record<string, unknown>
  errorMessage?: string
  durationMs?: number
}

/**
 * @description Creates a structured logger for the specified service
 * @param {string} serviceName - Name of the service initializing the logger
 * @returns {object} Structured logger instance with debug, info, warn, error, and timed methods
 */
export function createLogger(serviceName: string) {
  function log(
    level: LogLevel,
    operation: string,
    message: string,
    context?: Record<string, unknown>,
    error?: unknown,
    durationMs?: number
  ): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: serviceName,
      operation,
      message,
      context,
      errorMessage: error instanceof Error
        ? error.message : undefined,
      durationMs,
    }
    const output = JSON.stringify(entry)
    if (level === 'error') console.error(output)
    else if (level === 'warn') console.warn(output)
    else console.log(output)
  }

  return {
    debug: (op: string, msg: string, ctx?: Record<string, unknown>) =>
      log('debug', op, msg, ctx),
    info: (op: string, msg: string, ctx?: Record<string, unknown>) =>
      log('info', op, msg, ctx),
    warn: (
      op: string,
      msg: string,
      ctx?: Record<string, unknown>,
      err?: unknown
    ) => log('warn', op, msg, ctx, err),
    error: (
      op: string,
      msg: string,
      ctx?: Record<string, unknown>,
      err?: unknown
    ) => log('error', op, msg, ctx, err),
    timed: async <T>(
      op: string,
      fn: () => Promise<T>,
      ctx?: Record<string, unknown>
    ): Promise<T> => {
      const start = Date.now()
      try {
        const result = await fn()
        log('info', op, 'completed', ctx, undefined, Date.now() - start)
        return result
      } catch (err) {
        log('error', op, 'failed', ctx, err, Date.now() - start)
        throw err
      }
    }
  }
}
