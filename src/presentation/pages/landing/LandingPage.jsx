import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import HeroSection from './HeroSection';
import HeroSlider from './HeroSlider';
import HomeAbout from './HomeAbout';
import VendorCTA from './VendorCTA';
import HomeServices from './HomeServices';
import HomeNews from './HomeNews';
import FeaturesSection from './FeaturesSection';
import StepsSection from './StepsSection';
import HomeFAQ from './HomeFAQ';

const LandingPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <HeroSlider />
                <HomeAbout />
                <VendorCTA />
                <HomeServices />
                <HomeNews />
                <FeaturesSection />
                <StepsSection />
                <HomeFAQ />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
