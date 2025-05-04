<script setup lang="ts">
	import GoBack from './GoBack.vue';
</script>

<template>
	<div class="text-center m-auto flex flex-col">
		<img
			class="mb-[21px] m-auto"
			width="120px"
			src="../../public/order-success-icon.png"
			alt="order-success-icon"
		/>
		<h3 class="mb-[9px] text-[22px] font-semibold text-[#87C20A]">Заказ оформлен!</h3>
		<p class="mb-[40px] font-normal text-[16px] opacity-40">
			Ваш заказ #18 скоро будет передан курьерской доставке
		</p>
		<GoBack />
	</div>
</template>
