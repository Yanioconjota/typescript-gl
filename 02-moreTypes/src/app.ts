interface OAdmin {
  name: string;
  privileges: string[];
}

interface OEmployee {
  name: string;
  startDate: Date;
}

interface OElevatedEmployee extends OAdmin, OEmployee {}

const oe1: OElevatedEmployee = {
  name: 'Homero Simpson',
  privileges: ['create-server'],
  startDate: new Date()
};

console.log('oe1: ', oe1);

//Intersection Type --> Shorthand del código anterior

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Homero Thompson',
  privileges: ['create-server'],
  startDate: new Date()
};

console.log('e1: ', e1);

type Combinable = string | number; //Union: uno u otro
type Numeric = Combinable | number; //Union: uno u otro
type Universal = Combinable & Numeric; //Intersection: ambos

//Union vs Intersection

//Union: que recibe un valor que puede ser de un tipo u otro
//Intersection: combina multiples tipos en uno solo.
//https://medium.com/@Methrat0n/union-types-and-intersection-types-50c41c9b61d6

//Partial<Type> --> construye un tipo constituido por propiedades opcionales 

interface Todo {
  title: string;
  description: string;
}
 
const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>) => {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

const todo3 = updateTodo(todo2, {title: 'Fart in public'});

console.log('todo2: ',todo2);
console.log('todo3: ',todo3);

//Required<Type> --> Al contrario de Partial construye un tipo cuyas propiedades son todas requeridas

interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
//const obj2: Required<Props> = { a: 5 };//Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.

//Readonly<Type> Construye un tipo donde sus propiedades son solo de lectura, por ende, no pueden ser reasignadas

interface Message {
  title: string;
}
 
const msg: Readonly<Message> = {
  title: "Delete inactive users",
};
 
//msg.title = "Hello"; //Cannot assign to 'title' because it is a read-only property.

//function freeze<Type>(obj: Type): Readonly<Type>;

//Record<Keys, Type> --> Se utiliza para mapear las propiedades de un tipo dentro de otro tipo

interface DogInfo {
  age: number;
  breed: string
};

type DogName = 'Morgan' | 'Milo' | 'Negrito';

const dogs: Record<DogName, DogInfo> = {
  Morgan: { age: 3, breed: 'Stray'},
  Milo: { age: 7, breed: 'French Poodle' },
  Negrito: { age: 15, breed: 'Retriever' }
}

//Iterar con objetos en typescript: https://trungk18.com/experience/how-to-iterate-over-objects-in-typescript/
let dog: DogName;

for (dog in dogs) {
  console.log(dog, dogs[dog]);
}

//Pick<Type, Keys> --> Construye un tipo eligiendo set de valores 'keys' (string literals o union string literals) de un determinado tipo.

interface TextMessage {
  title: string;
  description: string;
  sent: boolean
}

type MessagePreview = Pick<TextMessage, "title" | "sent">

const msg1: MessagePreview = {
  title: 'Hola Morgan!',
  sent: true
};

console.log('msg1: ',msg1);

//Omit<Type, Keys> --> Construye un tipo con propiedades de otro tipo, omitiendo 'keys' selecccionadas (string literal o union string literals)

interface Book {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type BookPreview = Omit<Book, 'description'>;

const bookPreview: BookPreview = {
  title: 'Understanding something',
  completed: true,
  createdAt: 1615544252770
};

console.log('bookPreview: ' ,bookPreview)

type BookInfo = Omit<Book, 'completed' | 'createdAt'>;

const bookInfo: BookInfo = {
  title: 'Some random book title',
  description: 'About something cool'
};

console.log('bookInfo: ',bookInfo);

//Parameters<Type --> ?