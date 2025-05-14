import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formatage de la date relative
export const formatRelativeDate = (dateString: string) => {
    try {
        if (!dateString) return 'N/A';

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Date invalide';

        return formatDistanceToNow(date, {
            addSuffix: true,
            locale: fr
        });
    } catch (error) {
        console.error('Erreur de formatage de date:', error);
        return 'N/A';
    }
};

export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm', { locale: fr });
};