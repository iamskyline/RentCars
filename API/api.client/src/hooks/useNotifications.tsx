import { toast } from 'react-toastify';

export function addErrorNotification(error: string) {
    toast.error(error);
}

export function addSuccessNotification(message: string) {
    toast.success(message);
}

export function clearNotifications() {
    return toast.clearWaitingQueue()

}