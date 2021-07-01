// 类型注解： 是一种轻量级的为函数变量添加的约束
function sayHi(params) {
    console.log(params + "Hello Wold");
}
console.log(sayHi("1"));
function showPersonInfo(person) {
    console.log(person.userName);
    console.log(person.age);
    console.log(person.gender);
}
showPersonInfo({
    userName: "TOM",
    age: 20,
    gender: "女"
});
var Person1 = /** @class */ (function () {
    function Person1(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Person1.prototype.showFullName = function () {
        console.log(this.firstName + "_" + this.lastName);
    };
    return Person1;
}());
var person1 = new Person1("诸葛", "孔明");
person1.showFullName();
