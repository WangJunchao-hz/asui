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
  base: {
    tl: number
    max_bb_price: number
    check_tw_time: number
    shop_name_keys: string[]
    bb_keys: string[]
    min_money: number
    tw_local: string,
    tw_pos_x: number,
    tw_pos_y: number,
    shop_key_str?: string,
    bb_key_str?: string,
    tw_num: number,
  },
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