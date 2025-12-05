import React from 'react';

const CustomizeView = ({
    selectedProfile,
    selectedLanguage,
    selectedScreenshotInterval,
    selectedImageQuality,
    layoutMode,
    advancedMode,
    onProfileChange,
    onLanguageChange,
    onScreenshotIntervalChange,
    onImageQualityChange,
    onLayoutModeChange,
    onAdvancedModeChange,
}) => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Customize Settings</h2>
            <p>Profile: {selectedProfile}</p>
            <p>Language: {selectedLanguage}</p>
            <p>Screenshot Interval: {selectedScreenshotInterval}s</p>
            <p>Image Quality: {selectedImageQuality}</p>
            <p>Layout: {layoutMode}</p>
            <p>Advanced Mode: {advancedMode ? 'Enabled' : 'Disabled'}</p>
            {/* Full implementation would go here - keeping minimal for migration */}
        </div>
    );
};

export default CustomizeView;
