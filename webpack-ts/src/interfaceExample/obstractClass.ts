/**
 * 抽象类作为其他派生类的基类使用， 他不能被实例化，不同于接口，抽象类可以包含成员的实现细节
 * obstract关键字是用于定义抽象类和抽象类内部定义的抽象方法
 */

abstract class Animal1 {
  abstract eat()
}

//实现多态
class Cat1 extends Animal1{
  eat(){
    console.log("小猫爱吃鱼");
  }
}

class Dog1 extends Animal1{
  eat() {
    console.log("小狗爱吃骨头");
  }
}

const d1 = new Dog1();
const c1 = new Cat1();

d1.eat();
c1.eat();
