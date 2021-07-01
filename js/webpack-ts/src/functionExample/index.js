/**
 * 函数实例
 */
function add(x, y) {
    if (typeof x === "string" && typeof y === "string") {
        return x + y;
    }
    else if (typeof x === "number" && typeof y === "number") {
        return x + y;
    }
}
//泛型
/**
 * 泛型
 * 在定义函数、接口、类的时候不能预先确定要使用的数据类型
 * 而是在使用函数、接口、类的时候才能确定数据的类型
 */
function getArr(value, count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(value);
    }
    return arr;
}
var arr4 = getArr("abccc", 5);
var arr3 = getArr(100.23244, 5);
console.log(arr3[0].toFixed(2));
console.log(arr4[0].split(""));
// 多个泛型参数函数
function getMsg(value1, value2) {
    return [value1, value2];
}
var User = /** @class */ (function () {
    function User(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    return User;
}());
var UserCURD = /** @class */ (function () {
    function UserCURD() {
        this.data = [];
    }
    UserCURD.prototype.add = function (user) {
        this.data.push(user);
        console.log("this.data", this.data);
        return this.data.length;
    };
    ;
    UserCURD.prototype.getUser = function (id) {
        return this.data.find(function (user) { return user.id === id; });
    };
    ;
    return UserCURD;
}());
var userCRUD = new UserCURD();
userCRUD.add(new User(1, "TOM", 18));
userCRUD.add(new User(2, "JACK", 17));
userCRUD.add(new User(3, "ROSE", 16));
console.log(userCRUD.getUser(1));
