// This function makes a basic range of numbers
const range = (low: number, high: number): Array<number> => new Array(high - low).fill(0).map((_, index) => index + low);

export default range;