export interface Person {
  id: string
  name: string
  age: number
  gender?: number
}

// 一个自定义类型

export type Persons = Array<Person>
