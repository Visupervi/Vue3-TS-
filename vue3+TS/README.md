# vue3-study

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### setup细节
- setup执行的时机

在beforeCreate之前执行(一次), 此时组件对象还没有创建
this是undefined, 不能通过this来访问data/computed/methods / props
其实所有的composition API相关回调函数中也都不可以

- setup的返回值

一般都返回一个对象: 为模板提供数据, 也就是模板中可以直接使用此对象中的所有属性/方法
返回对象中的属性会与data函数返回对象的属性合并成为组件对象的属性
返回对象中的方法会与methods中的方法合并成功组件对象的方法
如果有重名, setup优先
注意:
一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据
- setup的参数

setup(props, context) / setup(props, {attrs, slots, emit})
props: 包含props配置声明且传入了的所有属性的对象
attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
emit: 用来分发自定义事件的函数, 相当于 this.$emit
