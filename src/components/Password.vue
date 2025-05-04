<script setup lang="ts">
	import { ref } from 'vue';

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const isChangedPass = ref(false);
	const isRecoverPass = ref(false);

	// Поля для изменения пароля
	const currentPassword = ref('');
	const newPassword = ref('');
	const confirmNewPassword = ref('');

	// Поле для восстановления пароля
	const recoveryEmail = ref('');

	// Сброс состояния
	function resetAll() {
		isChangedPass.value = false;
		isRecoverPass.value = false;
		currentPassword.value = '';
		newPassword.value = '';
		confirmNewPassword.value = '';
		recoveryEmail.value = '';
	}

	// Обработчики
	function handleChangePassword() {
		console.log('Изменение пароля:', {
			current: currentPassword.value,
			new: newPassword.value,
			confirm: confirmNewPassword.value,
		});
		resetAll();
	}

	function handleRecoverPassword() {
		console.log('Восстановление пароля для email:', recoveryEmail.value);
		resetAll();
	}
</script>

<template>
	<div
		@click="emit('close')"
		class="fixed top-0 z-100 left-0 right-0 bottom-0 bg-black opacity-50"
	/>
	<div
		class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 bg-white p-[50px] rounded-[20px] w-1/3 text-center"
		@click.stop
	>
		<!-- Главное меню -->
		<div v-if="!isChangedPass && !isRecoverPass">
			<h1 class="text-2xl font-semibold mb-4">Настройки пароля</h1>
			<button
				@click="isChangedPass = true"
				class="cursor-pointer block border rounded-[10px] py-[20px] w-full mt-[20px] mx-auto transition duration-300 ease-in-out hover:bg-black hover:text-white"
			>
				Изменить пароль
			</button>
			<button
				@click="isRecoverPass = true"
				class="cursor-pointer block border rounded-[10px] py-[20px] w-full mt-[20px] mx-auto transition duration-300 ease-in-out hover:bg-black hover:text-white"
			>
				Восстановить пароль
			</button>
		</div>

		<!-- Изменить пароль -->
		<div v-else-if="isChangedPass">
			<h2 class="text-xl font-semibold mb-4">Изменить пароль</h2>
			<input
				v-model="currentPassword"
				type="password"
				placeholder="Текущий пароль"
				class="border p-2 w-full mb-3 rounded-md"
			/>
			<input
				v-model="newPassword"
				type="password"
				placeholder="Новый пароль"
				class="border p-2 w-full mb-3 rounded-md"
			/>
			<input
				v-model="confirmNewPassword"
				type="password"
				placeholder="Подтвердите новый пароль"
				class="border p-2 w-full mb-5 rounded-md"
			/>
			<div class="flex justify-between gap-4">
				<button @click="resetAll" class="w-full py-2 border rounded-md hover:bg-gray-100">
					Назад
				</button>
				<button
					@click="handleChangePassword"
					class="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800"
				>
					Сохранить
				</button>
			</div>
		</div>

		<!-- Восстановить пароль -->
		<div v-else-if="isRecoverPass">
			<h2 class="text-xl font-semibold mb-4">Восстановить пароль</h2>
			<input
				v-model="recoveryEmail"
				type="email"
				placeholder="Введите ваш email"
				class="border p-2 w-full mb-5 rounded-md"
			/>
			<div class="flex justify-between gap-4">
				<button @click="resetAll" class="w-full py-2 border rounded-md hover:bg-gray-100">
					Назад
				</button>
				<button
					@click="handleRecoverPassword"
					class="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800"
				>
					Отправить
				</button>
			</div>
		</div>
	</div>
</template>
