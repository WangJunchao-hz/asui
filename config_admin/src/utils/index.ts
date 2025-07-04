/**
 * 深度合并两个JSON配置对象
 * @param {object} newJson 新配置文件
 * @param {object} oldJson 旧配置文件
 * @returns {object} 合并后的配置
 */
export function deepMergeConfig(newJson: any, oldJson: any) {
  for (const key in oldJson) {
    if (Object.hasOwn(newJson, key)) {
      const def = newJson[key]['默认']
      for (const key2 in oldJson[key]) {
        newJson[key][key2] = deepMerge(def, oldJson[key][key2])
      }
    }
  }
  return newJson
}

export function deepMerge(
  json1: any,
  json2: any,
) {
  for (const key in json1) {
    if (!Object.hasOwn(json2, key)) {
      json2[key] = json1[key]
    }
    else {
      const value1 = json1[key]
      const value2 = json2[key]
      const type1 = Object.prototype.toString.call(value1)
      const type2 = Object.prototype.toString.call(value2)
      if (type1 !== type2) {
        json2[key] = value1
      }
      else {
        if (type1 === '[object Object]') {
          json2[key] = deepMerge(value1, value2)
        }
        else {
          if (key === 'value') {
            json2[key] = value2
          }
          else {
            json2[key] = value1
          }
        }
      }
    }
  }
  return json2
}
export function getKeysAsArray(obj: any): string[] {
  const result: any[] = []
  let current = obj

  while (Object.keys(current).length > 0) {
    const keys = Object.keys(current).filter(key => !key.includes('_'))
    if (keys.length) {
      current = current[keys[0]]
      let comp = 'input'
      if (current._opts) {
        comp = 'select'
      }
      if (current._min || current._max) {
        comp = 'inputNumber'
      }
      result.push({ key: keys[0], comp, opts: current._opts, min: current._min, max: current._max })
    }
    else {
      break
    }
  }

  return result
}
export function deepObjToArray(obj: any): any {
  const keys = Object.keys(obj)
  const group: any = {}
  const res = keys.filter((key) => {
    let isVal = false
    const g = obj[key]._group || '杂货'
    if (!key.includes('_') && 'value' in obj[key]) {
      group[g] = group[g] || {}
      group[g][key] = obj[key]
      isVal = true
    }
    return !key.includes('_') && !isVal
  }).map((key) => {
    const subKeys = Object.keys(obj[key]).filter((sub_key) => {
      return !sub_key.includes('_')
    })
    let isLast = false
    for (let i = 0; i < subKeys.length; i++) {
      if ('value' in obj[key][subKeys[i]]) {
        isLast = true
        break
      }
    }
    if (isLast) {
      return { label: key, data: obj[key] }
    }

    return {
      label: key,
      data: deepObjToArray(obj[key]),
    }
  })
  if (Object.keys(group).length) {
    const fz = Object.keys(group).map((key) => {
      return {
        label: key,
        data: group[key],
      }
    })
    res.unshift(...fz)
  }
  return res
}

export function generatePrice(range: [number, number], suffix: string, val: any) {
  const res: any = {}
  for (let i = range[0]; i <= range[1]; i++) {
    res[i + suffix] = JSON.parse(JSON.stringify(val))
  }
  return res
}

export function deepAdjustPrice(obj: any, val: any) {
  const { qw, bw5, bw1, sw5, sw1, w5, w1, isPer, per } = val
  const keys = Object.keys(obj)
  if (keys.includes('isLast')) {
    for (const key of keys) {
      if (key !== 'isLast') {
        const price = obj[key].value
        if (price > 0) {
          if (isPer) {
            obj[key].value = Math.round(obj[key].value * per)
          }
          else {
            if (price > 10000000) {
              obj[key].value = obj[key].value + qw
            }
            else if (price > 5000000) {
              obj[key].value = obj[key].value + bw5
            }
            else if (price > 1000000) {
              obj[key].value = obj[key].value + bw1
            }
            else if (price > 500000) {
              obj[key].value = obj[key].value + sw5
            }
            else if (price > 100000) {
              obj[key].value = obj[key].value + sw1
            }
            else if (price > 50000) {
              obj[key].value = obj[key].value + w5
            }
            else {
              obj[key].value = obj[key].value + w1
            }
          }
        }
      }
    }
  }
  else {
    for (const key of keys) {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        deepAdjustPrice(obj[key], val)
      }
    }
  }
}
