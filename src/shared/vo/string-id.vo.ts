import { ValidationError } from '../errors/validation-error';
import { ValueObject } from './value-object';

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
