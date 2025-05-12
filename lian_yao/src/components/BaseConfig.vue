<template>
  <div>
    <van-row>
      <van-col span="12">
        <van-field label-width="50" name="tl" label="体力(%)">
          <template #input>
            <van-stepper
              v-model="props.base.tl"
              min="0"
              max="1"
              button-size="24px"
              step="0.01"
            />
          </template>
        </van-field>
      </van-col>
      <van-col span="12">
        <van-field label-width="56" name="check_tw_time" label="检查摊位">
          <template #input>
            <van-stepper
              v-model="props.base.check_tw_time"
              min="0"
              button-size="24px"
              step="1000"
            />
          </template>
        </van-field>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12">
        <van-field label-width="56" name="max_bb_price" label="宝宝价格">
          <template #input>
            <van-stepper
              v-model="props.base.max_bb_price"
              min="0"
              button-size="24px"
              step="1000"
            />
          </template>
        </van-field>
      </van-col>
      <van-col span="12">
        <van-field label-width="70" name="shop_name_keys" label="商店关键字">
          <template #input>
            <span>{{ props.base.shop_name_keys.join(',') }}</span>
          </template>
        </van-field>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12">
        <van-field label-width="56" name="min_money" label="最少金币">
          <template #input>
            <van-stepper
              v-model="props.base.min_money"
              min="0"
              button-size="24px"
              input-width="90px"
              step="10000"
            />
          </template>
        </van-field>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12">
        <van-field label-width="70" name="shop_name_keys" label="宝宝关键字">
          <template #input>
            <span>{{ props.base.bb_keys.join(',') }}</span>
          </template>
        </van-field>
      </van-col>
      <van-col span="12">
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
