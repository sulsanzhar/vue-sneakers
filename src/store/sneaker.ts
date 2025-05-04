import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { TSneaker } from '../types/sneaker';
import axios from 'axios';

export const useSneakerStore = defineStore('sneaker', () => {
	let sneakers = ref<TSneaker[]>([]);
	const filters = reactive({
		searchByTitle: '',
		sortBy: 'price',
		sortDirection: true,
	});

	const getItems = async () => {
		try {
			const params = {
				sortBy: (filters.sortDirection ? '' : '-') + 'price',
			};

			if (filters.searchByTitle) params.title = `*${filters.searchByTitle}*`;

			const { data } = await axios.get('https://8ac6263e30881f16.mokky.dev/sneakers', {
				params: params,
			});

			console.log('data from sneaker: ', data);
			sneakers.value = data;
		} catch (error) {
			console.log('error: ', error);
		}
	};

	const getFavorites = async () => {
		try {
			const { data } = await axios.get('https://8ac6263e30881f16.mokky.dev/favorites');

			sneakers.value = sneakers.value.map((item) => {
				const findFav = data.find((fav: { sneaker_id: number }) => fav.sneaker_id === item.id);

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

	return { getItems, getFavorites, sneakers, filters };
});
