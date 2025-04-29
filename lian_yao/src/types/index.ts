export interface IGoods {
  title: string
  price: number
  express: string
  remain: number
  thumb: string[]
}

export interface CardGoods {
  id: string
  title: string
  price: number
  desc: string
  num: number
  thumb: string
}

export interface Config {
  base: {},
  goods: Good[]
}

export interface Good {
  name: string
  data: Level[]
  [name: string]: any
}

export interface Level {
  name: string
  data: Attr[]
  [name: string]: any
}

export interface Attr {
  name: string
  min: number
  max: number
  price: number
  [name: string]: any
}