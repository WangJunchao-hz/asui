<template>
  <div class="layout">
    <div class="header">十围梦幻 VIP</div>
    <div class="body">
      <van-field
        v-model="config"
        type="textarea"
        disabled
        label-align="top"
        label="脚本配置"
        required
        placeholder="必须粘贴配置不然脚本无法启动"
        rows="9"
        @paste="getCopy"
      />
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

const config = ref('');
const getCopy = (e: any) => {
  const pasteData = e.clipboardData || window.clipboardData;
  config.value = pasteData.getData('text/plain');
  showToast('粘贴成功！');
  e.preventDefault(); // 阻止默认粘贴行为
};
onMounted(() => {
  if (window.airscript) {
    window.airscript.call('mounted', 'onConfig');
  }
});

const start = () => {
  // console.log(config.value);
  if (config.value) {
    window.airscript.call('start', config.value);
  } else {
    showToast('请输入配置！');
  }
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
  const cfg_str = JSON.stringify(data);
  if (cfg_str.includes('基本设置')) {
    config.value = cfg_str;
  }
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
