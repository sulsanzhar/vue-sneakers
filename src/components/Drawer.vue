<script setup lang="ts">
	import { useCartStore } from '../store/cart';
	import CartItem from './CartItem.vue';

	const { cart } = useCartStore();

	console.log('cart from drawer: ', cart);
	const emit = defineEmits<{ (e: 'onCloseCart'): void }>();
</script>

<template>
	<div
		class="fixed top-0 right-0 z-50 h-full w-[385px] bg-white shadow-[-10px_4px_24px_0px_#0000001A] p-[30px]"
	>
		<div class="flex items-center gap-[10px] mb-[30px]">
			<img
				@click="emit('onCloseCart')"
				class="cursor-pointer rotate-180 py-[12px] px-[14px] border border-[#F2F2F2] rounded-[8px]"
				src="../../public/arrow-right.svg"
				alt="close"
			/>
			<h2 class="text-[24px] font-bold">Корзина</h2>
		</div>
		<div class="space-y-[20px] h-[60%] overflow-y-auto">
			<CartItem v-for="item in cart" :sneaker="item" />
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
