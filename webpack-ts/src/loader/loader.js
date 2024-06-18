
const {getOptions} = require('loader-utils');
const {validate} = require('schema-utils'); // 校验参数格式是否正确
// loader是一个函数
// loader分为同步执行和异步执行

const schema = require("./schema.json")
module.exports = function (content, map, meta) {
  // console.log(content);
  // this.callback(null, content) // 属于同步执行 也可以直接return

  // const callback = this.async(); // 异步执行

  // callback(null, content); // 异步执行，只有调用callback后才会执行下一个loader

  const options = getOptions(this) // 获取配置参数



  // console.log('loader Test', options)

  validate(schema, options, {
    name: "loader"
  });

  return content;

}



// 在执行loader之前执行
module.exports.pitch = function () {
  console.log("this.pitch");
}