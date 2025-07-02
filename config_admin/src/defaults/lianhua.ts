import { generatePrice } from '../utils'

const localOpts = [
  { label: '长安城', value: '长安城' },
  { label: '建邺城', value: '建邺城' },
  { label: '傲来国', value: '傲来国' },
]
const typeOpts = [
  { label: '炼化', value: '炼化' },
  { label: '收购', value: '收购' },
  { label: '灵石', value: '灵石' },
  { label: '宠装', value: '宠装' },
]
export default {
  基本设置: {
    体力阙值: {
      value: 1,
      type: 'number',
      desc: '体力高于(最高体力*此值)时开始处理体力',
      comp: 'inputNumber',
      props: {
        min: 0,
        max: 1,
        step: 0.01,
        precision: 2,
      },
    },
    脚本功能: {
      value: ['炼化', '收购'],
      type: 'array',
      desc: '脚本会根据设置开启以下功能，优先级根据点击先后顺序排序',
      comp: 'selectMultiple',
      width: '466px',
      props: {
        placeholder: '请选择脚本功能',
      },
      options: typeOpts,
    },
    通知邮箱: {
      value: '',
      type: 'string',
      desc: '炼化开始、炼化完成、摆摊完成、出现异常都会发邮件通知',
      comp: 'input',
      props: {
        placeholder: '888@qq.com',
      },
    },
    邮件标题: {
      value: '',
      type: 'string',
      desc: '邮件标题开头，方便区分是哪个脚本发送的邮件',
      comp: 'input',
      props: {
        placeholder: '建议设置一下',
      },
    },
  },
  炼化设置: {
    最少金币: {
      value: 90000,
      type: 'number',
      desc: '炼化一次需要的最少金币，低于此值不会炼化',
      comp: 'inputNumber',
      props: {
        min: 0,
        step: 1000,
      },
    },
    商店关键词: {
      value: ['童子'],
      type: 'array',
      comp: 'inputTag',
      props: {
        placeholder: '输完一个关键词后按回车',
      },
    },
    召唤兽关键词: {
      value: ['童子'],
      type: 'array',
      comp: 'inputTag',
      props: {
        placeholder: '输完一个关键词后按回车',
      },
    },
    召唤兽最大价格: {
      value: 9999,
      type: 'number',
      desc: '低于这个价格都可以买',
      comp: 'inputNumber',
      props: {
        min: 0,
        step: 1000,
      },
    },
    摆摊地点: {
      value: '建邺城',
      type: 'string',
      comp: 'select',
      options: localOpts,
    },
    摆摊坐标: {
      isCoord: true,
      x: {
        value: 47,
      },
      y: {
        value: 14,
      },
    },
    检查摊位时间: {
      value: 7200,
      type: 'number',
      desc: '相隔多久检查一次摊位(秒)',
      comp: 'inputNumber',
      props: {
        min: 0,
        step: 1800,
      },
    },
    取仓阙值: {
      value: 10,
      type: 'number',
      desc: '已上架数量低于此值时去仓库取仓',
      comp: 'inputNumber',
      props: {
        min: 0,
        max: 40,
      },
    },
    摆摊道具: {
      天眼: {
        '105级': {
          isLast: true,
          ...generatePrice([95, 100], '灵', { value: 0 }),
        },
        '115级': {
          isLast: true,
          ...generatePrice([95, 100], '灵', { value: 0 }),
        },
      },
      三眼: {
        '105级': {
          isLast: true,
          ...generatePrice([40, 100], '灵', { value: 0 }),
        },
        '115级': {
          isLast: true,
          ...generatePrice([40, 100], '灵', { value: 0 }),
        },
      },
      九眼: {
        '105级': {
          isLast: true,
          ...generatePrice([40, 100], '灵', { value: 0 }),
        },
        '115级': {
          isLast: true,
          ...generatePrice([40, 100], '灵', { value: 0 }),
        },
      },
    },
  },
  灵石设置: {},
  宠装设置: {},
  收购设置: {

  },
}
