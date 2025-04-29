<template>
  <div>
    <van-row>
      <van-col span="12"> </van-col>
      <van-col span="12"> </van-col>
    </van-row>
    <van-row>
      <van-col span="12"> </van-col>
      <van-col span="12"> </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-button plain type="warning" size="small" @click="clear()">
          重置配置
        </van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script lang="ts" setup>
import { Config } from '@/types';
const props = defineProps<{ base: Config['base'] }>();
const clear = () => {
  let fun_name = 'reset_config';
  window.airscript.call(fun_name, '');
};
</script>
<style lang="scss" scoped></style>
