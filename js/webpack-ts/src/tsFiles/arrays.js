(function () {
    var arr = [1, 2, 3, 4];
    // 范型写法
    // 注意：数组定义后，里面的数据类型必须和数组的类型一致。
    var arr1 = [1, 2, 3, 4, 5, 5, 6];
    // 元组类型： 在定义数组的时候，类型和数据的个数一开始就先定了
    // 注意：使用的时候数据的位置要和定义的时候一致
    var arr2 = ["1", 1, false];
    console.log();
    // 枚举类型
    var Color;
    (function (Color) {
        Color[Color["red"] = 0] = "red";
        Color[Color["green"] = 1] = "green";
        Color[Color["blue"] = 2] = "blue";
    })(Color || (Color = {}));
    ;
    var color = Color[0];
    console.log(color);
    // Any类型
    function showMsg() {
        return "";
    }
    function getUserInfo(obj) {
        return {
            name: 'Tom',
            age: 18
        };
    }
    // 类型断言
    // 需求：定义一个函数返回一个数字或者字符串的长度
    // 一个是<>, 一个是as
    function getLength(str) {
        if (str.length) {
            return str.length;
        }
        else {
            return str.toString().length;
        }
    }
    console.log(getLength(1234444));
    // 类型推断
})();
