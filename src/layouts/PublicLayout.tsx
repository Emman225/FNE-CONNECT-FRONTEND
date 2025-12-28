import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../app/shared/components/dashboard/Sidebar';
import Topbar from '../app/shared/components/dashboard/Topbar';

const PublicLayout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '280px', display: 'flex', flexDirection: 'column' }}>
                <Topbar />
                <main style={{ padding: '2rem', flex: 1, overflowX: 'hidden' }}>
                    <div className="container" style={{ maxWidth: '1400px', padding: 0 }}>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PublicLayout;
