export class UserAlreadyExistsError extends Error {
  constructor(cause?: unknown) {
    super('User already exists', { cause });
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidFormError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = 'InvalidFormError';
  }
}