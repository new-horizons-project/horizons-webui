<template>
	<Modal ref="modalRef" :width=600 :height=600 measure-width="px" measure-height="px"
	padding-set="15px" opacity-speed="0.2s">
	<div class="modal-wrapper">
		<img :src="uiStore.imageUrl + '?size=medium'" width="150" alt="">

		<div class="loading-screen" v-if="loadingScreen">
			<div class="loading-circle" v-if="!criticalError"></div>
			<div class="loading-err" v-else-if="criticalError">
				<img src="/icons/close.png" class="icon" width="50" height="50" alt="">
			</div>
			<div class="loading-text">{{ loadingText }}</div>
			<button v-if="criticalError" style="margin-top: 30px; padding: 15px 30px;" class="button-style" @click="cancel">Close</button>
		</div>

		<div v-else class="login-form">
			<div class="image-block">
				<div class="text">
					{{ currentText }}
				</div>
			</div>

			<div class="input-block">
				<InputSingle type="text" v-model="username" ref="userInputRef" :small="false" :text='t("modal.login.inputs.username")' />
				<InputSingle type="password" v-model="password" ref="passInputRef" :small="false" :text='t("modal.login.inputs.password")' />
				<InputSingle ref="newPass1InputRef" v-if="userMustChangePassword" type="password" v-model="newPass1" :small="false" text='New Password' />
				<InputSingle ref="newPass2InputRef" v-if="userMustChangePassword" type="password" v-model="newPass2" :small="false" text='Retype New Password' />
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
import { loginUser, User, changePassword } from '../api/user';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '../storage/ui';
import InputSingle from './InputSingle.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();
const { t } = useI18n();

const loadingScreen = ref(false);
const criticalError = ref(false);
const userMustChangePassword = ref(false);
const loadingText = ref<string>('Trying to log in...');
const currentText = ref<string>('Login with local account');
const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const emit = defineEmits(['close']);

const userInputRef = ref<InstanceType<typeof InputSingle> | null>(null);
const passInputRef = ref<InstanceType<typeof InputSingle> | null>(null);
const newPass1InputRef = ref<InstanceType<typeof InputSingle> | null>(null);
const newPass2InputRef = ref<InstanceType<typeof InputSingle> | null>(null);
const username = ref<string>('');
const password = ref<string>('');
const newPass1 = ref<string>('');
const newPass2 = ref<string>('');

async function cancel() {
	await modalRef.value?.closeModal();

	emit('close');
}

const checkValues = () => {
	let err = false;

    if (username.value === '') {
        err = true;
        userInputRef.value?.setError(true);
    }

    if (password.value === '') {
        err = true;
        passInputRef.value?.setError(true);
    }

	if (userMustChangePassword.value) {
		if (newPass1.value === '') {
			err = true;
			newPass1InputRef.value?.setError(true);
		}

		if (newPass2.value === '') {
			newPass2InputRef.value?.setError(true);
			err = true;
		}

		if (newPass2.value !== newPass1.value) {
			newPass2InputRef.value?.setError(true);
			err = true;
		}
	}

    return err;
}


// Rework!!!
const runChangePassword = async () => {
	loadingScreen.value = true;
	loadingText.value = "Changing password..."
	
	try {
		const res = await changePassword(username.value, password.value, newPass1.value);

		if (res.status === 200) {
			password.value = newPass1.value;
			return true;
        }
	} catch (err: any) {
        if (err.status === 400 || err.status === 401 || err.status === 404) {
            loadingScreen.value = false;
            return false;
        }

		if (err.status === 422 || err.status === 405) {
			criticalError.value = true;
			loadingText.value = "Critical error, contact administrator"
			return false;
		}
	}
}

const login = async () => {
	if (checkValues()) {
		return;
	}

	if (userMustChangePassword.value) {
		const res = await runChangePassword();

		if (!res) {
			userInputRef.value?.setError(true);
			passInputRef.value?.setError(true);
			newPass1InputRef.value?.setError(true);
			newPass2InputRef.value?.setError(true);
			return;
		}
	}

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
			userInputRef.value?.setError(true);
			passInputRef.value?.setError(true);
            return;
        }

        if (err.status === 403) {
			if (err.response?.data?.detail == "USER_MUST_CHANGE_PASSWORD") {
				currentText.value = 'You must change your password';
				userMustChangePassword.value = true;
				loadingScreen.value = false;
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
	flex: 1 1 auto
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