// Simple React app without JSX - works directly in Electron
const { useState, useEffect, useCallback } = React;
const { createRoot } = ReactDOM;

// Main App Component
function App() {
    const [currentView, setCurrentView] = useState(
        localStorage.getItem('onboardingCompleted') ? 'main' : 'onboarding'
    );
    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
    const [statusText, setStatusText] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [responses, setResponses] = useState([]);
    const [currentResponseIndex, setCurrentResponseIndex] = useState(-1);

    // IPC listeners
    useEffect(() => {
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            
            ipcRenderer.on('update-response', (_, response) => {
                setResponses(prev => [...prev, response]);
                setCurrentResponseIndex(prev => prev + 1);
            });
            
            ipcRenderer.on('update-status', (_, status) => {
                setStatusText(status);
            });

            return () => {
                ipcRenderer.removeAllListeners('update-response');
                ipcRenderer.removeAllListeners('update-status');
            };
        }
    }, []);

    const handleStart = async () => {
        if (!apiKey.trim()) return;
        
        await window.cheddar.initializeGemini('interview', 'en-US');
        window.cheddar.startCapture('5', 'medium');
        setStartTime(Date.now());
        setCurrentView('assistant');
    };

    const handleClose = async () => {
        if (currentView === 'assistant') {
            window.cheddar.stopCapture();
            if (window.require) {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('close-session');
            }
            setCurrentView('main');
        } else {
            if (window.require) {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('quit-application');
            }
        }
    };

    // Render based on view
    if (currentView === 'onboarding') {
        return React.createElement('div', { style: { padding: '40px', textAlign: 'center' } },
            React.createElement('h1', null, 'Welcome to Cheating Daddy'),
            React.createElement('p', null, 'Your AI assistant for interviews and meetings'),
            React.createElement('button', {
                onClick: () => {
                    localStorage.setItem('onboardingCompleted', 'true');
                    setCurrentView('main');
                },
                style: { marginTop: '20px', padding: '10px 20px' }
            }, 'Get Started')
        );
    }

    if (currentView === 'main') {
        return React.createElement('div', { className: 'window-container' },
            React.createElement('div', { className: 'container' },
                // Header
                React.createElement('div', { className: 'header' },
                    React.createElement('div', { className: 'header-title' }, 'Cheating Daddy'),
                    React.createElement('div', { className: 'header-actions' },
                        React.createElement('button', {
                            className: 'icon-button window-close',
                            onClick: handleClose
                        }, '×')
                    )
                ),
                // Main content
                React.createElement('div', { className: 'main-content with-border' },
                    React.createElement('div', { style: { padding: '20px' } },
                        React.createElement('div', { style: { fontSize: '24px', fontWeight: '600', marginBottom: '20px' } }, 'Welcome'),
                        React.createElement('div', { style: { display: 'flex', gap: '12px', marginBottom: '20px' } },
                            React.createElement('input', {
                                type: 'password',
                                placeholder: 'Enter your Gemini API Key',
                                value: apiKey,
                                onChange: (e) => {
                                    setApiKey(e.target.value);
                                    localStorage.setItem('apiKey', e.target.value);
                                },
                                style: { flex: 1 }
                            }),
                            React.createElement('button', {
                                className: 'start-button',
                                onClick: handleStart
                            }, 'Start Session')
                        ),
                        React.createElement('p', { className: 'description' }, 
                            'dont have an api key? ',
                            React.createElement('span', {
                                className: 'link',
                                onClick: async () => {
                                    if (window.require) {
                                        const { ipcRenderer } = window.require('electron');
                                        await ipcRenderer.invoke('open-external', 'https://aistudio.google.com/apikey');
                                    }
                                }
                            }, 'get one here')
                        )
                    )
                )
            )
        );
    }

    if (currentView === 'assistant') {
        const currentResponse = responses.length > 0 && currentResponseIndex >= 0
            ? responses[currentResponseIndex]
            : 'Hey, Im listening to your session...';

        return React.createElement('div', { className: 'window-container' },
            React.createElement('div', { className: 'container' },
                // Header
                React.createElement('div', { className: 'header' },
                    React.createElement('div', { className: 'header-title' }, 'Cheating Daddy'),
                    React.createElement('div', { className: 'header-actions' },
                        React.createElement('span', null, statusText),
                        React.createElement('button', {
                            className: 'button',
                            onClick: async () => {
                                if (window.require) {
                                    const { ipcRenderer } = window.require('electron');
                                    await ipcRenderer.invoke('toggle-window-visibility');
                                }
                            }
                        }, 'Hide'),
                        React.createElement('button', {
                            className: 'icon-button window-close',
                            onClick: handleClose
                        }, '×')
                    )
                ),
                // Assistant content
                React.createElement('div', { className: 'main-content assistant-view' },
                    React.createElement('div', { 
                        style: { 
                            height: 'calc(100% - 60px)', 
                            overflowY: 'auto', 
                            padding: '16px',
                            fontSize: '18px',
                            lineHeight: '1.6'
                        },
                        dangerouslySetInnerHTML: { 
                            __html: window.marked ? window.marked.parse(currentResponse) : currentResponse 
                        }
                    }),
                    React.createElement('div', { 
                        style: { 
                            display: 'flex', 
                            gap: '10px', 
                            marginTop: '10px',
                            alignItems: 'center'
                        }
                    },
                        React.createElement('button', {
                            className: 'nav-button',
                            disabled: currentResponseIndex <= 0,
                            onClick: () => setCurrentResponseIndex(prev => Math.max(0, prev - 1))
                        }, '←'),
                        responses.length > 0 && React.createElement('span', { 
                            style: { fontSize: '12px', minWidth: '60px', textAlign: 'center' }
                        }, `${currentResponseIndex + 1}/${responses.length}`),
                        React.createElement('input', {
                            type: 'text',
                            placeholder: 'Type a message to the AI...',
                            style: { flex: 1 },
                            onKeyDown: async (e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                    const message = e.target.value.trim();
                                    e.target.value = '';
                                    await window.cheddar.sendTextMessage(message);
                                }
                            }
                        }),
                        React.createElement('button', {
                            className: 'nav-button',
                            disabled: currentResponseIndex >= responses.length - 1,
                            onClick: () => setCurrentResponseIndex(prev => Math.min(responses.length - 1, prev + 1))
                        }, '→')
                    )
                )
            )
        );
    }

    return React.createElement('div', null, 'Unknown view');
}

// Initialize React app
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
