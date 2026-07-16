export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Nicht gefunden') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Nicht autorisiert') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Ungültige Eingabe') {
    super(message, 400)
    this.name = 'ValidationError'
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Konflikt mit bestehenden Daten') {
    super(message, 409)
    this.name = 'ConflictError'
  }
}