<template>
	<li
		v-if="meta.photos.length"
		class="m-detail-item">
		<dl class="section">
			<dd>
				<img 
					:src="meta.photos[0].url" 
					:alt="meta.photos[0].title" />
			</dd>
			<dd>
				<h4>{{ meta.name }}</h4>
				<p>
					<span v-if="meta.biz_ext&&meta.biz_ext.ticket_ordering">
						剩余：{{ Number(meta.biz_ext.ticket_ordering) }}
					</span>
					<span v-if="meta.deadline">
						截止日期： {{ meta.deadline}}
					</span>
				</p>
				<p>
					<span class="price">
						{{ Number(meta.biz_ext.cost) }}
					</span>
					<sub>
						门店价 {{ Number(meta.biz_ext.cost )}}
					</sub>
				</p>
			</dd>
			<dd>
				<el-button
				  type="waring"
				  round
				  @click="createCart">
					立即抢购
				</el-button>
			</dd>
		</dl>
	</li>
</template>

<script>
import CartModel from '@/models/Cart'
const cartModel = new CartModel();
export default {
	props: {
		meta: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	methods: {
		createCart: async function() {
			let cartId= Math.random().toString().slice(3, 9),
					detail = {
						name: this.meta.name,
						price: this.meta.biz_ext.cost,
						imgs: this.meta.photos
					}
			let { status, data: {code, id} } = await cartModel.createCart(cartId, detail)

			if (status === 200 && code === 0) {
				window.location.href = `/cart/?id=${id}`;
			} else {
				console.log(error);
			}
		}
	}
}
</script>











