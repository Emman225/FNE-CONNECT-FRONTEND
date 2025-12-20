import React, { useState } from 'react';
import Input from '../ui/Input';
import { Eye, EyeOff } from 'lucide-react';

const InputPassword = React.forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ position: 'relative' }}>
            <Input
                ref={ref}
                type={showPassword ? 'text' : 'password'}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                    position: 'absolute',
                    right: '12px',
                    top: props.label ? '34px' : '10px', // Adjust based on label presence
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280'
                }}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
});

InputPassword.displayName = 'InputPassword';

export default InputPassword;
