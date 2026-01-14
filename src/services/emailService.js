import emailjs from '@emailjs/browser';

/**
 * Service pour la gestion des envois d'e-mails réels via EmailJS
 * Pour configurer ce service :
 * 1. Créer un compte sur https://www.emailjs.com/
 * 2. Ajouter un "Email Service" (ex: Gmail)
 * 3. Créer un "Email Template"
 * 4. Remplacer les clés ci-dessous par vos propres identifiants
 */

const EMAILJS_SERVICE_ID = 'service_fneconnect';
const EMAILJS_TEMPLATE_ID = 'template_f2wc1t8';
const EMAILJS_PUBLIC_KEY = 'kzv_D0HWvA8nHKA5m';

// Initialisation explicite de EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const emailService = {
    /**
     * Envoie un e-mail réel au destinataire
     * @param {Object} params Paramètres de l'e-mail
     */
    sendEmail: async (params) => {
        try {
            console.log('Sending email with params:', params); // Debug log

            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    to_email: params.recipientEmail,     // Clé standard
                    email: params.recipientEmail,        // Alternative courante
                    recipient_email: params.recipientEmail, // Alternative
                    invoice_number: params.invoiceNumber,
                    client_name: params.clientName,
                    seller_name: params.sellerName,
                    invoice_date: params.invoiceDate,
                    invoice_amount: params.invoiceAmount,
                    reply_to: params.senderEmail || 'emmanuelmanu286@gmail.com'
                }
            );

            return { success: true, response };
        } catch (error) {
            console.error('Erreur EmailJS:', error);
            throw error;
        }
    }
};

export default emailService;
