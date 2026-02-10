<template>
	<Modal ref="modalRef" :width=600 :height=700 measure-width="px" measure-height="px"
	padding-set="15px" opacity-speed="0.2s">
	<div class="modal-wrapper">
		<img :src="uiStore.imageUrl + '?size=medium'" width="150" alt="">

		<div class="loading-screen" v-if="loadingScreen">
			<div class="loading-circle" v-if="!criticalError"></div>
			<div class="loading-err" v-else>
				<img src="/icons/close.png" class="icon" width="50" height="50" alt="">
			</div>
			<div class="loading-text">{{ loadingText }}</div>
			<button v-if="criticalError" style="margin-top: 30px; padding: 15px 30px;" class="button-style" @click="cancel">Close</button>
		</div>

		<div v-else class="login-form">
			<div class="image-block">
				<div class="text">
					Login with local account
				</div>
			</div>

			<div class="input-block" v-if="!userMustChangePassword">
				<InputSingle type="text" v-model="username" ref="userInputRef" :text='t("modal.login.inputs.username")' />
				<InputSingle type="password" v-model="password" ref="passInputRef" :text='t("modal.login.inputs.password")' />
			</div>

			<div class="button-block">
				<button class="button-style" @click="login">{{ t('modal.login.buttons.login') }}</button>
				<button class="button-style" @click="cancel">{{ t('modal.login.buttons.cancel') }}</button>
			</div>
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
import { useUiStore } from '../storage/ui';
import InputSingle from './InputSingle.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();
const { t } = useI18n();

const loadingScreen = ref(false);
const criticalError = ref(false);
const userMustChangePassword = ref(false);
const loadingText = ref<string>('Trying to log in...')
const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const usernameErr = ref<boolean>(false);
const passwordErr = ref<boolean>(false);

const emit = defineEmits(['close']);

const userInputRef = ref<InstanceType<typeof InputSingle> | null>(null);
const passInputRef = ref<InstanceType<typeof InputSingle> | null>(null);
const username = ref<string>('');
const password = ref<string>('');

async function cancel() {
	await modalRef.value?.closeModal();

	emit('close');
}

const login = async () => {
    let err = false;

    if (username.value === '') {
        err = true;
        userInputRef.value?.setError(true);
    }

    if (password.value === '') {
        err = true;
        passInputRef.value?.setError(true);
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
			if (err.response?.data?.detail == "USER_MUST_CHANGE_PASSWORD") {
				loadingText.value = 'You must change your password on first login.';
				userMustChangePassword.value = true;
				return;
			}

			criticalError.value = true;

			if (err.response?.data?.detail == "USER_UNAVAILABLE") {
				loadingText.value = 'Unable to load user details.';
				return;
			}

			loadingText.value = 'Unknnown error, contact administrator';
        }

        loadingText.value = 'An error occurred. Try reloading page.';
        console.error(err);
    }
};
</script>

<style lang="sass" scoped>
.modal-wrapper
	overflow: hidden
	width: 100%
	height: 100%
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	gap: 20px

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
	gap: 20px
	justify-content: center
	align-items: center
	color: var(--color)
	font-size: 18px
	margin-top: 50px

.loading-circle
	width: 50px
	height: 50px
	border: 5px solid var(--border-color)
	border-top-color: white
	border-radius: 50%
	animation: spin 1s linear infinite

.loading-text
	font-size: 24px
	font-weight: 500

.image-block
	display: flex
	flex-direction: column
	align-items: center
	gap: 20px
	color: var(--color)

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