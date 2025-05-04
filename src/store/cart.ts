import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TSneaker } from '../types/sneaker';
import axios from 'axios';
import { useSneakerStore } from './sneaker';

export const useCartStore = defineStore('cart', () => {
	let cart = ref<TSneaker[]>([]);
	let totalPrice = ref(0);
	const isOpenCart = ref(false);

	const sneakerStore = useSneakerStore();

	async function onCreateOrder(order: TSneaker[]) {
		console.log('order: ', order);
		order.forEach((item) => {
			item.isAdded = false;
			axios.delete(`https://8ac6263e30881f16.mokky.dev/cart/${item.id}`);
		});
		cart.value.length = 0;
		totalPrice.value = 0;
	}

	function onCartVisible() {
		isOpenCart.value = !isOpenCart.value;
		console.log('changed');
		console.log(isOpenCart.value);
	}

	function removeFromCart(sneaker: TSneaker) {
		if (sneaker.isAdded) {
			cart.value.splice(cart.value.indexOf(sneaker), 1);
			sneaker.isAdded = false;
			totalPrice.value -= sneaker.price;
			axios.delete(`https://8ac6263e30881f16.mokky.dev/cart/${sneaker.isAddedId}`);
		}
	}

	async function addToCart(sneaker: TSneaker) {
		try {
			sneaker.isAdded = true;
			cart.value.push(sneaker);
			totalPrice.value += sneaker.price;
			await axios.post('https://8ac6263e30881f16.mokky.dev/cart', {
				sneakerId: sneaker.id,
				count: 1,
			});
		} catch (error) {
			console.log('error: ', error);
		}
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

	const getCart = async () => {
		try {
			const { data: cartData } = await axios.get('https://8ac6263e30881f16.mokky.dev/cart');
			const itemsInCart: TSneaker[] = [];

			sneakerStore.sneakers = sneakerStore.sneakers.map((item) => {
				const findAdded = cartData.find(
					(added: { sneakerId: number }) => added.sneakerId === item.id
				);
				if (!findAdded) return item;

				const cartItem = {
					...item,
					isAdded: true,
					isAddedId: findAdded.id,
					count: findAdded.count,
				};

				itemsInCart.push(cartItem);
				return cartItem;
			});

			cart.value = itemsInCart;
			totalPrice.value = itemsInCart.reduce((acc, item) => acc + item.price * (item.count || 1), 0);
		} catch (e) {
			console.log(e);
		}
	};

	return {
		cart,
		totalPrice,
		isOpenCart,
		addToCart,
		removeFromCart,
		onCartVisible,
		onCreateOrder,
		onLikeHandler,
		getCart,
	};
});
