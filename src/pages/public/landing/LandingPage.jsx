import React from 'react';
// import React from 'react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
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
