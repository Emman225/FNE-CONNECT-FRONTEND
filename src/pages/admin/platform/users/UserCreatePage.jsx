import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone, Lock, Shield, CheckCircle } from 'lucide-react';

import Input from '../../../../components/ui/Input';
import InputPassword from '../../../../auth/components/InputPassword';
import { userRoles, roleLabels } from '../../../../types/roles';

// Mock function to simulate saving
const saveUser = (userData) => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

const UserCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // If id exists, it's edit mode
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: userRoles.COMPLIANCE,
        statut_compte: 'actif'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveUser(formData);
            // Show success notification (mock)
            alert(isEditMode ? 'Utilisateur modifié avec succès' : 'Utilisateur créé avec succès');
            navigate('/admin/dashboard/users');
        } catch (error) {
            console.error(error);
            alert('Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={() => navigate('/admin/dashboard/users')}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '50%',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ArrowLeft size={20} color="var(--text-secondary)" />
                </button>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        {isEditMode ? 'Modifier un utilisateur' : 'Nouvel utilisateur'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Remplissez les informations ci-dessous.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Main Card */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)'
                }}>

                    {/* Section: Identité */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={18} color="var(--primary)" />
                            Informations Personnelles
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                border: '2px dashed var(--primary)',
                                cursor: 'pointer',
                                overflow: 'hidden'
                            }}>
                                {formData.avatar ? (
                                    <img src={formData.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <User size={40} color="var(--primary)" style={{ margin: 'auto' }} />
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>Photo de profil (Optionnel)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setFormData({ ...formData, avatar: reader.result });
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    style={{ fontSize: '0.8rem' }}
                                />
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>PNG, JPG jusqu'à 2Mo</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <Input
                                label="Nom complet"
                                placeholder="Ex: Jean Kouassi"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Ex: jean.kouassi@fne.ci"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Section: Connexion & Rôle */}
                    <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={18} color="var(--primary)" />
                            Accès & Permissions
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <Input
                                label="Téléphone (Identifiant)"
                                placeholder="Ex: 0102030405"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />

                            {!isEditMode && (
                                <InputPassword
                                    label="Mot de passe"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required={!isEditMode}
                                />
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="flex flex-col gap-1">
                                <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                    Rôle
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'white',
                                        fontSize: '0.9375rem',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    {Object.values(userRoles)
                                        .map(role => (
                                            <option key={role} value={role}>{roleLabels[role]}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                    Statut du compte
                                </label>
                                <select
                                    value={formData.statut_compte}
                                    onChange={(e) => setFormData({ ...formData, statut_compte: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'white',
                                        fontSize: '0.9375rem',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <option value="actif">Actif</option>
                                    <option value="suspendu">Suspendu</option>
                                </select>
                            </div>
                        </div>

                        {formData.role === userRoles.VENDOR && (
                            <div className="fade-in" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '1.5rem', backgroundColor: 'rgba(5, 150, 105, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(5, 150, 105, 0.1)' }}>
                                <Input
                                    label="Nom de l'entreprise"
                                    placeholder="Ex: Kouassi Trading SARL"
                                    value={formData.company || ''}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    required
                                />
                                <div className="flex flex-col gap-1">
                                    <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Type d'activité
                                    </label>
                                    <select
                                        value={formData.typeActivite || ''}
                                        onChange={(e) => setFormData({ ...formData, typeActivite: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'white',
                                            fontSize: '0.9375rem'
                                        }}
                                        required
                                    >
                                        <option value="">Sélectionner...</option>
                                        <option value="Commerce">Commerce</option>
                                        <option value="Services">Services</option>
                                        <option value="Artisanat">Artisanat</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/dashboard/users')}
                            className="btn btn-ghost"
                            disabled={loading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            {loading ? 'Enregistrement...' : (
                                <>
                                    <Save size={18} />
                                    {isEditMode ? 'Enregistrer les modifications' : 'Créer l\'utilisateur'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserCreatePage;
