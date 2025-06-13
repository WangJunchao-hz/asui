<script setup lang="ts">
import { computed } from 'vue'
import Config from '../components/config.vue'

const props = defineProps<{ config: any }>()
const cfgTabs = computed(() => {
  return Object.keys(props.config).map(key => key)
})
</script>

<template>
  <el-tabs tab-position="left" style="height: 100%">
    <el-tab-pane v-for="item in cfgTabs" :key="item" :label="item" style="height: 100%;">
      <Config :config="props.config[item]" />
    </el-tab-pane>
  </el-tabs>
</template>
