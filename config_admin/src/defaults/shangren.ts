const localOpts = [
  { label: '长安城', value: '长安城' },
  { label: '建邺城', value: '建邺城' },
  { label: '傲来国', value: '傲来国' },
]
const typeOpts = [
  { label: '收货', value: '收货' },
  { label: '摆摊', value: '摆摊' },
]
const noticeTypeOpts = [
  { label: '金币不足', value: '金币不足' },
  { label: '仓库满了', value: '仓库满了' },
  { label: '重大异常', value: '重大异常' },
]
export default {
  基本设置: {
    脚本功能: {
      value: ['收货', '摆摊'],
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
      desc: '在一些关键操作完成后会发邮件通知',
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
    通知类型: {
      value: ['金币不足', '仓库满了', '重大异常'],
      type: 'array',
      desc: '脚本支持的通知类型',
      comp: 'selectMultiple',
      width: '466px',
      props: {
        placeholder: '请选择通知类型',
      },
      options: noticeTypeOpts,
    },
  },
  收货设置: {
    最少金币: {
      value: 100000,
      type: 'number',
      desc: '现金如果低于此值，不能进行收货',
      comp: 'inputNumber',
      props: {
        min: 1000,
        step: 1000,
      },
    },
    收货地点: {
      value: '建邺城',
      type: 'string',
      comp: 'select',
      options: localOpts,
    },
    收货坐标: {
      isCoord: true,
      x: {
        value: 47,
      },
      y: {
        value: 14,
      },
    },
    当前间隔: {
      isRange: true,
      desc: '当前喊话时间间隔,区间随机间隔喊话模拟人的行为,最少10s',
      start: {
        value: 10,
        min: 10,
      },
      end: {
        value: 15,
        min: 10,
      },
    },
    世界间隔: {
      isRange: true,
      desc: '世界喊话时间间隔,区间随机间隔喊话模拟人的行为,最少5分钟',
      start: {
        value: 300,
        min: 300,
      },
      end: {
        value: 420,
        min: 300,
      },
    },
    喊话内容: {
      value: '',
      type: 'string',
      comp: 'input',
      props: {},
    },
  },
  摆摊设置: {
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
  },
}
