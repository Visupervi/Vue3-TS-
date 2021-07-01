// 接口是一种类型，一种规范，一种规则， 一个能力，更是一种约束
// 接口是对象的状态和行为的抽象
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var searchString = function (source, subString) {
    return source.search(subString) > -1;
};
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
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    ;
    Person.prototype.sayHi = function (str) {
        console.log(this.name + " say " + str);
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, gender) {
        var _this = _super.call(this, name, age) || this;
        _this.gender = gender;
        return _this;
    }
    Student.prototype.sayHi = function (str) {
        _super.prototype.sayHi.call(this, str);
    };
    return Student;
}(Person));
var person = new Person("小明", 20);
person.sayHi("HiHiHi");
var student = new Student("小红", 18, "女");
student.sayHi("HaHaHa");
// public修饰符
/**
 * private修饰符，只能在当前类中访问，在外部不能访问，子类中也无法访问
 * protected修饰符，只能在当前类中访问，在外部不能访问，子类中可以访问
 * 如果构造函数中没有任何参数，类中的属性成员此时已经使用readonly进行修饰了，外部不能对这个属性进行修改
 *
 *
 *
 */
var Animal = /** @class */ (function () {
    function Animal(eyes, ears) {
        this.eyes = eyes;
        this.ears = ears;
    }
    Animal.prototype.say = function (str) {
        console.log(this.eyes + "\u4E2A\u773C\u775B" + this.ears + "\u4E2A\u8033\u6735" + str);
    };
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name, eyes, ears) {
        var _this = _super.call(this, eyes, ears) || this;
        _this.name = name;
        return _this;
    }
    return Cat;
}(Animal));
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(eyes, ears, name) {
        var _this = _super.call(this, eyes, ears) || this;
        _this.name = name;
        return _this;
    }
    return Dog;
}(Animal));
var cat = new Cat("小猫", 2, 2);
cat.say("喵喵喵的叫");
var dog = new Dog(2, 2, "小狗");
dog.say("汪汪汪的叫");
