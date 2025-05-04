<script setup lang="ts">
	import { useCartStore } from '../store/cart';
	import type { TSneaker } from '../types/sneaker';

	const { removeFromCart } = useCartStore();

	defineProps<{ sneaker: TSneaker }>();
</script>

<template>
	<div class="flex border border-[#F3F3F3] rounded-[20px] p-[20px]">
		<img class="mr-[21px]" width="70" height="70" :src="sneaker.imageUrl" alt="sneaker-icon" />

		<div class="flex justify-between flex-1">
			<div class="mr-[12px] space-y-[8px]">
				<p>{{ sneaker.title }}</p>
				<p>{{ sneaker.price }} ₸</p>
			</div>

			<img
				@click="removeFromCart(sneaker)"
				class="w-[32px] h-[32px] self-end cursor-pointer"
				src="../../public/close.svg"
				alt="close-icon"
			/>
		</div>
	</div>
</template>
