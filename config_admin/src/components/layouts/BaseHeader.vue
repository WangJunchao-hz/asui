<script lang="ts" setup>
import {
  CopyDocument,
  Delete,
  Finished,
  Plus,
  Refresh,
} from '@element-plus/icons-vue'
import { toRefs } from 'vue'
import { toggleDark } from '~/composables'

const props = defineProps<{ active: { type: string, cfg: string }, types: string[], lists: string[] }>()
const emit = defineEmits(['onClick', 'onChange'])
const { active, types, lists } = toRefs(props)

function handleClick(type: 'add' | 'delete' | 'save' | 'copy' | 'clear') {
  emit('onClick', type, active.value)
}
function handleChange(type: 0 | 1) {
  if (type === 0) {
    active.value.cfg = '默认'
  }
  localStorage.setItem('SW_Active', JSON.stringify(active.value))
  emit('onChange', active.value)
}
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
    <el-menu-item index="/">
      <div class="flex items-center justify-center gap-2">
        <div class="text-xl" i-ep-element-plus />
        <span>脚本配置管理系统</span>
      </div>
    </el-menu-item>
    <el-menu-item index="">
      <el-select
        v-model="active.type" filterable placeholder="选择脚本类型" style="width: 120px" @change="handleChange(0)"
        @click.stop
      >
        <el-option v-for="item in types" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select
        v-model="active.cfg" filterable placeholder="选择配置" style="width: 200px" @change="handleChange(1)"
        @click.stop
      >
        <el-option v-for="item in lists" :key="item" :label="item" :value="item" />
      </el-select>
    </el-menu-item>
    <el-menu-item index="">
      <el-button-group>
        <el-button
          type="info" plain style="padding-left: 12px;padding-right: 8px;" title="新增" :icon="Plus"
          @click.stop="handleClick('add')"
        />
        <el-button
          type="danger" plain style="padding-left: 12px;padding-right: 8px;" :disabled="active.cfg === '默认'"
          title="删除" :icon="Delete" @click.stop="handleClick('delete')"
        />
        <el-button
          type="primary" plain style="padding-left: 12px;padding-right: 8px;" title="保存" :icon="Finished"
          @click.stop="handleClick('save')"
        />
        <el-button
          type="success" plain style="padding-left: 12px;padding-right: 8px;" title="复制" :icon="CopyDocument"
          @click.stop="handleClick('copy')"
        />
        <el-button
          type="warning" plain style="padding-left: 12px;padding-right: 8px;" title="重置" :icon="Refresh"
          @click.stop="handleClick('clear')"
        />
      </el-button-group>
    </el-menu-item>
    <el-menu-item index="">
      <el-button-group>
        <el-button style="padding-left: 8px;padding-right: 8px;" @click.stop="toggleDark()">
          <i i="dark:ep-moon ep-sunny" />
        </el-button>
      </el-button-group>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
.el-menu-demo {
  &.ep-menu--horizontal > .ep-menu-item:nth-child(3) {
    margin-right: auto;
  }
}
</style>
