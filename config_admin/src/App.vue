<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { computed, ref } from 'vue'
import default_data from './assets/data.json'

const data = localStorage.getItem('SW_Config') || {}
const mergeData: any = {
  ...default_data,
  ...data,
}
const nameData = ref({
  active: mergeData['脚本名'],
  list: [] as string[],
})
Object.keys(mergeData['脚本映射']).forEach((key) => {
  nameData.value.list.push(key)
})
const activeConfig = computed(() => {
  return mergeData['脚本映射'][nameData.value.active]
})
console.log(nameData.value, activeConfig.value)
const addModal = ref({
  visible: false,
  formLabelWidth: '88px',
  form: {
    name: '',
    copy: '',
  },
  formRules: {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    copy: [{ required: true, message: '必须选择复制模板', trigger: 'change' }],
  },
})
const opParams = {
  type: '',
  name: '',
}
const AddFormRef = ref<FormInstance>()
function handleHeadClick(type: 'add' | 'edit' | 'delete' | 'save' | 'copy', name: string) {
  opParams.type = type
  opParams.name = name
  addModal.value.form.copy = name
  switch (type) {
    case 'add':
      addModal.value.visible = true
      break
  }
}
function handleModalSure() {
  AddFormRef.value?.validate((valid) => {
    if (valid) {
      switch (opParams.type) {
        case 'add':
          addModal.value.visible = false
          break
      }
    }
  })
}
</script>

<template>
  <el-config-provider namespace="ep">
    <BaseHeader :name-data="nameData" @on-click="handleHeadClick" />
    <div class="main-container flex">
      <BaseSide />
      <div w="full" py="4">
        <RouterView :config="activeConfig" />
      </div>
    </div>
    <el-dialog v-model="addModal.visible" title="新增脚本配置" width="400">
      <el-form ref="AddFormRef" :model="addModal.form" :rules="addModal.formRules">
        <el-form-item label="脚本名称" :label-width="addModal.formLabelWidth" prop="name">
          <el-input v-model="addModal.form.name" placeholder="请输入脚本名称" autocomplete="off" />
        </el-form-item>
        <el-form-item label="复制模板" :label-width="addModal.formLabelWidth" prop="copy">
          <el-select v-model="addModal.form.copy" placeholder="选择已有脚本配置复制">
            <el-option v-for="item in nameData.list" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addModal.visible = false">
            取消
          </el-button>
          <el-button type="primary" @click="handleModalSure">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
</style>
