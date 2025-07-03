<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { computed, ref, toRefs } from 'vue'
import { deepAdjustPrice, deepObjToArray } from '../utils'

const props = defineProps<{ data: any, label: string }>()
const { data, label } = toRefs(props)
const adjustModal = ref({
  visible: false,
  form: {
    isPer: true,
    per: 1,
    qw: 0,
    bw5: 0,
    bw1: 0,
    sw5: 0,
    sw1: 0,
    w5: 0,
    w1: 0,
  },
  keys: [] as string[],
})
const lists = computed(() => {
  return deepObjToArray(data.value)
})

function adjustPrice(keys: string[]) {
  console.log(keys)
  adjustModal.value.keys = keys
  adjustModal.value.visible = true
}
function adjustPriceConfirm() {
  let target = data.value
  if (adjustModal.value.keys.length) {
    adjustModal.value.keys.forEach((key) => {
      target = target[key]
    })
  }
  console.log(target)
  deepAdjustPrice(target, adjustModal.value.form)
  adjustModal.value.visible = false
  ElMessage.success('修改成功')
}
</script>

<template>
  <div class="dao_ju">
    <div>
      {{ label }}
      <el-button-group>
        <el-button style="padding-left: 12px;padding-right: 8px;" text type="primary" @click="adjustPrice([])">
          调价
        </el-button>
      </el-button-group>
    </div>
    <el-collapse expand-icon-position="left">
      <el-collapse-item v-for="list in lists" :key="list.label" :title="list.label" :name="list.label">
        <template #title>
          <span>{{ list.label }}</span>
          <el-button-group>
            <el-button
              style="padding-left: 12px;padding-right: 8px;" text type="primary"
              @click.stop="adjustPrice([list.label])"
            >
              调价
            </el-button>
          </el-button-group>
        </template>
        <template v-if="Array.isArray(list.data)">
          <el-collapse-item v-for="list2 in list.data" :key="list2.label" :title="list2.label" :name="list2.label">
            <template #title>
              <span>{{ list2.label }}</span>
              <el-button-group>
                <el-button
                  style="padding-left: 12px;padding-right: 8px;" text type="primary"
                  @click.stop="adjustPrice([list.label, list2.label])"
                >
                  调价
                </el-button>
              </el-button-group>
            </template>
            <el-form :model="list2.data" label-width="auto" label-position="right" :inline="true">
              <el-form-item
                v-for="item in Object.keys(list2.data).filter(key => key !== 'isLast')" :key="item"
                :label="item"
              >
                <el-input-number
                  v-model="list2.data[item].value"
                  :step="(list2.data[item].value / 10000) >= 1 ? 10000 : 1000" :min="0"
                />
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </template>
        <template v-else>
          <el-form :model="list.data" label-width="auto" label-position="right" :inline="true">
            <el-form-item
              v-for="item in Object.keys(list.data).filter(key => key !== 'isLast')" :key="item"
              :label="item"
            >
              <el-input-number
                v-model="list.data[item].value"
                :step="(list.data[item].value / 10000) >= 1 ? 10000 : 1000" :min="0"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-dialog v-model="adjustModal.visible" title="调整价格" width="600">
      <el-form :model="adjustModal.form" :inline="true" label-width="auto" label-position="right">
        <el-form-item label="使用折扣">
          <el-switch v-model="adjustModal.form.isPer" />
        </el-form-item>
        <template v-if="adjustModal.form.isPer">
          <el-form-item label="折扣力度">
            <el-input-number v-model="adjustModal.form.per" :min="0" :max="1" :step="0.01" :precision="2" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="千万+">
            <el-input-number v-model="adjustModal.form.qw" :step="10000" />
          </el-form-item>
          <el-form-item label="5百万-1千万">
            <el-input-number v-model="adjustModal.form.bw5" :step="10000" />
          </el-form-item>
          <el-form-item label="1百万-5百万">
            <el-input-number v-model="adjustModal.form.bw1" :step="10000" />
          </el-form-item>
          <el-form-item label="5十万-1百万">
            <el-input-number v-model="adjustModal.form.sw5" :step="1000" />
          </el-form-item>
          <el-form-item label="十万-5十万">
            <el-input-number v-model="adjustModal.form.sw1" :step="1000" />
          </el-form-item>
          <el-form-item label="5万-十万">
            <el-input-number v-model="adjustModal.form.w5" :step="1000" />
          </el-form-item>
          <el-form-item label="5万以下">
            <el-input-number v-model="adjustModal.form.w1" :step="1000" />
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="adjustModal.visible = false">
            取消
          </el-button>
          <el-button type="primary" @click="adjustPriceConfirm">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
