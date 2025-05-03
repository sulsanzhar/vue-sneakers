<script setup lang="ts">
	import Header from './components/Header.vue';
</script>
<template>
	<div class="app">
		<Header />
		<hr class="border-[#EAEAEA] my-11" />
		<router-view />
	</div>
</template>
