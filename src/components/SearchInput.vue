<script setup lang="ts">
	import { ref } from 'vue';
	import { debounce } from '../utils/debounce';

	const emit = defineEmits<{
		(e: 'search-value', searchValue: string): void;
	}>();

	const searchValue = ref<string>('');

	const debouncedSearch = debounce((searchValue: string) => {
		emit('search-value', searchValue);
	}, 500);

	function onInputHandler() {
		debouncedSearch(searchValue.value);
	}
</script>

<template>
	<div class="relative flex items-center">
		<input
			type="text"
			placeholder="Поиск..."
			v-model="searchValue"
			@input="onInputHandler"
			class="w-[250px] border border-[#F3F3F3] rounded-[10px] py-[14px] pl-[40px] pr-[5px] transition-[width] duration-300 ease-in-out focus:w-[400px]"
		/>
		<img class="absolute left-[15px]" src="../../public/search.svg" alt="search-icon" />
	</div>
</template>
