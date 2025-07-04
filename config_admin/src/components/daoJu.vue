<script lang="ts" setup>
import {
  Delete,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, inject, ref, toRefs } from 'vue'
import { deepAdjustPrice, deepObjToArray, getKeysAsArray } from '../utils'

const props = defineProps<{ data: any, label: string }>()
const daoJuMap = inject('DaoJuMap') as any[]
const daoJuList = computed(() => {
  return Object.keys(daoJuMap)
})
const { data, label } = toRefs(props)
const addModal = ref({
  visible: false,
})
const lists = computed(() => {
  return deepObjToArray(data.value)
})
const addForm = ref({
  name: '',
  props: [] as any[],
  price: 0,
  group: '',
})
function adjustPrice(keys: string[]) {
  console.log(keys)
}
function addDaoJu() {
  const { name, props, price } = addForm.value
  if (!name) {
    ElMessage.error('请选择道具')
    return false
  }
  if (props.length) {
    let has_blank = ''
    for (let i = 0; i < props.length; i++) {
      const item = props[i]
      if (!item.value) {
        has_blank = item.label
        break
      }
    }
    if (has_blank) {
      ElMessage.error(`请填写${has_blank}属性`)
      return false
    }
  }

  let is_success = true
  if (name in data.value) {
    let path = name
    if (props.length) {
      let single = data.value[name]
      for (let i = 0; i < props.length; i++) {
        const item = props[i]
        if (i === props.length - 1) {
          if (item.value in single) {
            path = `${path}_${item.value}`
            ElMessage.error(`${path}已存在,请勿重复添加`)
            is_success = false
          }
          else {
            single[item.value] = {
              value: price,
              _open: true,
            }
          }
        }
        else {
          if (item.value in single) {
            path = `${path}_${item.value}`
          }
          else {
            single[item.value] = {}
          }
          single = single[item.value]
        }
      }
    }
    else {
      ElMessage.error(`${path}已存在,请勿重复添加`)
      is_success = false
    }
  }
  else {
    data.value[name] = { _group: addForm.value.group }
    let single = data.value[name]
    if (props.length) {
      for (let i = 0; i < props.length; i++) {
        const item = props[i]
        if (i === props.length - 1) {
          single[item.value] = {
            value: price,
            _open: true,
          }
        }
        else {
          single[item.value] = {}
          single = single[item.value]
        }
      }
    }
    else {
      single.value = price
      single._open = true
    }
  }
  if (is_success) {
    ElMessage.success('新增成功')
    addModal.value.visible = false
  }
}
function handleDaoJuChange() {
  if (addForm.value.name) {
    addForm.value.group = daoJuMap[addForm.value.name as any]._group
    const infos: any = getKeysAsArray(daoJuMap[addForm.value.name as any])
    addForm.value.props = infos.map((info: any) => {
      const val = info.comp === 'inputNumber' ? 0 : ''
      return { label: info.key, value: val, ...info }
    })
  }
}
function handleBtnClick(type: '新增' | '启用' | '禁用' | '调价', params?: any) {
  console.log(type, params)
  switch (type) {
    case '新增':
      addModal.value.visible = true
      break
  }
}
function deleteDaoJu(keys: string[]) {
  ElMessageBox.confirm(
    '确认删除道具?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      let delObj = data.value
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== '杂货' && i !== keys.length - 1) {
          delObj = delObj[keys[i]]
        }
      }
      if (delObj) {
        delete delObj[keys[keys.length - 1]]
      }
      console.log(data.value)
      ElMessage.success('删除成功')
    })
}
</script>

