<script setup lang="ts">
	import axios from 'axios';
	import { onMounted, reactive, watch } from 'vue';
	import ProductCard from './ProductCard.vue';
	import SearchInput from './SearchInput.vue';
	import SortBy from './SortBy.vue';
	import type { TSneaker } from '../types/sneaker';
	import { useCartStore } from '../store/cart';
	import { useSneakerStore } from '../store/sneaker';

	const cartStore = useCartStore();
	const sneakerStore = useSneakerStore();

	const filters = reactive({
		searchByTitle: '',
		sortBy: 'price',
		sortDirection: true,
	});

	onMounted(async () => {
		// await getItems();
		// await getFavorites();
		// await getCart();
	});

	watch(filters, async () => {
		// await getItems();
		// await getFavorites();
		// await getCart();
	});

	function searchValueHandler(searchValue: string) {
		filters.searchByTitle = searchValue;
	}

	function sortDirectionHandler(sortDirection: boolean) {
		filters.sortDirection = sortDirection;
	}

	function sortByHandler(sortBy: string) {
		filters.sortBy = sortBy;
	}

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
	<div class="product-list">
		<div class="flex justify-between items-center">
			<h2 class="font-bold text-[32px]">Все кроссовки</h2>
			<SearchInput @search-value="searchValueHandler" />
		</div>

		<SortBy @sort-direction="sortDirectionHandler" @sort-by="sortByHandler" />

		<div class="sneakers grid grid-cols-4 gap-[40px]">
			<ProductCard
				v-for="sneaker in sneakerStore.sneakers"
				:sneaker="sneaker"
				:key="sneaker.id"
				@on-liked="onLikeHandler"
				@on-added="cartStore.addToCart(sneaker)"
				@on-removed="cartStore.removeFromCart(sneaker)"
			/>
		</div>
	</div>
</template>
