import { exhaustiveSwitchError, getOwnProperty, hasOwnProperty } from "@tldraw/utils";
function formatPath(path) {
  if (!path.length) {
    return null;
  }
  let formattedPath = "";
  for (const item of path) {
    if (typeof item === "number") {
      formattedPath += `.${item}`;
    } else if (item.startsWith("(")) {
      if (formattedPath.endsWith(")")) {
        formattedPath = `${formattedPath.slice(0, -1)}, ${item.slice(1)}`;
      } else {
        formattedPath += item;
      }
    } else {
      formattedPath += `.${item}`;
    }
  }
  if (formattedPath.startsWith(".")) {
    return formattedPath.slice(1);
  }
  return formattedPath;
}
class ValidationError extends Error {
  constructor(rawMessage, path = []) {
    const formattedPath = formatPath(path);
    const indentedMessage = rawMessage.split("\n").map((line, i) => i === 0 ? line : `  ${line}`).join("\n");
    super(path ? `At ${formattedPath}: ${indentedMessage}` : indentedMessage);
    this.rawMessage = rawMessage;
    this.path = path;
  }
  name = "ValidationError";
}
function prefixError(path, fn) {
  try {
    return fn();
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ValidationError(err.rawMessage, [path, ...err.path]);
    }
    throw new ValidationError(err.toString(), [path]);
  }
}
function typeToString(value) {
  if (value === null)
    return "null";
  if (Array.isArray(value))
    return "an array";
  const type = typeof value;
  switch (type) {
    case "bigint":
    case "boolean":
    case "function":
    case "number":
    case "string":
    case "symbol":
      return `a ${type}`;
    case "object":
      return `an ${type}`;
    case "undefined":
      return "undefined";
    default:
      exhaustiveSwitchError(type);
  }
}
class Validator {
  constructor(validationFn) {
    this.validationFn = validationFn;
  }
  /**
   * Asserts that the passed value is of the correct type and returns it. The returned value is
   * guaranteed to be referentially equal to the passed value.
   */
  validate(value) {
    const validated = this.validationFn(value);
    if (process.env.NODE_ENV !== "production" && !Object.is(value, validated)) {
      throw new ValidationError("Validator functions must return the same value they were passed");
    }
    return validated;
  }
  /**
   * Returns a new validator that also accepts null or undefined. The resulting value will always be
   * null.
   */
  nullable() {
    return nullable(this);
  }
  /**
   * Returns a new validator that also accepts null or undefined. The resulting value will always be
   * null.
   */
  optional() {
    return optional(this);
  }
  /**
   * Refine this validation to a new type. The passed-in validation function should throw an error
   * if the value can't be converted to the new type, or return the new type otherwise.
   */
  refine(otherValidationFn) {
    return new Validator((value) => {
      return otherValidationFn(this.validate(value));
    });
  }
  check(nameOrCheckFn, checkFn) {
    if (typeof nameOrCheckFn === "string") {
      return this.refine((value) => {
        prefixError(`(check ${nameOrCheckFn})`, () => checkFn(value));
        return value;
      });
    } else {
      return this.refine((value) => {
        nameOrCheckFn(value);
        return value;
      });
    }
  }
}
class ArrayOfValidator extends Validator {
  constructor(itemValidator) {
    super((value) => {
      const arr = array.validate(value);
      for (let i = 0; i < arr.length; i++) {
        prefixError(i, () => itemValidator.validate(arr[i]));
      }
      return arr;
    });
    this.itemValidator = itemValidator;
  }
  nonEmpty() {
    return this.check((value) => {
      if (value.length === 0) {
        throw new ValidationError("Expected a non-empty array");
      }
    });
  }
  lengthGreaterThan1() {
    return this.check((value) => {
      if (value.length <= 1) {
        throw new ValidationError("Expected an array with length greater than 1");
      }
    });
  }
}
class ObjectValidator extends Validator {
  constructor(config, shouldAllowUnknownProperties = false) {
    super((object2) => {
      if (typeof object2 !== "object" || object2 === null) {
        throw new ValidationError(`Expected object, got ${typeToString(object2)}`);
      }
      for (const [key, validator] of Object.entries(config)) {
        prefixError(key, () => {
          ;
          validator.validate(getOwnProperty(object2, key));
        });
      }
      if (!shouldAllowUnknownProperties) {
        for (const key of Object.keys(object2)) {
          if (!hasOwnProperty(config, key)) {
            throw new ValidationError(`Unexpected property`, [key]);
          }
        }
      }
      return object2;
    });
    this.config = config;
    this.shouldAllowUnknownProperties = shouldAllowUnknownProperties;
  }
  allowUnknownProperties() {
    return new ObjectValidator(this.config, true);
  }
  /**
   * Extend an object validator by adding additional properties.
   *
   * @example
   *
   * ```ts
   * const animalValidator = T.object({
   * 	name: T.string,
   * })
   * const catValidator = animalValidator.extend({
   * 	meowVolume: T.number,
   * })
   * ```
   */
  extend(extension) {
    return new ObjectValidator({ ...this.config, ...extension });
  }
}
class UnionValidator extends Validator {
  constructor(key, config, unknownValueValidation) {
    super((input) => {
      if (typeof input !== "object" || input === null) {
        throw new ValidationError(`Expected an object, got ${typeToString(input)}`, []);
      }
      const variant = getOwnProperty(input, key);
      if (typeof variant !== "string") {
        throw new ValidationError(
          `Expected a string for key "${key}", got ${typeToString(variant)}`
        );
      }
      const matchingSchema = hasOwnProperty(config, variant) ? config[variant] : void 0;
      if (matchingSchema === void 0) {
        return this.unknownValueValidation(input, variant);
      }
      return prefixError(`(${key} = ${variant})`, () => matchingSchema.validate(input));
    });
    this.key = key;
    this.config = config;
    this.unknownValueValidation = unknownValueValidation;
  }
  validateUnknownVariants(unknownValueValidation) {
    return new UnionValidator(this.key, this.config, unknownValueValidation);
  }
}
class DictValidator extends Validator {
  constructor(keyValidator, valueValidator) {
    super((object2) => {
      if (typeof object2 !== "object" || object2 === null) {
        throw new ValidationError(`Expected object, got ${typeToString(object2)}`);
      }
      for (const [key, value] of Object.entries(object2)) {
        prefixError(key, () => {
          keyValidator.validate(key);
          valueValidator.validate(value);
        });
      }
      return object2;
    });
    this.keyValidator = keyValidator;
    this.valueValidator = valueValidator;
  }
}
function typeofValidator(type) {
  return new Validator((value) => {
    if (typeof value !== type) {
      throw new ValidationError(`Expected ${type}, got ${typeToString(value)}`);
    }
    return value;
  });
}
const unknown = new Validator((value) => value);
const any = new Validator((value) => value);
const string = typeofValidator("string");
const number = typeofValidator("number").check((number2) => {
  if (Number.isNaN(number2)) {
    throw new ValidationError("Expected a number, got NaN");
  }
  if (!Number.isFinite(number2)) {
    throw new ValidationError(`Expected a finite number, got ${number2}`);
  }
});
const positiveNumber = number.check((value) => {
  if (value < 0)
    throw new ValidationError(`Expected a positive number, got ${value}`);
});
const nonZeroNumber = number.check((value) => {
  if (value <= 0)
    throw new ValidationError(`Expected a non-zero positive number, got ${value}`);
});
const integer = number.check((value) => {
  if (!Number.isInteger(value))
    throw new ValidationError(`Expected an integer, got ${value}`);
});
const positiveInteger = integer.check((value) => {
  if (value < 0)
    throw new ValidationError(`Expected a positive integer, got ${value}`);
});
const nonZeroInteger = integer.check((value) => {
  if (value <= 0)
    throw new ValidationError(`Expected a non-zero positive integer, got ${value}`);
});
const boolean = typeofValidator("boolean");
const bigint = typeofValidator("bigint");
function literal(expectedValue) {
  return new Validator((actualValue) => {
    if (actualValue !== expectedValue) {
      throw new ValidationError(`Expected ${expectedValue}, got ${JSON.stringify(actualValue)}`);
    }
    return expectedValue;
  });
}
const array = new Validator((value) => {
  if (!Array.isArray(value)) {
    throw new ValidationError(`Expected an array, got ${typeToString(value)}`);
  }
  return value;
});
function arrayOf(itemValidator) {
  return new ArrayOfValidator(itemValidator);
}
const unknownObject = new Validator((value) => {
  if (typeof value !== "object" || value === null) {
    throw new ValidationError(`Expected object, got ${typeToString(value)}`);
  }
  return value;
});
function object(config) {
  return new ObjectValidator(config);
}
function isValidJson(value) {
  if (value === null || typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(isValidJson);
  }
  if (typeof value === "object") {
    return Object.values(value).every(isValidJson);
  }
  return false;
}
const jsonValue = new Validator((value) => {
  if (isValidJson(value)) {
    return value;
  }
  throw new ValidationError(`Expected json serializable value, got ${typeof value}`);
});
function jsonDict() {
  return dict(string, jsonValue);
}
function dict(keyValidator, valueValidator) {
  return new DictValidator(keyValidator, valueValidator);
}
function union(key, config) {
  return new UnionValidator(key, config, (unknownValue, unknownVariant) => {
    throw new ValidationError(
      `Expected one of ${Object.keys(config).map((key2) => JSON.stringify(key2)).join(" or ")}, got ${JSON.stringify(unknownVariant)}`,
      [key]
    );
  });
}
function model(name, validator) {
  return new Validator((value) => {
    const prefix = value && typeof value === "object" && "id" in value && typeof value.id === "string" ? `${name}(id = ${value.id})` : name;
    return prefixError(prefix, () => validator.validate(value));
  });
}
function setEnum(values) {
  return new Validator((value) => {
    if (!values.has(value)) {
      const valuesString = Array.from(values, (value2) => JSON.stringify(value2)).join(" or ");
      throw new ValidationError(`Expected ${valuesString}, got ${value}`);
    }
    return value;
  });
}
function optional(validator) {
  return new Validator((value) => {
    if (value === void 0)
      return void 0;
    return validator.validate(value);
  });
}
function nullable(validator) {
  return new Validator((value) => {
    if (value === null)
      return null;
    return validator.validate(value);
  });
}
function literalEnum(...values) {
  return setEnum(new Set(values));
}
export {
  ArrayOfValidator,
  DictValidator,
  ObjectValidator,
  UnionValidator,
  ValidationError,
  Validator,
  any,
  array,
  arrayOf,
  bigint,
  boolean,
  dict,
  integer,
  jsonDict,
  jsonValue,
  literal,
  literalEnum,
  model,
  nonZeroInteger,
  nonZeroNumber,
  nullable,
  number,
  object,
  optional,
  positiveInteger,
  positiveNumber,
  setEnum,
  string,
  union,
  unknown,
  unknownObject
};
//# sourceMappingURL=validation.mjs.map
