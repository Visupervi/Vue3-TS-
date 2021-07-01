// 类型注解： 是一种轻量级的为函数变量添加的约束
function sayHi(params: string) {
  console.log(`${params}Hello Wold`);
}
console.log(sayHi("1"))

interface IPerson {
  userName: string,
  lastName?: string,
  firstName?: string,
  age?: number,
  gender?: string
}

function showPersonInfo(person:IPerson){
  console.log(person.userName)
  console.log(person.age)
  console.log(person.gender)
}

showPersonInfo({
  userName:"TOM",
  age: 20,
  gender: "女"
})

class Person1{
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  showFullName(){
    console.log(`${this.firstName}_${this.lastName}`)
  }
}
const person1 = new Person1("诸葛", "孔明")
person1.showFullName();
