export class ElectEduError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ElectEduError'
  }
}

export class ValidationError extends ElectEduError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, context)
    this.name = 'ValidationError'
  }
}

export class GeminiError extends ElectEduError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'GEMINI_ERROR', 503, context)
    this.name = 'GeminiError'
  }
}

export class DataLoadError extends ElectEduError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'DATA_LOAD_ERROR', 500, context)
    this.name = 'DataLoadError'
  }
}
