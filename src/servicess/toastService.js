// toastService.js
import { inject } from 'vue';

export function useToast() {
    const toast = inject('toast');
    if (!toast) {
        throw new Error('Toast instance is not available');
    }

    function showToast(message, type, title = "", options = {}) {
        const defaultOptions = {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_RIGHT,
        };

        const toastOptions = { ...defaultOptions, ...options };

        toast[type](message, toastOptions);
    }

    return {
        showToast,
    };
}