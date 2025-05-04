<script setup lang="ts">
	import { ref } from 'vue';
	import { useCartStore } from '../store/cart';
	import CartItem from './CartItem.vue';
	import EmptyCart from './EmptyCart.vue';
	import OrderComplete from './OrderComplete.vue';
	import axios from 'axios';

	const cartStore = useCartStore();
	const isOrder = ref(false);

	const orderHandler = async () => {
		try {
			const sneakersId = cartStore.cart.map((item) => item.id);

			const { data } = await axios.post('https://8ac6263e30881f16.mokky.dev/orders', {
				sneaker_ids: sneakersId,
				price: cartStore.totalPrice,
				date: Date.now(),
			});

			cartStore.onCreateOrder(cartStore.cart);
			isOrder.value = true;
			return { data };
		} catch (error) {
			console.log('error:', error);
		}
	};
</script>

<template>
	<div
		class="fixed top-0 right-0 z-50 h-full w-[385px] bg-white shadow-[-10px_4px_24px_0px_#0000001A] p-[30px]"
	>
		<div class="flex items-center gap-[10px] mb-[30px]">
			<img
				v-show="cartStore.cart.length"
				@click="cartStore.onCartVisible"
				:class="[
					'cursor-pointer',
					'rotate-180',
					'py-[12px]',
					'px-[14px]',
					'border',
					'border-[#F2F2F2]',
					'rounded-[8px]',
				]"
				src="../../public/arrow-right.svg"
				alt="close"
			/>
			<h2 class="text-[24px] font-bold">Корзина</h2>
		</div>
		<div
			:class="['space-y-[20px]', 'h-[70%]', 'overflow-y-auto', !cartStore.cart.length && 'flex ']"
		>
			<CartItem v-for="item in cartStore.cart" :sneaker="item" />
			<EmptyCart v-show="!cartStore.cart.length && !isOrder" />
			<OrderComplete v-show="isOrder" />
		</div>
		<div v-show="cartStore.cart.length" class="flex flex-col self-end">
			<div class="flex items-end">
				<span class="relative">Итого:</span>
				<span class="flex-1 mb-[6px] border-b border-[#DFDFDF] border-dashed mx-2" />
				<span>{{ cartStore.totalPrice }} тенге</span>
			</div>
			<div class="flex items-end mt-[19px]">
				<span class="relative">Налог 5%:</span>
				<span class="flex-1 mb-[6px] border-b border-[#DFDFDF] border-dashed mx-2" />
				<span>{{ (cartStore.totalPrice * 0.05).toFixed(2) }} тенге</span>
			</div>
			<button
				class="bg-[#9DD458] relative flex mt-[24px] items-center justify-center w-[325px] font-semibold text-[16px] cursor-pointer rounded-[18px] p-[18px] text-white"
				@click="orderHandler"
			>
				Оформить заказ
				<img
					class="absolute right-[30px]"
					src="../../public/arrow-next.svg"
					alt="arrow-next-icon"
				/>
			</button>
		</div>
	</div>
</template>

<style>
	.drawer-enter-from {
		transform: translateX(100%);
	}
	.drawer-enter-to {
		transform: translateX(0%);
	}
	.drawer-leave-from {
		transform: translateX(0%);
	}
	.drawer-leave-to {
		transform: translateX(100%);
	}
	.drawer-enter-active,
	.drawer-leave-active {
		transition: transform 0.3s ease;
	}
</style>
