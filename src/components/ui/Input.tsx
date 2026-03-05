import React, { useState, forwardRef, useId } from 'react';
import { Eye, EyeOff, X, AlertCircle, Check } from 'lucide-react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  successMessage?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  showCount?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      successMessage,
      prefixIcon,
      suffixIcon,
      showCount = false,
      clearable = false,
      onClear,
      size = 'md',
      fullWidth = false,
      wrapperClassName = '',
      type = 'text',
      className = '',
      disabled,
      maxLength,
      value,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState<string>('');

    const isPassword = type === 'password';
    const hasError = !!error;
    const hasSuccess = success && !hasError;
    const currentValue = value !== undefined ? String(value) : internalValue;
    const charCount = currentValue.length;
    const isNearLimit = maxLength && charCount >= maxLength * 0.9;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onClear?.();
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div
        className={`input-wrapper ${wrapperClassName}`}
        style={{
          width: fullWidth ? '100%' : 'auto',
        }}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={`input-label ${hasError ? 'input-label-error' : ''}`}
          >
            {label}
            {props.required && (
              <span className="input-error-text"> *</span>
            )}
          </label>
        )}

        <div className="input-container">
          {prefixIcon && (
            <div className="input-prefix-icon">
              {prefixIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? 'text' : type}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            maxLength={maxLength}
            className={`
              input-field-custom 
              input-${size} 
              ${prefixIcon ? 'input-with-prefix' : ''} 
              ${(suffixIcon || isPassword || (clearable && currentValue) || hasError || hasSuccess) ? 'input-with-suffix' : ''}
              ${hasError ? 'input-field-error' : ''}
              ${hasSuccess ? 'input-field-success' : ''}
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />

          <div className="input-suffix-icon">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {hasSuccess && !suffixIcon && (
                <div style={{ color: 'var(--success)' }}>
                  <Check size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
                </div>
              )}

              {hasError && !suffixIcon && (
                <div style={{ color: 'var(--danger)' }}>
                  <AlertCircle size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
                </div>
              )}

              {clearable && currentValue && !disabled && !isPassword && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="input-password-toggle"
                  aria-label="Effacer"
                >
                  <X size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
                </button>
              )}

              {isPassword && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="input-password-toggle"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} /> : <Eye size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
                </button>
              )}

              {suffixIcon && (
                <div>
                  {suffixIcon}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-between" style={{ alignItems: 'flex-start', marginTop: '0.25rem' }}>
          <div style={{ flex: 1 }}>
            {error && (
              <p
                id={`${inputId}-error`}
                className="input-helper-text input-error-text fade-in"
              >
                {error}
              </p>
            )}

            {!error && successMessage && hasSuccess && (
              <p
                className="input-helper-text input-success-text fade-in"
              >
                {successMessage}
              </p>
            )}

            {!error && !successMessage && helperText && (
              <p
                id={`${inputId}-helper`}
                className="input-helper-text"
              >
                {helperText}
              </p>
            )}
          </div>

          {showCount && maxLength && (
            <p
              className="input-helper-text"
              style={{
                color: isNearLimit ? 'var(--warning)' : 'var(--text-secondary)',
                marginLeft: '0.5rem'
              }}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
