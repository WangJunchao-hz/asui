<script lang="ts" setup>
import {
  EditPen,
} from '@element-plus/icons-vue'
</script>

<template>
  <el-menu router default-active="/config/global" class="el-menu-vertical-demo">
    <el-menu-item index="/config/global">
      <el-icon>
        <EditPen />
      </el-icon>
      <template #title>
        全局
      </template>
    </el-menu-item>
    <el-menu-item index="/config/baitan">
      <el-icon>
        <EditPen />
      </el-icon>
      <template #title>
        摆摊
      </template>
    </el-menu-item>
    <el-menu-item index="/config/shougou">
      <el-icon>
        <EditPen />
      </el-icon>
      <template #title>
        收购
      </template>
    </el-menu-item>
  </el-menu>
</template>
