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
        <van-field label-width="84" name="check_tw_time" label="检查摊位(秒)">
          <template #input>
            <van-stepper
              v-model="props.base.check_tw_time"
              min="0"
              button-size="24px"
              input-width="66px"
              step="1000"
            />
          </template>
        </van-field>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-field label-width="56" name="tan_wei_cj" label="摆摊位置">
          <template #input>
            <van-radio-group
              v-model="props.base.tw_local"
              direction="horizontal"
            >
              <van-radio v-for="l in local" :key="l" :name="l">
                {{ l }}
              </van-radio>
            </van-radio-group>
            坐标 (
            <van-stepper
              v-model="props.base.tw_pos_x"
              min="0"
              button-size="24px"
              step="1"
            />
            ，
            <van-stepper
              v-model="props.base.tw_pos_y"
              min="0"
              button-size="24px"
              step="1"
            />)
          </template>
        </van-field>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12">
        <van-field
          label-width="70"
          v-model="props.base.shop_key_str"
          name="shop_key_str"
          label="商店关键字"
        >
        </van-field>
      </van-col>
      <van-col span="12">
        <van-field
          label-width="70"
          v-model="props.base.bb_key_str"
          name="bb_key_str"
          label="宝宝关键字"
        >
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
              input-width="66px"
              step="1000"
            />
          </template>
        </van-field>
      </van-col>
      <van-col span="12">
        <van-field label-width="56" name="tw_num" label="取仓阙值">
          <template #input>
            <van-stepper
              v-model="props.base.tw_num"
              min="0"
              button-size="24px"
              step="1"
            />
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
      <van-col span="12">
        <van-button plain type="warning" size="small" @click="clear()">
          重置配置
        </van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Config } from '@/types';
const props = defineProps<{ base: Config['base'] }>();
const local = ref<string[]>(['建邺城', '长安城']);
const clear = () => {
  let fun_name = 'reset_config';
  window.airscript.call(fun_name, '');
};
</script>
<style lang="scss" scoped></style>
