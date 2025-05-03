<script setup lang="ts">
	import { useCartStore } from '../store/cart';

	const { onCartVisible } = useCartStore();
</script>

<template>
	<button @click="onCartVisible" class="relative block cursor-pointer w-[245px] m-auto">
		<div class="bg-[#9DD458] py-[18px] text-center text-white rounded-[18px]">Вернуться назад</div>
		<img
			class="absolute left-[35px] top-1/2 -translate-y-1/2 rotate-180"
			src="../../public/arrow-next.svg"
			alt="arrow"
		/>
	</button>
</template>
