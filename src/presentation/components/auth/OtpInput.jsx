import React, { useState, useRef, useEffect } from 'react';

const OtpInput = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value !== "" && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // Check completion
        const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
        if (newOtp.every(val => val !== "") && onComplete) {
            onComplete(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (!/^\d+$/.test(text)) return;

        const digits = text.split('').slice(0, length);
        const newOtp = [...otp];

        digits.forEach((digit, i) => {
            newOtp[i] = digit;
            if (inputRefs.current[i]) inputRefs.current[i].value = digit;
        });

        setOtp(newOtp);

        if (digits.length === length && onComplete) {
            onComplete(newOtp.join(""));
        }

        if (digits.length < length) {
            inputRefs.current[digits.length].focus();
        } else {
            inputRefs.current[length - 1].focus();
        }
    };

    return (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }} onPaste={handlePaste}>
            {otp.map((data, index) => (
                <input
                    className="focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    key={index}
                    type="text"
                    name="otp"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{
                        width: '40px',
                        height: '48px',
                        fontSize: '1.25rem',
                        textAlign: 'center',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #D1D5DB',
                        backgroundColor: 'var(--color-surface)',
                        outline: 'none',
                        transition: 'all 0.2s',
                        color: 'var(--color-text-main)'
                    }}
                />
            ))}
        </div>
    );
};

export default OtpInput;
