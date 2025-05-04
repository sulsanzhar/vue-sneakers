<script setup lang="ts">
	import { defineProps } from 'vue';
	import type { TSneaker } from '../types/sneaker';

	defineProps<{ sneaker: TSneaker }>();

	const emit = defineEmits<{
		'on-added': [sneaker: TSneaker];
		'on-liked': [sneaker: TSneaker];
		'on-removed': [sneaker: TSneaker];
	}>();
</script>

<template>
	<div
		:class="[
			'product-card',
			'cursor-pointer',
			'border',
			'rounded-[40px]',
			'border-[#F8F8F8]',
			'bg-white',
			'pt-[20px]',
			'pr-[29px]',
			'pb-[34px]',
			'pl-[33px]',
			'w-[210px]',
			'h-[260px]',
			'space-y-[14px]',
			'hover:sca',
			'transition-transform duration-300 hover:-translate-y-[5px]',
			sneaker.isAdded && 'border-[#F8F8F8] shadow-[0px_14px_30px_0px_#0000000D] -translate-y-[5px]',
		]"
	>
		<div class="relative">
			<img width="133px" height="112px" :src="sneaker.imageUrl" alt="sneakers-photo" />
			<img
				class="absolute top-0 left-0 cursor-pointer"
				:src="sneaker.isLiked ? 'public/like-2.svg' : 'public/like-1.svg'"
				@click="emit('on-liked', sneaker)"
				alt="like-icon"
			/>
		</div>
		<p class="font-normal text-sm">{{ sneaker.title }}</p>
		<div class="flex justify-between">
			<p class="flex flex-col text-[#BDBDBD] text-[11px]">
				ЦЕНА:
				<span class="font-bold text-black text-sm">{{ sneaker.price }} тг.</span>
			</p>
			<button class="cursor-pointer">
				<img
					:src="sneaker.isAdded ? 'public/checked.svg' : 'public/plus.svg'"
					@click="!sneaker.isAdded ? emit('on-added', sneaker) : emit('on-removed', sneaker)"
					alt="plus-icon"
				/>
			</button>
		</div>
	</div>
</template>
