const localOpts = [
  { label: '长安城', value: '长安城' },
  { label: '建邺城', value: '建邺城' },
  { label: '傲来国', value: '傲来国' },
]
const typeOpts = [
  { label: '收货', value: '收货' },
  { label: '收购', value: '收购' },
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
        value: 15,
        min: 10,
      },
      end: {
        value: 20,
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
        value: 360,
        min: 300,
      },
    },
    取消交易: {
      value: 180,
      type: 'number',
      desc: '如果对方长时间没有响应主动取消交易，默认3分钟',
      comp: 'inputNumber',
      props: {
        min: 0,
        step: 60,
      },
    },
    喊话模板: {
      value: '#W收垃圾宠装 85-95=${嵌宝金环} 105=${玳瑁环} 115=${七星宝环} 125-135=${鸾尾环} 145=${织锦颈圈} #Y天眼珠 65-95=${天眼珠_95} 105-125=${天眼珠_125} 分解符=${分解符} #W灵石 速=${精魄灵石_速度} 伤=${精魄灵石_伤害} 血=${精魄灵石_气血} 灵=${精魄灵石_灵力} 防=${精魄灵石_防御}',
      type: 'textarea',
      desc: '${xx}xx必须跟下面道具名一致，否则无法解析',
      comp: 'input',
      width: '666px',
      props: {
        rows: 4,
      },
    },
    喊话内容: {
      value: '',
      type: 'textarea',
      comp: 'input',
      width: '666px',
      props: {
        rows: 4,
      },
    },
    收货道具: {
      月华露: {
        _group: '杂货',
        value: 70000,
        _open: true,
      },
      黑宝石: {
        _group: '宝石',
        value: 150000,
        _open: true,
      },
      星辉石: {
        _group: '宝石',
        value: 150000,
        _open: true,
      },
      红玛瑙: {
        _group: '宝石',
        value: 65000,
        _open: true,
      },
      // 分解符: {
      //   _group: '杂货',
      //   value: 1300,
      //   _open: true,
      // },
      // 笼玉环: {
      //   _group: '宠装',
      //   value: 10000,
      //   _open: true,
      // },
      // 笼玉镯: {
      //   _group: '宠装',
      //   value: 10000,
      //   _open: true,
      // },
      // 笼玉甲: {
      //   _group: '宠装',
      //   value: 10000,
      //   _open: true,
      // },
      // 嵌宝金环: {
      //   _group: '宠装',
      //   value: 10000,
      //   _open: true,
      // },
      // 嵌宝金腕: {
      //   _group: '宠装',
      //   value: 10000,
      //   _open: true,
      // },
      // 嵌宝金甲: {
      //   _group: '宠装',
      //   value: 10000,
      //   _open: true,
      // },
      // 玳瑁环: {
      //   _group: '宠装',
      //   value: 50000,
      //   _open: true,
      // },
      // 玳瑁护腕: {
      //   _group: '宠装',
      //   value: 50000,
      //   _open: true,
      // },
      // 玳瑁衣: {
      //   _group: '宠装',
      //   value: 50000,
      //   _open: true,
      // },
      // 七星宝环: {
      //   _group: '宠装',
      //   value: 70000,
      //   _open: true,
      // },
      // 七星宝腕: {
      //   _group: '宠装',
      //   value: 70000,
      //   _open: true,
      // },
      // 七星宝甲: {
      //   _group: '宠装',
      //   value: 70000,
      //   _open: true,
      // },
      // 缚龙圈: {
      //   _group: '宠装',
      //   value: 90000,
      //   _open: true,
      // },
      // 缚龙筋: {
      //   _group: '宠装',
      //   value: 90000,
      //   _open: true,
      // },
      // 缚龙甲: {
      //   _group: '宠装',
      //   value: 90000,
      //   _open: true,
      // },
      // 鸾尾环: {
      //   _group: '宠装',
      //   value: 90000,
      //   _open: true,
      // },
      // 凤翎护腕: {
      //   _group: '宠装',
      //   value: 90000,
      //   _open: true,
      // },
      // 凤凰彩衣: {
      //   _group: '宠装',
      //   value: 90000,
      //   _open: true,
      // },
      // 织锦颈圈: {
      //   _group: '宠装',
      //   value: 100000,
      //   _open: true,
      // },
      // 织锦彩带: {
      //   _group: '宠装',
      //   value: 100000,
      //   _open: true,
      // },
      // 织锦软褡: {
      //   _group: '宠装',
      //   value: 100000,
      //   _open: true,
      // },
      // 精魄灵石: {
      //   速度: {
      //     value: 80000,
      //     _open: true,
      //   },
      //   伤害: {
      //     value: 70000,
      //     _open: true,
      //   },
      //   气血: {
      //     value: 60000,
      //     _open: true,
      //   },
      //   灵力: {
      //     value: 50000,
      //     _open: true,
      //   },
      //   防御: {
      //     value: 10000,
      //     _open: true,
      //   },
      // },
      // 天眼珠: {
      //   65: {
      //     value: 30000,
      //     _open: true,
      //   },
      //   75: {
      //     value: 30000,
      //     _open: true,
      //   },
      //   85: {
      //     value: 30000,
      //     _open: true,
      //   },
      //   95: {
      //     value: 30000,
      //     _open: true,
      //   },
      //   105: {
      //     value: 50000,
      //     _open: true,
      //   },
      //   115: {
      //     value: 50000,
      //     _open: true,
      //   },
      //   125: {
      //     value: 50000,
      //     _open: true,
      //   },
      // },
    },
  },
  收购设置: {
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
      value: '傲来国',
      type: 'string',
      comp: 'select',
      options: localOpts,
    },
    收货坐标: {
      isCoord: true,
      x: {
        value: 160,
      },
      y: {
        value: 102,
      },
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
