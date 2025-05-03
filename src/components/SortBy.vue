<script setup lang="ts">
	import { ref } from 'vue';

	const emit = defineEmits<{
		(e: 'sortBy', active: string): void;
		(e: 'sortDirection', sortDirection: boolean): void;
	}>();

	const isPopupOpen = ref(false);
	const sortDirection = ref(true);
	const active = ref('цене');

	function togglePopup() {
		isPopupOpen.value = !isPopupOpen.value;
	}

	function changeSortBy(event: MouseEvent) {
		const target = event.target as HTMLElement;
		active.value = target.innerText;
		emit('sortBy', active.value);
		isPopupOpen.value = false;
	}

	function changeDirection() {
		sortDirection.value = !sortDirection.value;
		emit('sortDirection', sortDirection.value);
	}
</script>

<template>
	<div class="flex items-center mb-10 gap-2">
		<div class="relative flex items-center gap-[10px]">
			Сортировка по:
			<button @click="togglePopup" class="text-[#009fff] cursor-pointer">
				{{ active }}
			</button>
			<ul
				:class="[
					'absolute z-10 top-[30px] right-0 bg-white border border-[#EAEAEA] rounded-[10px]',
					isPopupOpen ? 'block' : 'hidden',
				]"
			>
				<li
					@click="changeSortBy"
					:class="[
						'py-[10px]',
						'rounded-tr-[9px]',
						'rounded-tl-[9px]',
						'px-2',
						'cursor-pointer',
						'transition-colors duration-200',
						active === 'цене' ? 'bg-[#e7f6ff] text-[#009fff]' : 'hover:bg-gray-100 text-black',
					]"
				>
					цене
				</li>
				<li
					@click="changeSortBy"
					:class="[
						'py-[10px]',
						'rounded-br-[9px]',
						'rounded-bl-[9px]',
						'px-2',
						'cursor-pointer',
						'transition-colors duration-200',
						active === 'популярности'
							? 'bg-[#e7f6ff] text-[#009fff]'
							: 'hover:bg-gray-100 text-black',
					]"
				>
					популярности
				</li>
			</ul>
		</div>
		<div>
			<svg
				cursor="pointer"
				@click="changeDirection"
				width="40"
				height="40"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					:fill="sortDirection ? '#009fff' : '#C0C0C0'"
					d="M8 4.5C7.87 4.5 7.75 4.55 7.66 4.64L5.66 6.64C5.46 6.84 5.46 7.16 5.66 7.36C5.86 7.56 6.18 7.56 6.38 7.36L8 5.74L9.62 7.36C9.82 7.56 10.14 7.56 10.34 7.36C10.54 7.16 10.54 6.84 10.34 6.64L8.34 4.64C8.25 4.55 8.13 4.5 8 4.5Z"
				/>
				<path
					:fill="sortDirection ? '#C0C0C0' : '#009fff'"
					d="M8 11.5C8.13 11.5 8.25 11.45 8.34 11.36L10.34 9.36C10.54 9.16 10.54 8.84 10.34 8.64C10.14 8.44 9.82 8.44 9.62 8.64L8 10.26L6.38 8.64C6.18 8.44 5.86 8.44 5.66 8.64C5.46 8.84 5.46 9.16 5.66 9.36L7.66 11.36C7.75 11.45 7.87 11.5 8 11.5Z"
				/>
			</svg>
		</div>
	</div>
</template>
