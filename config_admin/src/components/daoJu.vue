<script lang="ts" setup>
import { ElMessage } from 'element-plus'
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
const addForm = ref({
  name: '',
  props: [] as any[],
  price: 0,
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
              single[item.value] = { value: price }
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
      data.value[name] = {}
      let single = data.value[name]
      if (props.length) {
        for (let i = 0; i < props.length; i++) {
          const item = props[i]
          if (i === props.length - 1) {
            single[item.value] = { value: price }
          }
          else {
            single[item.value] = {}
            single = single[item.value]
          }
        }
      }
      else {
        single.value = price
      }
    }
    if (is_success) {
      ElMessage.success('新增成功')
    }
  }
}
function handleDaoJuChange() {
  if (addForm.value.name) {
    const keys = getKeysAsArray(daoJuMap[addForm.value.name as any])
    addForm.value.props = keys.map((key) => {
      return { label: key, value: '' }
    })
  }
}
</script>

<template>
  <div class="dao_ju">
    <div>
      {{ label }}
      <el-button-group>
        <el-button style="padding-left: 12px;padding-right: 8px;" text type="primary" @click="addModal.visible = true">
          新增道具
        </el-button>
        <el-button style="padding-left: 12px;padding-right: 8px;" text type="primary" @click="adjustPrice([])">
          调价
        </el-button>
      </el-button-group>
    </div>
    <el-collapse expand-icon-position="left">
      <el-collapse-item v-for="list in data" :key="list.label" :title="list.label" :name="list.label">
        <template #title>
          <span>{{ list.label }}</span>
          <el-button-group>
            <el-button style="padding-left: 12px;padding-right: 8px;" text type="primary">
              调价
            </el-button>
          </el-button-group>
        </template>
        <template v-if="Array.isArray(list.data)">
          <el-collapse-item v-for="list2 in list.data" :key="list2.label" :title="list2.label" :name="list2.label">
            <template #title>
              <span>{{ list2.label }}</span>
              <el-button-group>
                <el-button style="padding-left: 12px;padding-right: 8px;" text type="primary">
                  调价
                </el-button>
              </el-button-group>
            </template>
            <el-form :model="list2.data" label-width="auto" label-position="right" :inline="true">
              <el-form-item
                v-for="item in Object.keys(list2.data).filter(key => key !== 'isLast')" :key="item"
                :label="item"
              >
                <el-input-number
                  v-model="list2.data[item].value"
                  :step="(list2.data[item].value / 10000) >= 1 ? 10000 : 1000" :min="0"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </template>
        <template v-else>
          <el-form :model="list.data" label-width="auto" label-position="right" :inline="true">
            <el-form-item
              v-for="item in Object.keys(list.data).filter(key => key !== 'isLast')" :key="item"
              :label="item"
            >
              <el-input-number
                v-model="list.data[item].value"
                :step="(list.data[item].value / 10000) >= 1 ? 10000 : 1000" :min="0"
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
            <el-input v-model="item.value" placeholder="请输入" />
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
