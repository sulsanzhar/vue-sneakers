<script setup lang="ts">
	import GoBack from './GoBack.vue';
</script>

<template>
	<div class="text-center m-auto flex flex-col">
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
</template>
