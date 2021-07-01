var GetterSetter = /** @class */ (function () {
    function GetterSetter(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    Object.defineProperty(GetterSetter.prototype, "fulName", {
        get: function () {
            console.log("进入获取器");
            return this.firstname + '_' + this.lastname;
        },
        set: function (str) {
            console.log("进入设置器");
            var names = str.split("_");
            this.firstname = names[1];
            this.lastname = names[0];
        },
        enumerable: false,
        configurable: true
    });
    return GetterSetter;
}());
var getterSetter = new GetterSetter("哈利", "波特");
console.log(getterSetter);
console.log(getterSetter.fulName);
getterSetter.fulName = "诸葛_孔明";
console.log(getterSetter.fulName);
// 静态成员：在类中通过static修饰的属性或者方法，那就是静态属性及静态方法，也称之静态成员
// 静态成员在使用的时候只能通过类名.方法/属性来调用
