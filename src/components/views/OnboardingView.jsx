import React from 'react';

const OnboardingView = ({ onComplete, onClose }) => {
    const handleComplete = () => {
        localStorage.setItem('onboardingCompleted', 'true');
        onComplete();
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Welcome to Cheating Daddy</h1>
            <p>Your AI assistant for interviews, meetings, and more.</p>
            <button onClick={handleComplete} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Get Started
            </button>
        </div>
    );
};

export default OnboardingView;
