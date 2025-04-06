type ModalOptions = {
    title?: string; // Titre de la modale
    width?: string; // Largeur de la modale
    closeOnClickOutside?: boolean; // Fermer la modale en cliquant à l'extérieur
}

type ModalInterface = {
    id: string;
    component: unknown; // Composant de la modale
    props: Record<string, unknown>; // Propriétés à passer au composant
    options: ModalOptions
}


export const useModal = () => {
    // État des modales
    const modals = useState<ModalInterface[]>('modals', () => []);

    // Ouvrir une modale
    const openModal = (component: unknown, props: Record<string, unknown> = {}, options: ModalOptions = {}) => {
        const id = Date.now().toString();

        modals.value.push({
            id,
            component,
            props,
            options: {
                title: options.title || '',
                width: options.width || 'md',
                closeOnClickOutside: options.closeOnClickOutside !== false,
                ...options
            }
        });

        return id;
    };

    // Fermer une modale spécifique
    const closeModal = (id: string) => {
        modals.value = modals.value.filter(modal => modal.id !== id);
    };

    // Fermer toutes les modales
    const closeAll = () => {
        modals.value = [];
    };

    return {
        modals,
        openModal,
        closeModal,
        closeAll
    };
};