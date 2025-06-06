import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Config {
  基本: Base
  摆摊: BaiTan
  收购: ShouGou
}

export interface Base {

}

export interface BaiTan {

}

export interface ShouGou {

}
