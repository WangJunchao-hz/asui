<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import default_data from './defaults'
import { deepMergeConfig } from './utils'

const { toClipboard } = useClipboard()

const cache_active = localStorage.getItem('SW_Active')
const active = cache_active
  ? ref(JSON.parse(cache_active))
  : ref({
      type: '',
      cfg: '',
    })
const cache_data = localStorage.getItem('SW_Config')
const old_data = cache_data ? JSON.parse(cache_data) : null
const mergeData: any = ref(deepMergeConfig(default_data, old_data))
const types = ref<string[]>([])

types.value = Object.keys(mergeData.value)

if (!active.value.type) {
  active.value.type = types.value[0]
}

const activeConfig = computed(() => mergeData.value[active.value.type])

const cfgLists = computed(() => {
  return Object.keys(activeConfig.value)
})

if (!active.value.cfg) {
  active.value.cfg = cfgLists.value[0]
}

const config = computed(() => activeConfig.value[active.value.cfg])

const addModal = ref({
  visible: false,
  formLabelWidth: '88px',
  opType: '',
  form: {
    name: '',
    copy: '',
  },
  formRules: {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    copy: [{ required: true, message: '必须选择复制模板', trigger: 'change' }],
  },
})
const AddFormRef = ref<FormInstance>()
function handleHeadClick(type: 'add' | 'delete' | 'save' | 'copy' | 'clear', data: { type: string, cfg: string }) {
  switch (type) {
    case 'add':
      addModal.value.visible = true
      addModal.value.opType = type
      addModal.value.form.name = ''
      addModal.value.form.copy = data.cfg
      break
    case 'save':
      saveData()
      ElMessage.success('保存成功')
      break
    case 'copy':
      toClipboard(JSON.stringify(config.value)).then(() => {
        ElMessage.success('复制成功')
        saveData()
      }).catch(() => {
        ElMessage.error('复制失败')
      })
      break
    case 'delete':
      ElMessageBox.confirm(
        '确认删除该配置?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          delete mergeData.value[data.type][data.cfg]
          active.value.cfg = '默认'
          saveData()
          ElMessage.success('删除成功')
        })
      break
    case 'clear':
      ElMessageBox.confirm(
        '重置会删除所有缓存，是否继续?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          localStorage.removeItem('SW_Active')
          localStorage.removeItem('SW_Config')
          ElMessage.success('重置成功')
          location.reload()
        })
      break
  }
}

function saveData() {
  localStorage.setItem('SW_Config', JSON.stringify(mergeData.value))
  localStorage.setItem('SW_Active', JSON.stringify(active.value))
}
function handleModalSure() {
  AddFormRef.value?.validate((valid) => {
    if (valid) {
      switch (addModal.value.opType) {
        case 'add':
          {
            addModal.value.visible = false
            const copy = mergeData.value[active.value.type][addModal.value.form.copy]
            mergeData.value[active.value.type][addModal.value.form.name] = JSON.parse(JSON.stringify(copy))
            active.value.cfg = addModal.value.form.name
            saveData()
            ElMessage.success('新增成功')
          }
          break
      }
    }
  })
}
</script>

<template>
  <el-config-provider namespace="ep">
    <BaseHeader :active="active" :types="types" :lists="cfgLists" @on-click="handleHeadClick" />
    <div class="main-container flex">
      <div w="full">
        <RouterView :config="config" />
      </div>
    </div>
    <el-dialog v-model="addModal.visible" title="新增脚本配置" width="400">
      <el-form ref="AddFormRef" :model="addModal.form" :rules="addModal.formRules">
        <el-form-item label="脚本类型" :label-width="addModal.formLabelWidth">
          <el-input v-model="active.type" disabled placeholder="请输入脚本类型" autocomplete="off" />
        </el-form-item>
        <el-form-item label="脚本名称" :label-width="addModal.formLabelWidth" prop="name">
          <el-input v-model="addModal.form.name" placeholder="请输入脚本名称" autocomplete="off" />
        </el-form-item>
        <el-form-item label="复制模板" :label-width="addModal.formLabelWidth" prop="copy">
          <el-select v-model="addModal.form.copy" placeholder="选择已有脚本配置复制">
            <el-option v-for="item in cfgLists" :key="item" :label="item" :value="item" />
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
