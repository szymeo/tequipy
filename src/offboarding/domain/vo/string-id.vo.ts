import { ValidationError } from '../generic/errors/validation-error';

type Value = string;

export class StringId extends ValueObject<Value> {
  constructor(value: Value) {
    super(value);
  }

  static fromRaw(value: Value): StringId {
    return new StringId(value);
  }

  protected validate(): void {
    if (this.value.length < 5) {
      throw new ValidationError('StringId must be at least 5 characters long');
    }
  }
}
