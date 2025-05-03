<script setup lang="ts">
	import axios from 'axios';
	import { onMounted, reactive, ref, watch } from 'vue';
	import ProductCard from './ProductCard.vue';
	import SearchInput from './SearchInput.vue';
	import SortBy from './SortBy.vue';
	import type { TSneaker } from '../types/sneaker';
	import { useCartStore } from '../store/cart';

	const sneakers = ref<TSneaker[]>([]);
	const { addToCart } = useCartStore();

	const filters = reactive({
		searchByTitle: '',
		sortBy: 'price',
		sortDirection: true,
	});

	// const getCart = async () => {
	// 	try {
	// 		const { data: cartData } = await axios.get('https://8ac6263e30881f16.mokky.dev/cart');

	// 		sneakers.value = sneakers.value.map((item) => {
	// 			const findAdded = cartData.find(
	// 				(added: { sneakerId: number }) => added.sneakerId === item.id
	// 			);

	// 			if (!findAdded) return item;

	// 			return {
	// 				...item,
	// 				isAdded: true,
	// 				count: findAdded.count,
	// 			};
	// 		});
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	const getFavorites = async () => {
		try {
			const { data } = await axios.get('https://8ac6263e30881f16.mokky.dev/favorites');

			sneakers.value = sneakers.value.map((item) => {
				const findFav = data.find((fav: { sneakerId: number }) => fav.sneakerId === item.id);

				if (!findFav) return item;

				return {
					...item,
					isLiked: true,
					isLikedId: findFav.id,
				};
			});
		} catch (error) {
			console.log('error: ', error);
		}
	};

	const getItems = async () => {
		try {
			const params = {
				sortBy: (filters.sortDirection ? '' : '-') + 'price',
			};

			if (filters.searchByTitle) params.title = `*${filters.searchByTitle}*`;

			const { data } = await axios.get(`https://8ac6263e30881f16.mokky.dev/sneakers`, {
				params: params,
			});
			sneakers.value = data;
		} catch (error) {
			console.log('error: ', error);
		}
	};

	onMounted(async () => {
		await getItems();
		await getFavorites();
		// await getCart();
	});

	watch(filters, async () => {
		await getItems();
		await getFavorites();
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
					sneakerId: sneaker.id,
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
				v-for="sneaker in sneakers"
				:sneaker="sneaker"
				:key="sneaker.id"
				@on-added="addToCart(sneaker)"
				@on-liked="onLikeHandler"
			/>
		</div>
	</div>
</template>
