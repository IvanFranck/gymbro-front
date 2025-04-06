type ToastType = 'success' | 'error' | 'warning' | 'info'

type ToastInterface = {
    id: string;
    message: string;
    type: ToastType;
    timeout: number;
}

export const useToast = () => {
    // État des toasts
    const toasts = useState<ToastInterface[]>('toasts', () => []);

    // Ajouter un toast
    const addToast = (message: string, type: ToastType = 'success', timeout = 5000) => {
        const id = Date.now().toString();

        // Ajouter le toast à la liste
        toasts.value.push({
            id,
            message,
            type,
            timeout
        });

        // Supprimer le toast après le délai
        if (timeout > 0) {
            setTimeout(() => {
                removeToast(id);
            }, timeout);
        }

        return id;
    };

    // Supprimer un toast
    const removeToast = (id: string) => {
        toasts.value = toasts.value.filter(toast => toast.id !== id);
    };

    // Fonctions pour les différents types de toasts
    const success = (message: string, timeout: number) => addToast(message, 'success', timeout);
    const error = (message: string, timeout: number) => addToast(message, 'error', timeout);
    const warning = (message: string, timeout: number) => addToast(message, 'warning', timeout);
    const info = (message: string, timeout: number) => addToast(message, 'info', timeout);

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
    };
};