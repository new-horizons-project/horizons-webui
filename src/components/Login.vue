<template>
	<Modal ref="modalRef" :width=600 :height=700 measure-width="px" measure-height="px"
	padding-set="15px" opacity-speed="0.2s">
		<img src="http://127.0.0.1:8000/static/1?size=small" width="150" alt="">

		<div class="loading-screen" v-if="loadingScreen">
			<div class="loading-circle"></div>
			<div class="loading-text">{{ loadingText }}</div>
		</div>

		<div v-else class="login-form">
			<div class="image-block">
				<div class="text">
					Login with local account
				</div>
			</div>

			<div class="input-block" v-if="!userMustChangePassword">
				<div class="input" :class="{ error: usernameErr }">
					<div class="placeholder">{{ t('modal.login.inputs.username') }}</div>
					<input type="text" placeholder=" " @focus="usernameErr = false"
						v-model="username" />
				</div>

				<div class="input" :class="{ error: passwordErr }">
					<div class="placeholder">{{ t('modal.login.inputs.password') }}</div>
					<input type="password" @focus="passwordErr = false"
						v-model="password" placeholder=" " />
				</div>
			</div>

			<div class="button-block">
				<button class="button-style" @click="login">{{ t('modal.login.buttons.login') }}</button>
				<button class="button-style" @click="cancel">{{ t('modal.login.buttons.cancel') }}</button>
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
	justify-content: space-around
	align-items: center
	gap: 40px

.loading-screen
	inset: 0
	display: flex
	flex-direction: column
	gap: 50px
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
	text-align: center

.input-block
	width: 85%
	display: flex
	flex-direction: column
	gap: 15px

.error
	border-bottom-color: rgb(153, 52, 52) !important
	animation: shake 0.3s ease

.input
	border: 1px solid var(--border-color)
	border-radius: 15px
	font-size: 16px
	padding-top: 15px
	color: white
	outline: none
	transition: border-color 0.3s, transform 0.15s
	position: relative

	.placeholder
		position: absolute
		left: 10px
		top: 50%
		transform: translateY(-50%)
		user-select: none
		color: rgba(255, 255, 255, 0.5)
		transition: transform 0.15s, font-size 0.15s, opacity 0.15s
		pointer-events: none
		z-index: 1

	input
		z-index: 2
		font-size: 15px
		padding: 10px 10px
		width: 100%
		border: none
		background: none
		color: inherit
		outline: none

	&:hover
		border-color: rgba(255, 255, 255, 0.3)

	&:focus-within
		border-color: rgba(255, 255, 255, 0.3)
		color: rgba(255, 255, 255, 0.9)
		
	&:focus-within .placeholder, &:has(input:not(:placeholder-shown)) .placeholder
		transform: translateY(-120%)
		font-size: 13px
		opacity: 0.8

	&.error 
		border-color: rgb(170, 50, 50)

.button-block 
	display: flex
	gap: 10px

	button
		padding: 10px 24px
		cursor: pointer
		font-size: 16px
		font-weight: 500

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