//Aliases

type Combinable = number | string;

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}

interface Person {
  name: string,
  age: Combinable,
  hobbies: string[],
  role: Role,
  status?: [boolean, number]
}
const person: Person = {
  name: 'Homero Thompson',
  age: 37,
  hobbies: ['eating', 'TV Surfing'],
  role: Role.ADMIN,
};

const users: Person[] = [
  person,
  {
    name: 'James Howlett',
    age: 'unknown',
    hobbies: ['fighting', 'smoking', 'drinking'],
    role: Role.AUTHOR,
    status: [true, 1984]
  }
]


for (let user of users) {
  console.log(user);
  if (user.status) {
    console.log(`${user.name} is active since ${user.status[1]}`)
  }
}

const addFunciton = (n1: number, n2: number, showResult?: boolean, phrase?: string) => {
  const result = n1 + n2;
  if (showResult) {
    console.log(`${phrase} ${result}`);
  } else {
    console.log(result);
  }
}

addFunciton(45, 66, true, 'Good Job');
addFunciton(45, 12, false);

//Alias
type ConversionDescriptor = 'as-number' | 'as-string';

// resultConversion: 'as-number' | 'as-string' literal type conmbinado con union type
//https://www.typescriptlang.org/docs/handbook/literal-types.html

const combine = (
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor) => {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2;// --> Number(input1 + input2)
  } else {
    result = `${input1} ${input2}`;
  }

  return result;
}


const combineAges = combine(30, 26, 'as-number');
console.log('combineAges: ',combineAges);

const combineNames = combine('Homero', 'Thompson', 'as-string');
console.log('combineNames: ',combineNames);

const combineStringAges = combine('30', '26', 'as-number');
console.log('combineStringAges: ',combineStringAges);

const combineAgesString = combine(30, 26, 'as-string');
console.log('combineAgesString: ',combineAgesString);

const addNumbers = (n1: number, n2: number): number => {
  return n1 + n2;
}

const printNumbers = (num: number): void => {
  console.log('result: ',num);
}

printNumbers(addNumbers(5, 12));//17

console.log(printNumbers(addNumbers(5, 12)))//undefined

let someUndefinedValue: undefined; //undefined --> es un tipo válido de typescript

const printNumbersAlt = (num: number): undefined => {
  console.log('result: ',num);
  return;
}

printNumbersAlt(5);//5 🤷

//functions as types

let combinedValues: (a: number, b: number) => number = addNumbers;
console.log(combinedValues(8,8));

// combinedValues = 5; // --> let combinedValues: (n1: number, n2: number) => number Type 'number' is not assignable to type '(n1: number, n2: number) => number'

//combinedValues = printNumbers; --> Type '(num: number) => void' is not assignable to type '(a: number, b: number) => number'. Type 'void' is not assignable to type 'number'

const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(5, 5, printNumbers);
addAndHandle(10, 20, (result) => {
  console.log('result is: ', result);
});

//Type unknown --> parecido al type any pero toma el tipo del último valor asignado 
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Homero';
//userName = userInput; --> Type 'unknown' is not assignable to type 'string'

if (typeof userInput === 'string') {
  userName = userInput;
}

//Type never --> El tipo never representa el tipo de valores que nunca ocurren. Por ejemplo, never es retornado por la expresión de una función que siempre lanza una excepción o alguna que nunca retorna valores.
//Se utilizan por lo general para mensajes de error y romper la ejecución de tu código hasta que el error sea corregido.
//https://apuntes.de/typescript/never/#gsc.tab=0

const generateError = (message: string, code: number): never => {
  throw { message: message, code: code };
}

//generateError('An error occurred!', 500);// {message: 'An error occurred!', code: 500}