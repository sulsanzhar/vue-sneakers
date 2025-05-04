<script setup lang="ts">
	import axios from 'axios';
	import { ref, onMounted } from 'vue';
	import ProductCard from '../components/ProductCard.vue';
	import { RouterLink } from 'vue-router';
	import { useCartStore } from '../store/cart';
	import type { TSneaker } from '../types/sneaker';

	type TWishlist = {
		id: number;
		sneaker: TSneaker;
	};

	const cartStore = useCartStore();
	const wishlist = ref<TWishlist[] | null>(null);

	onMounted(async () => {
		await getOrders();
		console.log('wishlist: ', wishlist.value);
	});

	const getOrders = async () => {
		try {
			const { data } = await axios.get(
				'https://8ac6263e30881f16.mokky.dev/favorites?_relations=sneakers'
			);

			wishlist.value = data.map((item) => ({
				...item,
				sneaker: {
					...item.sneaker,
					isLiked: true,
				},
			}));
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
			<h2 class="font-bold text-[32px]">Избранные</h2>
		</div>
		<div v-if="wishlist" class="space-y-8">
			<div class="sneakers grid grid-cols-4 gap-[40px]">
				<ProductCard
					v-for="sneaker in wishlist"
					:key="sneaker.id"
					:sneaker="sneaker.sneaker"
					@on-liked="onLikeHandler"
					@on-added="cartStore.addToCart(sneaker.sneaker)"
					@on-removed="cartStore.removeFromCart(sneaker.sneaker)"
				/>
			</div>
		</div>
		<div v-else>
			<p>Загрузка избранных...</p>
		</div>
	</div>
</template>
