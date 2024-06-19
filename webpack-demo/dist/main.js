(function(grahp){
    // 为了加载入口文件
      function require(module){
        function localRequire(relativePath){
          // 找到当前某块的路径，通过require加载
          return require(graph[module].deps[relativePath])
        }

        // 定义个暴露对象
        var exports = {};
        (function(require, exports, code){
          eval(code);
        })(localRequire, exports, grahp[module].code);
        return exports;
      }
      require('./src/index.js')
    })({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\nvar _count = _interopRequireDefault(require(\"./count.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { \"default\": e }; }\nconsole.log((0, _add[\"default\"])(1, 2));\nconsole.log((0, _count[\"default\"])(5, 1));","deps":{"./add.js":"/Volumes/work/学习资料/Vue3-TS-/webpack-demo/src/add.js","./count.js":"/Volumes/work/学习资料/Vue3-TS-/webpack-demo/src/count.js"}},"/Volumes/work/学习资料/Vue3-TS-/webpack-demo/src/add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = add;\nfunction add(x, y) {\n  return x + y;\n}","deps":{}},"/Volumes/work/学习资料/Vue3-TS-/webpack-demo/src/count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = count;\nfunction count(x, y) {\n  return x - y;\n}","deps":{}}})