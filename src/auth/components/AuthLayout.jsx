import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: 'white'
        }}>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
