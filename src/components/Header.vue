<script setup lang="ts">
	import { useCartStore } from '../store/cart';

	const cartStore = useCartStore();
</script>
<template>
	<header class="header flex items-center justify-between pt-11 pl-11 pr-[60px]">
		<div class="flex items-center gap-[16px]">
			<img width="40px" src="/logo.png" alt="Logo" />
			<div>
				<h2 class="text-xl font-bold">VUE SNEAKERS</h2>
				<p class="text-gray-500">Магазин лучших кроссовок</p>
			</div>
		</div>
		<div class="flex items-center gap-[32px]">
			<button
				@click="cartStore.onCartVisible()"
				class="flex gap-2.5 cursor-pointer text-gray-500 hover:text-black"
			>
				<img src="../../public/cart.svg" alt="cart-img" />
				<p>{{ cartStore.totalPrice }} тг</p>
			</button>
			<button class="flex gap-2.5 cursor-pointer text-gray-500 hover:text-black">
				<img src="../../public/heart.svg" alt="heart-img" />
				<p>Закладки</p>
			</button>
			<button class="flex gap-2.5 cursor-pointer text-gray-500 hover:text-black">
				<img src="../../public/profile.svg" alt="profile-img" />
				<p>Профиль</p>
			</button>
		</div>
	</header>
</template>
