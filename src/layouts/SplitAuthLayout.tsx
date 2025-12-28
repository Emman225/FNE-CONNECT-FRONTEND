import React, { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface SplitAuthLayoutProps {
    leftContent: ReactNode;
    rightTitle: string;
    rightSubtitle?: string;
    rightFeatures?: string[];
}

const SplitAuthLayout: React.FC<SplitAuthLayoutProps> = ({
    leftContent,
    rightTitle,
    rightSubtitle,
    rightFeatures = []
}) => {
    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            width: '100%'
        }}>
            {/* Left Side - Form Content (White Background) */}
            <div style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                backgroundColor: 'white',
                minHeight: '100vh'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '480px'
                }}>
                    {leftContent}
                </div>
            </div>

            {/* Right Side - Branded Panel (Green Gradient) */}
            <div style={{
                flex: '1',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}
                className="auth-brand-panel"
            >
                {/* Decorative Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(60px)'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-15%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.1)',
                    filter: 'blur(80px)'
                }} />

                {/* Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '500px'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        lineHeight: '1.2',
                        color: 'white'
                    }}>
                        {rightTitle}
                    </h2>

                    {rightSubtitle && (
                        <p style={{
                            fontSize: '1.125rem',
                            marginBottom: '2.5rem',
                            opacity: 0.95,
                            lineHeight: '1.6'
                        }}>
                            {rightSubtitle}
                        </p>
                    )}

                    {rightFeatures.length > 0 && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem'
                        }}>
                            {rightFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                >
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Check size={18} />
                                    </div>
                                    <span style={{
                                        fontSize: '1rem',
                                        fontWeight: '500'
                                    }}>
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Responsive Styles */}
            <style>{`
        @media (max-width: 768px) {
          .auth-brand-panel {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
};

export default SplitAuthLayout;
