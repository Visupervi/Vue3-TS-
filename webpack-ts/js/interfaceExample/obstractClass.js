/**
 * 抽象类作为其他派生类的基类使用， 他不能被实例化，不同于接口，抽象类可以包含成员的实现细节
 * obstract关键字是用于定义抽象类和抽象类内部定义的抽象方法
 */
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
var Animal1 = /** @class */ (function () {
    function Animal1() {
    }
    return Animal1;
}());
//实现多态
var Cat1 = /** @class */ (function (_super) {
    __extends(Cat1, _super);
    function Cat1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat1.prototype.eat = function () {
        console.log("小猫爱吃鱼");
    };
    return Cat1;
}(Animal1));
var Dog1 = /** @class */ (function (_super) {
    __extends(Dog1, _super);
    function Dog1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog1.prototype.eat = function () {
        console.log("小狗爱吃骨头");
    };
    return Dog1;
}(Animal1));
var d1 = new Dog1();
var c1 = new Cat1();
d1.eat();
c1.eat();
