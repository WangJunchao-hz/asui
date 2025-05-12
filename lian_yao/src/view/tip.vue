<template>
  <div class="tip">
    <div class="item" style="margin-right: 6px">{{ log.total }}</div>
    <div class="item">{{ log.msg }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const log = ref({
  msg: '',
  total: '',
});
onMounted(() => {
  window.airscript.call('tip_mounted', 'onLogs');
});
window.onLogs = (data: string) => {
  const msg = data.split('&');
  if (msg[0]) {
    log.value.msg = msg[0];
  }
  if (msg[1]) {
    log.value.total = msg[1];
  }
};
</script>
<style lang="scss">
.tip {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  .item {
    color: #ffffff;
    font-size: 9px;
    flex-shrink: 0;
  }
}
</style>
