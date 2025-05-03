<script setup lang="ts">
	import { useCartStore } from '../store/cart';
	import CartItem from './CartItem.vue';
	import GoBack from '../components/GoBack.vue';

	const { cart, totalPrice, onCartVisible } = useCartStore();
</script>

<template>
	<div
		class="fixed top-0 right-0 z-50 h-full w-[385px] bg-white shadow-[-10px_4px_24px_0px_#0000001A] p-[30px]"
	>
		<div class="flex items-center gap-[10px] mb-[30px]">
			<img
				v-show="cart.length"
				@click="onCartVisible"
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
		<div :class="['space-y-[20px]', 'h-[70%]', 'overflow-y-auto', !cart.length && 'flex ']">
			<CartItem v-for="item in cart" :sneaker="item" />
			<div v-show="!cart.length" class="text-center m-auto flex flex-col">
				<img
					class="mb-[21px] m-auto"
					width="120px"
					src="../../public/package-icon.png"
					alt="package-icon"
				/>
				<h3 class="mb-[9px] font-semibold text-[22px]">Корзина пустая</h3>
				<p class="mb-[40px] font-normal text-[16px] opacity-40">
					Добавьте хотя бы одну пару <br />
					кроссовок, чтобы сделать заказ.
				</p>
				<GoBack />
			</div>
		</div>
		<div v-show="cart.length" class="flex flex-col self-end">
			<div class="flex items-end">
				<span class="relative">Итого:</span>
				<span class="flex-1 mb-[6px] border-b border-[#DFDFDF] border-dashed mx-2" />
				<span>{{ totalPrice }} тенге</span>
			</div>
			<div class="flex items-end mt-[19px]">
				<span class="relative">Налог 5%:</span>
				<span class="flex-1 mb-[6px] border-b border-[#DFDFDF] border-dashed mx-2" />
				<span>{{ totalPrice * 0.05 }} тенге</span>
			</div>
			<button
				class="bg-[#9DD458] relative flex mt-[24px] items-center justify-center w-[325px] font-semibold text-[16px] cursor-pointer rounded-[18px] p-[18px] text-white"
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
