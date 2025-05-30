<template>
  <div class="layout">
    <div class="header">VIP 炼妖</div>
    <div class="body">
      <van-tabs v-model:active="activeTab">
        <van-form>
          <van-tab title="基本设置" name="base">
            <base-config :base="config.base" />
          </van-tab>
          <van-tab title="摆摊价格" name="scene">
            <goods-config :goods="config.goods" />
          </van-tab>
        </van-form>
      </van-tabs>
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
import { Config } from '@/types';
import BaseConfig from '@/components/BaseConfig.vue';
import GoodsConfig from '@/components/GoodsConfig.vue';
const activeTab = ref<string>('base');
const config = ref<Config>({
  base: {
    tl: 1,
    max_bb_price: 7999,
    check_tw_time: 3600,
    shop_name_keys: [],
    bb_keys: [],
    min_money: 100000,
    tw_local: '',
    tw_pos_x: 0,
    tw_pos_y: 0,
    tw_num: 10,
  },
  goods: [],
});
onMounted(() => {
  window.airscript.call('mounted', 'onConfig');
});

const start = () => {
  config.value.base.shop_name_keys =
    config.value.base.shop_key_str!.split('，');
  config.value.base.bb_keys = config.value.base.bb_key_str!.split('，');
  delete config.value.base.shop_key_str;
  delete config.value.base.bb_key_str;
  const res: any = {
    base: config.value.base,
    goods: {},
  };
  config.value.goods.forEach((item) => {
    const good: any = {
      name: item.name,
    };
    item.data.forEach((item2) => {
      const level: any = {};
      item2.data.forEach((item3) => {
        level[item3.id] = item3;
      });
      good[item2.id] = level;
    });
    res.goods[item.id] = good;
  });
  // console.log(JSON.stringify(res));
  window.airscript.call('start', JSON.stringify(res));
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
window.onConfig = (data: { base: Config['base']; goods: any }) => {
  config.value.base = data.base;
  config.value.base.shop_key_str = data.base.shop_name_keys.join('，');
  config.value.base.bb_key_str = data.base.bb_keys.join('，');
  config.value.goods = [];
  const goods = data.goods;
  if (goods) {
    Object.keys(goods).forEach((key1) => {
      const item = goods[key1];
      const good: any = {
        id: key1,
        name: item.name,
        active: [],
        data: [],
      };
      Object.keys(item).forEach((key2) => {
        if (key2 !== 'name') {
          const item2 = item[key2];
          const level: any = {
            id: key2,
            name: key2,
            data: [],
          };
          Object.keys(item2).forEach((key3) => {
            const item3 = item2[key3];
            level.data.push({
              id: key3,
              name: key3,
              ...item3,
            });
          });
          if (Object.keys(item2).length && good.active.length === 0) {
            good.active.push(level.name);
          }
          level.data.sort((a: any, b: any) => {
            return a.min - b.min;
          });
          good.data.push(level);
        }
      });
      config.value.goods.push(good);
    });
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
    background-color: #eff2f5;
    .van-tabs {
      height: 100%;
      .van-tabs__wrap {
        border-bottom: 1px solid #eff2f5;
      }
      .van-tabs__content {
        height: calc(100% - 46px);
        background-color: #fff;
        overflow: auto;
      }
    }
  }
  .van-action-bar {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
