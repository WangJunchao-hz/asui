<template>
  <div class="layout">
    <div class="header">VIP 炼妖</div>
    <div class="body">
      <van-field v-model="config" type="textarea" label-align="top" label="粘贴配置" required placeholder="必须粘贴配置不然脚本无法启动"
        rows="9" />
    </div>
    <div class="footer">
      <van-action-bar>
        <van-action-bar-button type="danger" text="退出脚本" @click="stop" />
        <van-action-bar-button type="primary" text="运行脚本" @click="start" />
      </van-action-bar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { showConfirmDialog } from 'vant';
import { showToast } from 'vant';
const config = ref<any>();
onMounted(() => {
  if (window.airscript) {
    window.airscript.call('mounted', 'onConfig');
  }
});

const start = () => {
  // console.log(config.value);
  window.airscript.call('start', config.value);
};

const stop = () => {
  showConfirmDialog({
    title: '提示',
    message: '确认退出脚本？',
  }).then(() => {
    showToast('退出成功！');
    setTimeout(() => {
      window.airscript.call('stop', '');
    }, 1000);
  });
};
window.onConfig = (data: any) => {
  config.value = JSON.stringify(data);
};
</script>

<style lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  border-radius: 10px;
  background-color: #f8f8f8;
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-weight: bold;
    color: rgb(205, 127, 50);
    font-size: 20px;
    background-color: #fff;
    border-bottom: 1px solid #eff2f5;
  }

  .body {
    height: calc(100% - 100px);
    overflow: auto;
    background-color: #ffffff;
  }

  .van-action-bar {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
