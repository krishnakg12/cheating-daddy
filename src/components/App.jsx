import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from './app/AppHeader';
import MainView from './views/MainView';
import CustomizeView from './views/CustomizeView';
import HelpView from './views/HelpView';
import HistoryView from './views/HistoryView';
import AssistantView from './views/AssistantView';
import OnboardingView from './views/OnboardingView';
import AdvancedView from './views/AdvancedView';
import './App.css';

const App = () => {
    const [currentView, setCurrentView] = useState(
        localStorage.getItem('onboardingCompleted') ? 'main' : 'onboarding'
    );
    const [statusText, setStatusText] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [sessionActive, setSessionActive] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(localStorage.getItem('selectedProfile') || 'interview');
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'en-US');
    const [responses, setResponses] = useState([]);
    const [currentResponseIndex, setCurrentResponseIndex] = useState(-1);
    const [selectedScreenshotInterval, setSelectedScreenshotInterval] = useState(
        localStorage.getItem('selectedScreenshotInterval') || '5'
    );
    const [selectedImageQuality, setSelectedImageQuality] = useState(
        localStorage.getItem('selectedImageQuality') || 'medium'
    );
    const [layoutMode, setLayoutMode] = useState(localStorage.getItem('layoutMode') || 'normal');
    const [advancedMode, setAdvancedMode] = useState(localStorage.getItem('advancedMode') === 'true');
    const [isClickThrough, setIsClickThrough] = useState(false);
    const [awaitingNewResponse, setAwaitingNewResponse] = useState(false);
    const [currentResponseIsComplete, setCurrentResponseIsComplete] = useState(true);
    const [shouldAnimateResponse, setShouldAnimateResponse] = useState(false);

    // Update layout mode on document root
    useEffect(() => {
        if (layoutMode === 'compact') {
            document.documentElement.classList.add('compact-layout');
        } else {
            document.documentElement.classList.remove('compact-layout');
        }
    }, [layoutMode]);

    // Listen for start-session event from keyboard shortcut
    useEffect(() => {
        const handleStartSessionEvent = () => {
            if (currentView === 'main') {
                handleStart();
            }
        };

        window.addEventListener('start-session', handleStartSessionEvent);
        return () => {
            window.removeEventListener('start-session', handleStartSessionEvent);
        };
    }, [currentView]);

    // IPC listeners
    useEffect(() => {
        if (window.require) {
            const { ipcRenderer } = window.require('electron');

            const handleUpdateResponse = (_, response) => {
                const isFillerResponse =
                    response.length < 30 &&
                    (response.toLowerCase().includes('hmm') ||
                        response.toLowerCase().includes('okay') ||
                        response.toLowerCase().includes('next') ||
                        response.toLowerCase().includes('go on') ||
                        response.toLowerCase().includes('continue'));

                setResponses(prev => {
                    if (awaitingNewResponse || prev.length === 0) {
                        setAwaitingNewResponse(false);
                        setCurrentResponseIsComplete(false);
                        setCurrentResponseIndex(prev.length);
                        return [...prev, response];
                    } else if (!currentResponseIsComplete && !isFillerResponse && prev.length > 0) {
                        return [...prev.slice(0, prev.length - 1), response];
                    } else {
                        setCurrentResponseIsComplete(false);
                        setCurrentResponseIndex(prev.length);
                        return [...prev, response];
                    }
                });
                setShouldAnimateResponse(true);
            };

            const handleUpdateStatus = (_, status) => {
                setStatusText(status);
                if (status.includes('Ready') || status.includes('Listening') || status.includes('Error')) {
                    setCurrentResponseIsComplete(true);
                }
            };

            const handleClickThroughToggled = (_, isEnabled) => {
                setIsClickThrough(isEnabled);
            };

            ipcRenderer.on('update-response', handleUpdateResponse);
            ipcRenderer.on('update-status', handleUpdateStatus);
            ipcRenderer.on('click-through-toggled', handleClickThroughToggled);

            return () => {
                ipcRenderer.removeAllListeners('update-response');
                ipcRenderer.removeAllListeners('update-status');
                ipcRenderer.removeAllListeners('click-through-toggled');
            };
        }
    }, [awaitingNewResponse, currentResponseIsComplete]);

    // Notify main process of view changes and store in localStorage for window.cheddar access
    useEffect(() => {
        localStorage.setItem('currentView', currentView);
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('view-changed', currentView);
        }
    }, [currentView]);

    // Persist settings to localStorage
    useEffect(() => {
        localStorage.setItem('selectedProfile', selectedProfile);
    }, [selectedProfile]);

    useEffect(() => {
        localStorage.setItem('selectedLanguage', selectedLanguage);
    }, [selectedLanguage]);

    useEffect(() => {
        localStorage.setItem('selectedScreenshotInterval', selectedScreenshotInterval);
    }, [selectedScreenshotInterval]);

    useEffect(() => {
        localStorage.setItem('selectedImageQuality', selectedImageQuality);
    }, [selectedImageQuality]);

    useEffect(() => {
        localStorage.setItem('layoutMode', layoutMode);
    }, [layoutMode]);

    useEffect(() => {
        localStorage.setItem('advancedMode', advancedMode.toString());
    }, [advancedMode]);

    const handleStart = async () => {
        const apiKey = localStorage.getItem('apiKey')?.trim();
        if (!apiKey || apiKey === '') {
            return;
        }

        await window.cheddar.initializeGemini(selectedProfile, selectedLanguage);
        window.cheddar.startCapture(selectedScreenshotInterval, selectedImageQuality);
        setResponses([]);
        setCurrentResponseIndex(-1);
        setStartTime(Date.now());
        setCurrentView('assistant');
    };

    const handleClose = async () => {
        if (currentView === 'customize' || currentView === 'help' || currentView === 'history') {
            setCurrentView('main');
        } else if (currentView === 'assistant') {
            window.cheddar.stopCapture();

            if (window.require) {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('close-session');
            }
            setSessionActive(false);
            setCurrentView('main');
        } else {
            if (window.require) {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('quit-application');
            }
        }
    };

    const handleHideToggle = async () => {
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            await ipcRenderer.invoke('toggle-window-visibility');
        }
    };

    const handleSendText = async message => {
        const result = await window.cheddar.sendTextMessage(message);

        if (!result.success) {
            setStatusText('Error sending message: ' + result.error);
        } else {
            setStatusText('Message sent...');
            setAwaitingNewResponse(true);
        }
    };

    const handleLayoutModeChange = async newLayoutMode => {
        setLayoutMode(newLayoutMode);

        if (window.require) {
            try {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('update-sizes');
            } catch (error) {
                console.error('Failed to update sizes in main process:', error);
            }
        }
    };

    const renderCurrentView = () => {
        switch (currentView) {
            case 'onboarding':
                return <OnboardingView onComplete={() => setCurrentView('main')} onClose={handleClose} />;

            case 'main':
                return <MainView onStart={handleStart} onLayoutModeChange={handleLayoutModeChange} />;

            case 'customize':
                return (
                    <CustomizeView
                        selectedProfile={selectedProfile}
                        selectedLanguage={selectedLanguage}
                        selectedScreenshotInterval={selectedScreenshotInterval}
                        selectedImageQuality={selectedImageQuality}
                        layoutMode={layoutMode}
                        advancedMode={advancedMode}
                        onProfileChange={setSelectedProfile}
                        onLanguageChange={setSelectedLanguage}
                        onScreenshotIntervalChange={setSelectedScreenshotInterval}
                        onImageQualityChange={setSelectedImageQuality}
                        onLayoutModeChange={handleLayoutModeChange}
                        onAdvancedModeChange={setAdvancedMode}
                    />
                );

            case 'help':
                return <HelpView />;

            case 'history':
                return <HistoryView />;

            case 'advanced':
                return <AdvancedView />;

            case 'assistant':
                return (
                    <AssistantView
                        responses={responses}
                        currentResponseIndex={currentResponseIndex}
                        selectedProfile={selectedProfile}
                        onSendText={handleSendText}
                        shouldAnimateResponse={shouldAnimateResponse}
                        onResponseIndexChanged={index => {
                            setCurrentResponseIndex(index);
                            setShouldAnimateResponse(false);
                        }}
                        onResponseAnimationComplete={() => {
                            setShouldAnimateResponse(false);
                            setCurrentResponseIsComplete(true);
                        }}
                    />
                );

            default:
                return <div>Unknown view: {currentView}</div>;
        }
    };

    const mainContentClass = `main-content ${
        currentView === 'assistant' ? 'assistant-view' : currentView === 'onboarding' ? 'onboarding-view' : 'with-border'
    }`;

    return (
        <div className="window-container">
            <div className="container">
                <AppHeader
                    currentView={currentView}
                    statusText={statusText}
                    startTime={startTime}
                    advancedMode={advancedMode}
                    onCustomizeClick={() => setCurrentView('customize')}
                    onHelpClick={() => setCurrentView('help')}
                    onHistoryClick={() => setCurrentView('history')}
                    onAdvancedClick={() => setCurrentView('advanced')}
                    onCloseClick={handleClose}
                    onBackClick={() => setCurrentView('main')}
                    onHideToggleClick={handleHideToggle}
                    isClickThrough={isClickThrough}
                />
                <div className={mainContentClass}>
                    <div className="view-container">{renderCurrentView()}</div>
                </div>
            </div>
        </div>
    );
};

export default App;
