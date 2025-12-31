import { reactive } from 'vue';

export interface Notification {
    id: string;
    header: string;
    message: string;
    type?: 'success' | 'error' | 'info';
    src?: string;
}

class NotificationController {
    state = reactive<{ all: Notification[] }>({ all: [] });

    createNotification(header: string, message: string, src?: string, type?: 'success' | 'error' | 'info') {
        const id = Date.now().toString() + Math.random().toString(36).slice(2, 7);
        this.state.all.push({ id, header, message, src, type });
    }

    removeNotification(id: string) {
        const index = this.state.all.findIndex(n => n.id === id);

        if (index !== -1) {
			this.state.all.splice(index, 1);
		}
    }

    get all() {
        return this.state.all;
    }
}

export const notificationController = new NotificationController();
