<script lang="ts" setup>
import {
  CopyDocument,
  Delete,
  Edit,
  Finished,
  Plus,
} from '@element-plus/icons-vue'
import { toRefs } from 'vue'
import { toggleDark } from '~/composables'

const props = defineProps<{ nameData: { active: string, list: string[] } }>()
const emit = defineEmits(['onClick'])
const { nameData } = toRefs(props)

function handleClick(type: 'add' | 'edit' | 'delete' | 'save' | 'copy') {
  emit('onClick', type, nameData.value.active)
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
    <el-menu-item>
      <el-select v-model="nameData.active" filterable clearable placeholder="选择配置" style="width: 240px">
        <el-option v-for="item in nameData.list" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button-group class="ml-4">
        <el-button
          style="padding-left: 12px;padding-right: 8px;" title="新增" :icon="Plus"
          @click.stop="handleClick('add')"
        />
        <el-button
          style="padding-left: 12px;padding-right: 8px;" title="编辑" :icon="Edit"
          @click.stop="handleClick('edit')"
        />
        <el-button
          style="padding-left: 12px;padding-right: 8px;" title="删除" :icon="Delete"
          @click.stop="handleClick('delete')"
        />
        <el-button
          style="padding-left: 12px;padding-right: 8px;" title="保存" :icon="Finished"
          @click.stop="handleClick('save')"
        />
        <el-button
          style="padding-left: 12px;padding-right: 8px;" title="复制" :icon="CopyDocument"
          @click.stop="handleClick('copy')"
        />
      </el-button-group>
    </el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button class="w-full cursor-pointer border-none bg-transparent" style="height: var(--ep-menu-item-height)">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
.el-menu-demo {
  &.ep-menu--horizontal > .ep-menu-item:nth-child(2) {
    margin-right: auto;
  }
}
</style>
