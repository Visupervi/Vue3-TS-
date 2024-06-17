
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils'); // 校验参数格式是否正确
const BabelSchema = require("./BabelSchema.json");
const babel = require("@babel/core");
const util = require("util")

const transfrom = util.promisify(babel.transform)
module.exports = function (content, map, meta) {
  const options = getOptions(this) || {};

  validate(BabelSchema, options, {
    name: "myBabelLoader"
  });
  // 创建异步
  const callback = this.async()

  // 使用babel去编译
  transfrom(content, options)
    .then(({ code, map }) => callback(null, code, map, meta))
    .catch(e => callback(e))
}