(
  () => {
    let arr: number[] = [1, 2, 3, 4];
// 范型写法
// 注意：数组定义后，里面的数据类型必须和数组的类型一致。
    let arr1: Array<number> = [1, 2, 3, 4, 5, 5, 6];
// 元组类型： 在定义数组的时候，类型和数据的个数一开始就先定了
// 注意：使用的时候数据的位置要和定义的时候一致
    let arr2: [string, number, boolean] = ["1", 1, false];
    console.log();

// 枚举类型
    enum Color {
      red,
      green,
      blue
    };

    const color = Color[0];
    console.log(color);

// Any类型

    function showMsg(): string {
      return ""
    }

    function getUserInfo(obj: object): object {
      return {
        name: 'Tom',
        age: 18
      }
    }

// 类型断言

// 需求：定义一个函数返回一个数字或者字符串的长度
// 一个是<>, 一个是as

    function getLength(str: string | number): number {
      if ((<string>str).length) {
        return (<string>str).length
      } else {
        return str.toString().length;
      }
    }

    console.log(getLength(1234444))
// 类型推断

  }
)()
