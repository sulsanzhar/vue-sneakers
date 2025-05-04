<script setup lang="ts">
	import { ref } from 'vue';

	type TPerson = {
		name: string;
		surname: string;
		email: string;
		image: string;
	};

	const props = defineProps<TPerson>();

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const isChangedClicked = ref(false);
	const downloadedImg = ref<string | null>(null);
	const imageInput = ref<HTMLInputElement | null>(null);

	const person = ref({
		name: props.name,
		surname: props.surname,
		email: props.email,
		image: props.image,
		file: null as File | null,
	});

	const openFileDialog = () => {
		imageInput.value?.click();
	};

	const onFileChange = (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;
		const imageUrl = URL.createObjectURL(file);
		downloadedImg.value = imageUrl;
		person.value.image = imageUrl;
		person.value.file = file;
	};

	const onSaveHandler = () => {
		console.log('Saved person:', person.value);
		isChangedClicked.value = false;

		if (downloadedImg.value) {
			person.value.image = downloadedImg.value;
			downloadedImg.value = null;
		}
	};
</script>

<template>
	<div
		@click="emit('close')"
		class="fixed top-0 z-100 left-0 right-0 bottom-0 bg-[black] opacity-50"
	/>

	<div
		class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 bg-white p-[50px] rounded-[20px] w-1/3 text-center"
		@click.stop
	>
		<div v-if="!isChangedClicked" class="space-y-[20px]">
			<div class="flex justify-center items-center gap-2">
				<img
					width="100px"
					class="rounded-full"
					:src="person.image || '/profile.svg'"
					alt="profile"
				/>
				<div>
					<h3 class="flex gap-3"><span class="flex text-right">Имя: </span>{{ person.name }}</h3>
					<h3 class="flex gap-3">
						<span class="flex text-right">Фамилия: </span>{{ person.surname }}
					</h3>
				</div>
			</div>
			<p>{{ person.email }}</p>
		</div>

		<div v-else class="flex flex-wrap gap-5">
			<div @click="openFileDialog" class="m-auto cursor-pointer">
				<img
					width="120px"
					class="rounded-full"
					:src="downloadedImg || person.image || '/edit-photo-icon.jpg'"
					alt="edit-photo-icon"
				/>
				<input class="hidden" ref="imageInput" type="file" @change="onFileChange" />
			</div>

			<label class="flex justify-center items-center flex-1">
				<p class="text-left w-[100px]">Имя</p>
				<input
					class="p-[10px] rounded-[5px] border border-[#a8a8a8d7]"
					placeholder="name..."
					v-model="person.name"
					type="text"
				/>
			</label>
			<label class="flex justify-center items-center flex-1">
				<p class="text-left w-[100px]">Фамилия</p>
				<input
					class="p-[10px] rounded-[5px] border border-[#a8a8a8d7]"
					placeholder="surname..."
					v-model="person.surname"
					type="text"
				/>
			</label>
			<label class="flex justify-center items-center flex-1">
				<p class="text-left w-[100px]">Email</p>
				<input
					class="p-[10px] rounded-[5px] border border-[#a8a8a8d7]"
					placeholder="email..."
					v-model="person.email"
					type="text"
				/>
			</label>
		</div>

		<div class="flex justify-center gap-[20px] mt-[30px]">
			<button
				v-if="!isChangedClicked"
				class="transition-all duration-300 bg-[#009fff] hover:bg-[#007acc] hover:shadow-lg hover:scale-105 text-white cursor-pointer py-[10px] w-[100px] rounded-[5px]"
				@click="isChangedClicked = true"
			>
				Изменить
			</button>

			<button
				v-else
				class="transition-all duration-300 bg-[#009fff] hover:bg-[#007acc] hover:shadow-lg hover:scale-105 text-white cursor-pointer py-[10px] w-[100px] rounded-[5px]"
				@click="onSaveHandler"
			>
				Сохранить
			</button>

			<button
				class="transition-all duration-300 bg-[#c62121] hover:bg-[#a31818] hover:shadow-lg hover:scale-105 text-white cursor-pointer py-[10px] w-[100px] rounded-[5px]"
				@click="emit('close')"
			>
				Выйти
			</button>
		</div>
	</div>
</template>
