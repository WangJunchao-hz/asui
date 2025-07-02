<script lang="ts" setup>
import { QuestionFilled } from '@element-plus/icons-vue'
import { computed, ref, toRefs } from 'vue'
import DaoJu from './daoJu.vue'

const props = defineProps<{ config: any }>()
const { config } = toRefs(props)
const djKey = ref('')
const lists = computed(() => {
	return Object.keys(props.config).filter((key) => {
		const flag = key.includes('道具')
		if (flag) {
			djKey.value = key
		}
		return !flag
	})
})
</script>

<template>
	<div class="config" w="full" h="full" py="4">
		<el-form
			:model="config"
			label-width="auto"
			label-position="right"
			:inline="true">
			<el-form-item v-for="list in lists" :key="list" :label="list">
				<template #label>
					<span style="display: flex; align-items: center">
						{{ list }}
						<el-tooltip
							v-if="config[list].desc"
							effect="dark"
							:content="config[list].desc"
							placement="top-start">
							<el-icon size="16" style="cursor: pointer; color: #cdd0d6">
								<QuestionFilled />
							</el-icon>
						</el-tooltip>
					</span>
				</template>
				<el-input
					v-if="config[list].comp === 'input'"
					v-model="config[list].value"
					:type="config[list].type"
					:placeholder="config[list].props.placeholder" />
				<el-input-number
					v-if="config[list].comp === 'inputNumber'"
					v-model="config[list].value"
					:precision="config[list].props.precision"
					:step="config[list].props.step"
					:max="config[list].props.max"
					:min="config[list].props.min" />
				<el-input-tag
					v-if="config[list].comp === 'inputTag'"
					v-model="config[list].value"
					:placeholder="config[list].props.placeholder" />
				<el-select
					v-if="config[list].comp === 'select'"
					v-model="config[list].value"
					style="width: 100px">
					<el-option
						v-for="item in config[list].options"
						:key="item.value"
						:label="item.label"
						:value="item.value" />
				</el-select>
				<el-select
					v-if="config[list].comp === 'selectMultiple'"
					v-model="config[list].value"
					:style="{ width: config[list].width || '240px' }"
					multiple
					:placeholder="config[list].props.placeholder">
					<el-option
						v-for="item in config[list].options"
						:key="item.value"
						:label="item.label"
						:value="item.value" />
				</el-select>
				<template v-if="config[list].isCoord">
					<el-input-number
						v-model="config[list].x.value"
						style="width: 86px"
						:min="0"
						controls-position="right" />
					<span style="padding: 0 6px; font-size: 20px">,</span>
					<el-input-number
						v-model="config[list].y.value"
						style="width: 86px"
						:min="0"
						controls-position="right" />
				</template>
				<template v-if="config[list].isRange">
					<el-input-number
						v-model="config[list].start.value"
						style="width: 86px"
						:min="config[list].start.min || 0"
						controls-position="right" />
					<span style="padding: 0 6px; font-size: 20px">,</span>
					<el-input-number
						v-model="config[list].end.value"
						style="width: 86px"
						:min="config[list].end.min || 0"
						controls-position="right" />
				</template>
			</el-form-item>
		</el-form>
		<DaoJu v-if="djKey" :label="djKey" :data="config[djKey]" />
	</div>
</template>

<style lang="scss" scoped>
.config {
	overflow: auto;
	box-sizing: border-box;
	text-align: left;
}
</style>
