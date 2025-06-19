import { Transform } from 'class-transformer';

/**
 * This decorator is used to transform a string into an array of numbers.
 * This allows us to e.g. send a string of comma-separated numbers as params and validate them against a numeric enum.
 * @returns a function that transforms a string into an array of numbers.
 */
export function StringToNumberArray() {
  return Transform(({ value }: { value: string | [] }) => {
    if (typeof value === 'string') {
      return value.split(',').map((v) => Number(v.trim()));
    }
    return value;
  });
}
