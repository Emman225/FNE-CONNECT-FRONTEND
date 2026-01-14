import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/**
 * Premium SweetAlert utility for the platform
 */
export const showAlert = {
    success: (title, text) => {
        return MySwal.fire({
            icon: 'success',
            title: title || 'Succès',
            text: text,
            confirmButtonColor: 'var(--primary)',
            customClass: {
                popup: 'premium-swal-popup',
                title: 'premium-swal-title',
                confirmButton: 'premium-swal-button'
            }
        });
    },
    error: (title, text) => {
        return MySwal.fire({
            icon: 'error',
            title: title || 'Erreur',
            text: text,
            confirmButtonColor: 'var(--danger)',
            customClass: {
                popup: 'premium-swal-popup',
                title: 'premium-swal-title'
            }
        });
    },
    warning: (title, text) => {
        return MySwal.fire({
            icon: 'warning',
            title: title || 'Attention',
            text: text,
            confirmButtonColor: 'var(--secondary)',
            customClass: {
                popup: 'premium-swal-popup',
                title: 'premium-swal-title'
            }
        });
    },
    confirm: (title, text, confirmText = 'Confirmer', cancelText = 'Annuler') => {
        return MySwal.fire({
            title: title || 'Êtes-vous sûr ?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--danger)',
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            reverseButtons: true,
            customClass: {
                popup: 'premium-swal-popup',
                title: 'premium-swal-title',
                confirmButton: 'premium-swal-button',
                cancelButton: 'premium-swal-cancel-button'
            }
        });
    },
    prompt: (title, text, placeholder = '', confirmText = 'Valider') => {
        return MySwal.fire({
            title: title,
            text: text,
            input: 'text',
            inputPlaceholder: placeholder,
            showCancelButton: true,
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--danger)',
            confirmButtonText: confirmText,
            cancelButtonText: 'Annuler',
            reverseButtons: true,
            customClass: {
                popup: 'premium-swal-popup',
                title: 'premium-swal-title',
                confirmButton: 'premium-swal-button',
                cancelButton: 'premium-swal-cancel-button'
            }
        });
    },
    loading: (title, text) => {
        return MySwal.fire({
            title: title || 'Chargement',
            text: text || 'Veuillez patienter...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                MySwal.showLoading();
            },
            customClass: {
                popup: 'premium-swal-popup',
                title: 'premium-swal-title'
            }
        });
    }
};

export default showAlert;
