import { ValidationError } from '../generic/errors/validation-error';

type Value = string;

export class Email extends ValueObject<Value> {
  constructor(value: Value) {
    super(value);
  }

  static fromRaw(value: Value): Email {
    return new Email(value);
  }

  protected override validate(): void {
    if (!this.value.includes('@')) {
      throw new ValidationError('Invalid email');
    }
  }
}
