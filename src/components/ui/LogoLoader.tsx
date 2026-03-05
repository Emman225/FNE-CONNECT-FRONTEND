import React from 'react';
import logo from '../../assets/logo.png';

export interface LogoLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap: Record<string, number> = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const LogoLoader: React.FC<LogoLoaderProps> = ({ size = 'md', className = '' }) => {
  const px = sizeMap[size];
  return (
    <img
      src={logo}
      alt="Chargement..."
      className={`animate-pulse ${className}`}
      style={{ width: px, height: px, objectFit: 'contain' }}
      role="status"
      aria-label="Chargement..."
    />
  );
};

export default LogoLoader;
