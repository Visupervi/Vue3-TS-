// 接口是一种类型，一种规范，一种规则， 一个能力，更是一种约束
// 接口是对象的状态和行为的抽象

interface IPerson {
  name?: string,
  age?: number,
  gender?: string,
  id?: number
}

// 函数类型：通过接口的方式作为函数的类型来使用
// 定义一个接口，用来作为某个函数的类型使用

interface ISearchFun {
  (source: string, subString: string): boolean
}

const searchString: ISearchFun = (source: string, subString: string): boolean => {
  return source.search(subString) > -1;
}

console.log(searchString("嘿嘿嘿啦啦啦", "啦"));

// 类， 类型

// interface IFly{
//   ifly()
// }
//
// class Person implements IFly {
//   ifly() {
//     console.log("我可以飞");
//   }
// }
// const person = new Person();
//
// person.ifly();

class Person {
  name:string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  };
  sayHi(str){
    console.log(`${this.name} say ${str}`)
  }
}

class Student extends Person{
  gender: string;
  constructor(name:string, age: number, gender: string) {
    super(name, age);
    this.gender = gender
  }
  sayHi(str) {
    super.sayHi(str);
  }
}

const person = new Person("小明", 20);
person.sayHi("HiHiHi");
const student = new Student("小红", 18, "女");
student.sayHi("HaHaHa")
// public修饰符
/**
 * private修饰符，只能在当前类中访问，在外部不能访问，子类中也无法访问
 * protected修饰符，只能在当前类中访问，在外部不能访问，子类中可以访问
 * 如果构造函数中没有任何参数，类中的属性成员此时已经使用readonly进行修饰了，外部不能对这个属性进行修改
 * 
 *
 *
 */
class Animal {
  eyes: number;
  ears: number;
  constructor(eyes:number, ears: number) {
    this.eyes = eyes;
    this.ears = ears;
  }
  say(str:string){
    console.log(`${this.eyes}个眼睛${this.ears}个耳朵${str}`)
  }
}

class Cat extends Animal{
  name:string
  constructor(name:string, eyes:number, ears:number) {
    super(eyes,ears);
    this.name = name;
  }
  // say(str: string) {
  //   console.log(`${this.name}${str}`)
  //   super.say(str);
  // }
}

class Dog extends Animal{
  name: string;
  constructor(eyes:number, ears:number, name:string) {
    super(eyes, ears);
    this.name = name;
  }
  // say(str: string) {
  //   console.log(`${this.name}${str}`);
  //   super.say(str);
  // }
}

const cat= new Cat("小猫",2,2);
cat.say("喵喵喵的叫")

const dog = new Dog(2,2, "小狗");
dog.say("汪汪汪的叫")
