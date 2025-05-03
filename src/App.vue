<script setup lang="ts">
	import Header from './components/Header.vue';
	import ProductList from './components/ProductList.vue';
	import Drawer from './components/Drawer.vue';
	import { ref } from 'vue';

	const isCartOpen = ref(false);

	function onOpenCart() {
		isCartOpen.value = !isCartOpen.value;
	}

	console.log('isCartOpen', isCartOpen);
</script>
<template>
	<div class="app">
		<Header @open-cart="onOpenCart" />
		<hr class="border-[#EAEAEA] my-11" />
		<main class="container">
			<ProductList />
			<div v-if="isCartOpen" class="fixed inset-0 z-40 bg-black opacity-50" @click="onOpenCart" />
			<Transition name="drawer">
				<Drawer v-if="isCartOpen" @on-close-cart="onOpenCart" />
			</Transition>
		</main>
	</div>
</template>
