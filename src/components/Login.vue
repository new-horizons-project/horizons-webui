<template>
	<Modal ref="modalRef" :width=55 :height=450 measure-width="%" measure-height="px"
	padding-set="35px" opacity-speed="0.2s" :max-width="700">
		<img src="http://127.0.0.1:8000/static/1?size=small" width="150" alt="">

		<div class="loading-screen" v-if="loadingScreen">
			<div class="loading-circle"></div>
			<div class="loading-text">{{ loadingText }}</div>
		</div>

		<div v-else class="login-form">
			<div class="image-block">
				<div class="text">
					New Horizons Project
				</div>
			</div>

			<div class="input-block" v-if="!userMustChangePassword">
				<input type="text" :class="{ error: usernameErr }" @focus="usernameErr = false"
					v-model="username" :placeholder="t('modal.login.inputs.username')" />
				<input type="password" :class="{ error: passwordErr }" @focus="passwordErr = false"
					v-model="password" :placeholder="t('modal.login.inputs.password')" />
			</div>

			<div class="button-block">
				<button @click="login">{{ t('modal.login.buttons.login') }}</button>
				<button @click="cancel">{{ t('modal.login.buttons.cancel') }}</button>
			</div>
		</div>
	</Modal>
</template>

<script lang="ts" setup>
import Modal from './Modal.vue';
import { ref } from 'vue';
import { useAuthStore } from '../storage/auth';
import { loginUser, User } from '../api/user';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();
const { t } = useI18n();

const loadingScreen = ref(false);
const userMustChangePassword = ref(false);
const username = ref<string>('')  
const password = ref<string>('')
const loadingText = ref<string>('Trying to log in...')

const usernameErr = ref<boolean>(false);
const passwordErr = ref<boolean>(false);

const emit = defineEmits(['close']);

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

function cancel() {
	emit('close');
}

const login = async () => {
    let err = false;

    if (username.value === '') {
        err = true;
        usernameErr.value = true;
    }

    if (password.value === '') {
        err = true;
        passwordErr.value = true;
    }

    if (err) return;

    loadingScreen.value = true;

    try {
        const res = await loginUser(username.value, password.value);

        if (res.status === 200) {
            loadingText.value = 'Setting up credentials...';
            authStore.token = res.data.access_token;
			authStore.user = await User.create();
			authStore.isLoggedIn = true;

            await modalRef.value?.closeModal();

            emit('close');
        }
    } catch (err: any) {
        if (err.status === 400 || err.status === 401 || err.status === 404) {
            loadingScreen.value = false;
            passwordErr.value = true;
            usernameErr.value = true;
            return;
        }

        if (err.status === 403) {
            loadingText.value = 'You must change your password on first login.';
            userMustChangePassword.value = true;
            return;
        }

        loadingText.value = 'An error occurred. Try reloading page.';
        console.error(err);
    }
};
</script>

<style lang="sass" scoped>
.login-form
	width: 100%
	display: flex
	flex-direction: column
	align-items: center
	gap: 10px

.loading-screen
	inset: 0
	display: flex
	flex-direction: column
	gap: 100px
	justify-content: center
	align-items: center
	color: white
	font-size: 18px
	margin-top: 50px

.loading-circle
	width: 50px
	height: 50px
	border: 5px solid rgba(255, 255, 255, 0.3)
	border-top-color: white
	border-radius: 50%
	animation: spin 1s linear infinite

.loading-text
	font-size: 24px
	font-weight: 500

.subblur
	position: absolute
	inset: 0
	display: flex
	justify-content: center
	align-items: center
	background: rgba(0, 0, 0, 0.4)
	backdrop-filter: blur(5px)
	z-index: 1000

.image-block
	display: flex
	flex-direction: column
	align-items: center
	gap: 20px
	color: rgb(210, 210, 210)

		img:
			width: 150px
			height: auto
			object-fit: contain
			opacity: 0
			transform: scale(0.95)
			animation: imageAppear 0.8s ease forwards 0.2s

.text
	font-size: 28px
	font-weight: 600

.input-block
	width: 80%
	display: flex
	flex-direction: column
	gap: 25px
	margin-top: 10px

.error
	border-bottom-color: rgb(153, 52, 52) !important
	animation: shake 0.3s ease

input
	background: transparent
	border: none
	border-bottom: 2px solid rgba(255, 255, 255, 0.3)
	padding: 10px
	font-size: 16px
	color: white
	outline: none
	transition: border-color 0.3s, transform 0.15s

	&:hover
		border-bottom-color: rgba(255, 255, 255, 0.5)

	&:focus
		border-bottom-color: white
		transform: scale(1.02)

	&::placeholder
		color: rgba(255, 255, 255, 0.5)

.button-block 
	display: flex
	gap: 10px

	button
		margin-top: 30px
		padding: 8px 24px
		background: transparent
		border: 2px solid rgba(255, 255, 255, 0.3)
		border-radius: 5px
		width: 100px;
		color: white
		font-size: 16px
		cursor: pointer
		transition: border-color 0.2s, transform 0.15s, color 0.2s, background-color 0.2s

		&:hover
			border-color: white
			background-color: rgba(255, 255, 255, 0.109)
			transform: translateY(-2px)

		&:active
			transform: translateY(1px)
			color: rgb(200, 200, 200)

@media (max-width: 1000px)
	.form-background-block
		width: 90%
		max-height: 555px
		height: 80%

@keyframes appear
	to
		opacity: 1
		transform: translateY(0)

@keyframes imageAppear
	to
		opacity: 1
		transform: scale(1)

@keyframes spin
	to
		transform: rotate(360deg)

@keyframes shake
	0%, 100%
		transform: translateX(0)
	25%
		transform: translateX(-5px)
	50%
		transform: translateX(5px)
	75%
		transform: translateX(-5px)
</style>