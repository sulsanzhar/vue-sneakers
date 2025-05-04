<script setup lang="ts">
	import axios from 'axios';
	import { ref, onMounted } from 'vue';
	import ProductCard from '../components/ProductCard.vue';
	import type { TOrders } from '../types/orders';
	import { RouterLink } from 'vue-router';
	import { useCartStore } from '../store/cart';
	import type { TSneaker } from '../types/sneaker';

	const cartStore = useCartStore();
	const orders = ref<TOrders[] | null>(null);

	onMounted(async () => {
		await getOrders();
	});

	const getOrders = async () => {
		try {
			const { data: ordersData } = await axios.get('https://8ac6263e30881f16.mokky.dev/orders');

			const ordersWithSneakers = await Promise.all(
				ordersData.map(async (order: { sneaker_ids: number[] }) => {
					const sneakers = await Promise.all(
						order.sneaker_ids.map(async (id: number) => {
							const { data: sneaker } = await axios.get(
								`https://8ac6263e30881f16.mokky.dev/sneakers/${id}`
							);
							return sneaker;
						})
					);

					return { ...order, sneakers };
				})
			);

			orders.value = ordersWithSneakers;
		} catch (error) {
			console.error('Error loading orders:', error);
		}
	};

	async function onLikeHandler(sneaker: TSneaker) {
		try {
			if (!sneaker.isLiked) {
				sneaker.isLiked = true;

				const { data } = await axios.post('https://8ac6263e30881f16.mokky.dev/favorites', {
					sneaker_id: sneaker.id,
				});

				sneaker.isLikedId = data.id;
			} else {
				sneaker.isLiked = !sneaker.isLiked;

				const { data } = await axios.delete(
					`https://8ac6263e30881f16.mokky.dev/favorites/${sneaker.isLikedId}`
				);

				data.isLikedId = null;
			}
		} catch (error) {
			console.log('error: ', error);
		}
	}
</script>

<template>
	<div class="container">
		<div class="flex items-center gap-[21px] mb-5">
			<RouterLink to="/">
				<img src="../../public/arrow-left.png" alt="arrow-left" />
			</RouterLink>
			<h2 class="font-bold text-[32px]">Мои покупки</h2>
		</div>
		<div v-if="orders" class="space-y-8">
			<div v-for="order in orders" :key="order.id">
				<h3 class="text-lg font-bold mb-5">
					Заказ №{{ order.id }} от
					{{
						new Date(order.date).toLocaleString('ru-RU', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})
					}}
				</h3>
				<div class="sneakers grid grid-cols-4 gap-[40px]">
					<ProductCard
						v-for="sneaker in order.sneakers"
						:key="sneaker.id"
						:sneaker="sneaker"
						@on-liked="onLikeHandler"
						@on-added="cartStore.addToCart(sneaker)"
						@on-removed="cartStore.removeFromCart(sneaker)"
					/>
				</div>
			</div>
		</div>
		<div v-else>
			<p>Загрузка заказов...</p>
		</div>
	</div>
</template>
