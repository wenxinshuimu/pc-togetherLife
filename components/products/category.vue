<template>
  <div class="m-product-category">
    <dl class="cate">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="(item, index) in types" :key="index">
        <pop-select
        :name="item.type"
        :list="item.module">
        </pop-select>
      </dd>
    </dl>
		<dl class="cate">
			<dt>区域</dt>
			<dt>全部</dt>
			<dd v-for="(item, idx) in areas"
					:key="idx">
				<pop-select
					:name="item.type"
					:list="item.module" />
			</dd>
		</dl>
  </div>
</template>
<script>
import PopSelect from './poSelect'
export default {
  name: 'Category',
  components: {
    PopSelect
  },
  props: {
    types: {
      type: Array,
      default() {
        return [];
      }
    },
		areas: {
			type: Array,
			default() {
				return [];
			}
		}
  }
}
</script>