<template>
  <div class="dao_ju">
    <div>
      {{ label }}
      <el-button-group size="small">
        <el-button style="padding-left: 8px;padding-right: 8px;" plain @click="handleBtnClick('新增')">
          新增道具
        </el-button>
        <el-button style="padding-left: 8px;padding-right: 8px;" plain @click="handleBtnClick('调价')">
          调价
        </el-button>
      </el-button-group>
    </div>
    <el-collapse expand-icon-position="left">
      <el-collapse-item v-for="list in lists" :key="list.label" :title="list.label" :name="list.label">
        <template #title>
          <span style="margin-right: 6px;">{{ list.label }}</span>
          <el-button-group size="small">
            <el-button
              style="padding-left: 8px;padding-right: 8px;" plain
              @click.stop="handleBtnClick('启用', [list.label])"
            >
              启用
            </el-button>
            <el-button
              style="padding-left: 8px;padding-right: 8px;" plain
              @click.stop="handleBtnClick('禁用', [list.label])"
            >
              禁用
            </el-button>
            <el-button
              style="padding-left: 8px;padding-right: 8px;" plain
              @click.stop="handleBtnClick('调价', [list.label])"
            >
              调价
            </el-button>
          </el-button-group>
        </template>
        <template v-if="Array.isArray(list.data)">
          <el-collapse-item v-for="list2 in list.data" :key="list2.label" :title="list2.label" :name="list2.label">
            <template #title>
              <span style="margin-right: 6px;">{{ list2.label }}</span>
              <el-button-group size="small">
                <el-button
                  style="padding-left: 8px;padding-right: 8px;" plain
                  @click.stop="handleBtnClick('启用', [list.label, list2.label])"
                >
                  启用
                </el-button>
                <el-button
                  style="padding-left: 8px;padding-right: 8px;" plain
                  @click.stop="handleBtnClick('禁用', [list.label, list2.label])"
                >
                  禁用
                </el-button>
                <el-button
                  style="padding-left: 8px;padding-right: 8px;" plain
                  @click.stop="handleBtnClick('调价', [list.label, list2.label])"
                >
                  调价
                </el-button>
              </el-button-group>
            </template>
            <el-form :model="list2.data" label-width="auto" label-position="right" :inline="true">
              <el-form-item
                v-for="item in Object.keys(list2.data).filter(key => !key.includes('_'))" :key="item"
                :label="item"
              >
                <el-input-number
                  v-model="list2.data[item].value" :disabled="!list2.data[item]._open"
                  :step="(list2.data[item].value / 10000) >= 1 ? 10000 : 1000" :min="0"
                />
                <el-button
                  style="margin-left: 6px;" type="danger" plain circle title="删除" :icon="Delete"
                  @click.stop="deleteDaoJu([list.label, list2.label, item])"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </template>
        <template v-else>
          <el-form :model="list.data" label-width="auto" label-position="right" :inline="true">
            <el-form-item
              v-for="item in Object.keys(list.data).filter(key => !key.includes('_'))" :key="item"
              :label="item"
            >
              <el-input-number
                v-model="list.data[item].value" :disabled="!list.data[item]._open"
                :step="(list.data[item].value / 10000) >= 1 ? 10000 : 1000" :min="0"
              />
              <el-button
                style="margin-left: 6px;" type="danger" plain circle title="删除" :icon="Delete"
                @click.stop="deleteDaoJu([list.label, item])"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-dialog v-model="addModal.visible" title="新增道具" width="300">
      <el-form :model="addForm" label-width="auto" label-position="right">
        <el-form-item label="道具">
          <el-select v-model="addForm.name" filterable placeholder="请选择" @change="handleDaoJuChange">
            <el-option v-for="item in daoJuList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <template v-if="addForm.name">
          <el-form-item v-for="item in addForm.props" :key="item.label" :label="item.label">
            <el-input v-if="item.comp === 'input'" v-model="item.value" placeholder="请输入" />
            <el-select v-if="item.comp === 'select'" v-model="item.value" placeholder="请选择">
              <el-option v-for="op in item.opts" :key="op" :label="op" :value="op" />
            </el-select>
            <el-input-number
              v-if="item.comp === 'inputNumber'" v-model="item.value" :step="1" :min="item.min"
              :max="item.max"
            />
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number v-model="addForm.price" :step="(addForm.price / 10000) >= 1 ? 10000 : 1000" :min="0" />
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addModal.visible = false">
            取消
          </el-button>
          <el-button type="primary" @click="addDaoJu">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
