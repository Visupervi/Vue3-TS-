/**
 * 函数实例
 */

// 函数重载

function add(x: string, y: string): string
function add(x: number, y: number): number

function add(x: string | number, y: string | number): string | number {
  if (typeof x === "string" && typeof y === "string") {
    return x + y;
  } else if (typeof x === "number" && typeof y === "number") {
    return x + y;
  }

}

//泛型
/**
 * 泛型
 * 在定义函数、接口、类的时候不能预先确定要使用的数据类型
 * 而是在使用函数、接口、类的时候才能确定数据的类型
 */

function getArr<T>(value: T, count: number): T[] {
  const arr: Array<T> = [];
  for (let i = 0; i < count; i++) {
    arr.push(value);
  }
  return arr;
}

const arr4 = getArr<string>("abccc", 5)
const arr3 = getArr<number>(100.23244, 5)

console.log(arr3[0].toFixed(2))
console.log(arr4[0].split(""))

// 多个泛型参数函数

function getMsg<K, V>(value1: K, value2: V): [K, V] {
  return [value1, value2];
}

// 泛型接口
/**
 * 在定义接口时， 为接口中的属性或方法定义泛型类型，在使用接口时
 * 再指定具体的泛型类型
 */

interface IBaseCRUD<T> {
  data: Array<T>;
  add: (t: T) => number;
  getUser: (id: number) => T;
}

class User {
  id: number;
  name?: string;
  age: number;

  constructor(id: number, name: string, age: number) {
    this.id = id
    this.name = name
    this.age = age
  }
}

class UserCURD implements IBaseCRUD<User> {
  data: Array<User> = [];

  add(user: User): number {
    this.data.push(user);
    console.log("this.data", this.data);
    return this.data.length;
  };

  getUser(id: number): User {
    return this.data.find(user => user.id === id);
  };
}

const userCRUD = new UserCURD();
userCRUD.add(new User(1, "TOM", 18))
userCRUD.add(new User(2, "JACK", 17))
userCRUD.add(new User(3, "ROSE", 16))
console.log(userCRUD.getUser(1))
