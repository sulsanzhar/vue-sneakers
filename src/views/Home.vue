<script setup lang="ts">
	import Drawer from '../components/Drawer.vue';
	import ProductList from '../components/ProductList.vue';
	import { useCartStore } from '../store/cart';
	import { onMounted, watch } from 'vue';
	import { useSneakerStore } from '../store/sneaker';

	const cartStore = useCartStore();
	const { getItems, getFavorites, filters } = useSneakerStore();

	onMounted(async () => {
		await getItems();
		await getFavorites();
		await cartStore.getCart();
	});

	watch(filters, async () => {
		await getItems();
		await getFavorites();
		await cartStore.getCart();
	});
</script>

<template>
	<main class="container">
		<ProductList />
		<div
			v-if="cartStore.isOpenCart"
			class="fixed inset-0 z-40 bg-black opacity-50"
			@click="cartStore.onCartVisible"
		/>
		<Transition name="drawer">
			<Drawer v-if="cartStore.isOpenCart" />
		</Transition>
	</main>
</template>
