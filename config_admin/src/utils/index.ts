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
  const result: string[] = []
  let current = obj

  while (Object.keys(current).length > 0) {
    const key = Object.keys(current)[0]
    result.push(key)
    current = current[key]
  }

  return result
}
export function deepObjToArray(obj: any) {
  return Object.entries(obj).map(([label, value]) => {
    const keys = Object.keys(value as any)

    // 如果子对象有value属性，直接返回data为对象
    if (keys.length === 1 && keys[0] === 'value') {
      return { label, data: value }
    }

    // 否则递归处理子对象
    const data = keys.length > 1
      ? deepObjToArray(value)
      : { [keys[0]]: value[keys[0]] }

    return { label, data }
  })
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
