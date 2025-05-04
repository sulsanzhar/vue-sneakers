<script setup lang="ts">
	import { ref } from 'vue';
	import { useCartStore } from '../store/cart';
	import { RouterLink } from 'vue-router';
	import ProfileModal from '../components/ProfileModal.vue';

	const cartStore = useCartStore();

	const isOpen = ref(false);
	const isProfileOpen = ref(false);
</script>
<template>
	<header class="header flex items-center justify-between pt-11 pl-11 pr-[60px]">
		<RouterLink to="/" class="flex items-center gap-[16px]">
			<img width="40px" src="/logo.png" alt="Logo" />
			<div>
				<h2 class="text-xl font-bold">VUE SNEAKERS</h2>
				<p class="text-gray-500">Магазин лучших кроссовок</p>
			</div>
		</RouterLink>
		<div class="flex items-center gap-[32px]">
			<button
				@click="cartStore.onCartVisible()"
				class="flex gap-2.5 cursor-pointer items-center text-gray-500 hover:text-black"
			>
				<img src="../../public/cart.svg" alt="cart-img" />
				<p>{{ cartStore.totalPrice }} тг</p>
			</button>
			<RouterLink
				to="/wishlist"
				class="flex gap-2.5 cursor-pointer items-center text-gray-500 hover:text-black"
			>
				<img src="../../public/heart.svg" alt="heart-img" />
				<p>Закладки</p>
			</RouterLink>
			<RouterLink
				to="/orders"
				class="flex gap-2.5 cursor-pointer text-gray-500 items-center hover:text-black"
			>
				<img width="28px" color="gray" src="../../public/order-icon.svg" alt="order-icon" />
				<p>Заказы</p>
			</RouterLink>
			<div class="relative">
				<button
					@click="isOpen = !isOpen"
					class="flex gap-2.5 cursor-pointer items-center text-gray-500 hover:text-black"
				>
					<img width="25px" src="../../public/settings-icon.svg" alt="profile-img" />
					<p>Settings</p>
				</button>
				<ul
					v-if="isOpen"
					class="absolute z-10 top-[30px] right-0 bg-white border border-[#EAEAEA] rounded-[10px] py-[10px] px-[20px]"
				>
					<li
						class="cursor-pointer"
						@click="
							isProfileOpen = !isProfileOpen;
							isOpen = !isOpen;
						"
					>
						Профиль
					</li>
					<li>Выйти</li>
				</ul>
			</div>
		</div>
	</header>
	<ProfileModal
		v-if="isProfileOpen"
		@close="isProfileOpen = false"
		name="Sanzhar"
		surname="Sultanov"
		email="sulsanzhar@mail.ru"
		image=""
	/>
</template>
