<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps<{
		totalPages: number;
		currentPage: number;
	}>();

	const emit = defineEmits(['change-page']);

	// Количество страниц, которые нужно показывать
	const visiblePages = 5;

	const pages = computed(() => {
		let startPage = Math.max(1, props.currentPage - Math.floor(visiblePages / 2));
		let endPage = Math.min(props.totalPages, startPage + visiblePages - 1);

		// Если startPage не вмещает все страницы, сдвигаем endPage
		if (endPage - startPage < visiblePages - 1) {
			startPage = Math.max(1, endPage - visiblePages + 1);
		}

		const visiblePagesArr = [];

		// Добавляем страницы
		for (let i = startPage; i <= endPage; i++) {
			visiblePagesArr.push(i);
		}

		return visiblePagesArr;
	});

	const showPrevEllipsis = computed(() => pages.value[0] > 1);
	const showNextEllipsis = computed(() => pages.value[pages.value.length - 1] < props.totalPages);

	// Функция для проверки, если текущая страница первая, последняя или на одной из крайних страниц
	const isFirstPage = computed(() => props.currentPage === 1);
	const isLastPage = computed(() => props.currentPage === props.totalPages);
	const isBeforeLastPage = computed(() => props.currentPage === props.totalPages - 1);
	const isBeforeBeforeLastPage = computed(() => props.currentPage === props.totalPages - 2);
	const isSecondPage = computed(() => props.currentPage === 2);
	const isThirdPage = computed(() => props.currentPage === 3);
</script>

<template>
	<div class="flex justify-center mt-10 gap-2">
		<!-- Кнопка "Первая страница" -->
		<button
			v-if="!isFirstPage && !isSecondPage && !isThirdPage"
			:disabled="props.currentPage === 1"
			@click="$emit('change-page', 1)"
			class="px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-blue-400"
		>
			1
		</button>

		<!-- Многоточие, если нужно -->
		<button
			v-if="showPrevEllipsis && !isFirstPage && !isSecondPage && !isThirdPage"
			@click="$emit('change-page', pages.value[0] - 1)"
			class="px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-blue-400"
		>
			...
		</button>

		<!-- Страницы -->
		<button
			v-for="page in pages"
			:key="page"
			:disabled="page === props.currentPage"
			@click="$emit('change-page', page)"
			:class="[
				'px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200',
				page === props.currentPage
					? 'bg-blue-600 text-white border-blue-600'
					: 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-blue-400',
				page === props.currentPage ? 'cursor-default' : 'cursor-pointer',
			]"
		>
			{{ page }}
		</button>

		<!-- Многоточие, если нужно -->
		<button
			v-if="showNextEllipsis && !isLastPage && !isBeforeLastPage"
			@click="$emit('change-page', pages.value[pages.value.length - 1] + 1)"
			class="px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-blue-400"
		>
			...
		</button>

		<!-- Кнопка "Последняя страница" -->
		<button
			v-if="!isLastPage && !isBeforeLastPage"
			:disabled="props.currentPage === props.totalPages"
			@click="$emit('change-page', props.totalPages)"
			class="px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-blue-400"
		>
			{{ props.totalPages }}
		</button>
	</div>
</template>
