<template>
  <div class="good">
    <div class="good-item" v-for="good in props.goods">
      <div class="good-title">{{ good.name }}</div>
      <div class="good-content">
        <van-collapse v-model="good.active">
          <van-collapse-item
            v-for="level in good.data"
            :key="level.name"
            :name="level.name"
          >
            <template #title>
              <div class="level-title">
                {{ level.name }}级
                <van-icon
                  style="margin-left: 6px"
                  name="add-o"
                  color="#1989fa"
                  size="20"
                  @click.stop="add(level)"
                />
              </div>
            </template>
            <div class="attr" v-for="(attr, i) in level.data">
              <van-row class="attr-row">
                <van-col span="8">
                  <van-field label-width="42" name="lan" label="灵气值">
                    <template #input>
                      <template v-if="attr.range">
                        {{ attr.min }} — {{ attr.max }}
                      </template>
                      <template v-else>
                        {{ attr.min }}
                      </template>
                    </template>
                  </van-field>
                </van-col>
                <van-col span="14">
                  <van-field label-width="28" name="price" label="价格">
                    <template #input>
                      <van-stepper
                        v-model="attr.price"
                        min="0"
                        input-width="90px"
                        button-size="24px"
                        step="1000"
                        integer
                      />
                    </template>
                  </van-field>
                </van-col>
                <van-col span="2">
                  <van-icon
                    name="delete-o"
                    color="#ee0a24"
                    size="20"
                    @click="del(level.data, i)"
                  />
                </van-col>
              </van-row>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <van-popup
      v-model:show="addShow"
      closeable
      style="width: 70%; border-radius: 6px"
    >
      <div class="add">
        <div class="add-title" style="font-size: 16px; padding: 10px">
          新增价格
        </div>
        <van-field name="ling" label-width="120">
          <template #label>
            <div style="display: flex; align-items: center">
              灵气值 (范围
              <van-switch
                class="switch"
                v-model="addParams.range"
                size="14px"
              />)
            </div>
          </template>
          <template #input>
            <van-stepper
              v-model="addParams.min"
              min="0"
              button-size="24px"
              step="1"
              integer
            />
            <template v-if="addParams.range">
              -
              <van-stepper
                v-model="addParams.max"
                :min="addParams.min"
                button-size="24px"
                step="1"
                integer
              />
            </template>
          </template>
        </van-field>
        <van-field label-width="28" name="price" label="价格">
          <template #input>
            <van-stepper
              v-model="addParams.price"
              min="0"
              input-width="90px"
              button-size="24px"
              step="1000"
              integer
            />
          </template>
        </van-field>
        <van-button type="primary" plain size="small" block @click="do_add"
          >新 增</van-button
        >
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { showConfirmDialog } from 'vant';
import { Config, Level } from '@/types';
const props = defineProps<{ goods: Config['goods'] }>();
const addShow = ref(false);
const addParams = ref<{
  name: string;
  min: number;
  max: number;
  price: number;
  range: boolean;
}>({
  name: '',
  min: 0,
  max: 0,
  price: 0,
  range: true,
});
let current: any = undefined;
const add = (row: Level) => {
  addShow.value = true;
  current = row;
};
const do_add = () => {
  if (addParams.value.range) {
    addParams.value.name = `${addParams.value.min}_${addParams.value.max}`;
  } else {
    addParams.value.name = `${addParams.value.min}`;
  }
  current.data.push(addParams.value);
  addShow.value = false;
};
const del = (data: any[], i: number) => {
  showConfirmDialog({
    title: '警告',
    message: '确认删除？',
  }).then(() => {
    data.splice(i, 1);
  });
};
</script>
<style lang="scss" scoped>
.good {
  &-title {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    font-size: 14px;
  }
  .level {
    &-title {
      display: flex;
      align-items: center;
    }
  }
  .attr-row {
    display: flex;
    align-items: center;
  }
}
</style>
