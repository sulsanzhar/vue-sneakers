import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type { TSneaker } from '../types/sneaker';

export const useCartStore = defineStore('cart', () => {
	const cart = reactive<TSneaker[]>([]);
	const totalPrice = ref(0);
	const isOpenCart = ref(false);

	function onCartVisible() {
		isOpenCart.value = !isOpenCart.value;
		console.log('changed');
		console.log(isOpenCart.value);
	}

	function addToCart(sneaker: TSneaker) {
		try {
			if (!sneaker.isAdded) {
				// console.log('added sneaker boolean: ', sneaker.isAdded);
				// sneaker.isAdded = true;
				// await axios.post('https://8ac6263e30881f16.mokky.dev/cart', {
				// 	sneakerId: sneaker.id,
				// 	count: 1,
				// });
				cart.push(sneaker);
				sneaker.isAdded = true;
				totalPrice.value += sneaker.price;
				console.log('cartItems added: ', cart);
			} else {
				// await axios.delete(`https://8ac6263e30881f16.mokky.dev/cart/${sneaker.}`);
				cart.splice(cart.indexOf(sneaker), 1);
				sneaker.isAdded = false;
				totalPrice.value -= sneaker.price;
				console.log('cartItems deleted: ', cart);
			}
		} catch (error) {
			console.log('error: ', error);
		}
	}

	return { cart, totalPrice, isOpenCart, addToCart, onCartVisible };
});
