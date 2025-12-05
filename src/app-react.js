const { useState, useEffect } = React;

// Main App Component
function App() {
    const [view, setView] = useState(localStorage.getItem('onboardingCompleted') ? 'main' : 'onboarding');
    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
    const [responses, setResponses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.on('update-response', (_, response) => {
                setResponses(prev => [...prev, response]);
                setCurrentIndex(prev => prev + 1);
            });
            ipcRenderer.on('update-status', (_, s) => setStatus(s));
            return () => {
                ipcRenderer.removeAllListeners('update-response');
                ipcRenderer.removeAllListeners('update-status');
            };
        }
    }, []);

    const startSession = async () => {
        if (!apiKey.trim()) return alert('Please enter API key');
        localStorage.setItem('apiKey', apiKey);
        
        if (window.cheddar) {
            await window.cheddar.initializeGemini('interview', 'en-US');
            window.cheddar.startCapture('2', 'medium');
        }
        setView('assistant');
    };

    const sendMessage = async () => {
        if (!message.trim()) return;
        if (window.cheddar) {
            await window.cheddar.sendTextMessage(message);
            setMessage('');
        }
    };

    const styles = {
        container: { height: '100vh', display: 'flex', flexDirection: 'column', padding: '20px', background: '#1a1a1a' },
        header: { padding: '15px', background: 'rgba(0,0,0,0.8)', borderRadius: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        title: { fontSize: '18px', fontWeight: '600' },
        content: { flex: 1, background: 'rgba(0,0,0,0.8)', borderRadius: '10px', padding: '20px', overflow: 'auto' },
        input: { width: '100%', padding: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', fontSize: '14px', marginBottom: '15px' },
        button: { padding: '12px 24px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },
        response: { background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '10px', lineHeight: '1.6' },
        inputGroup: { display: 'flex', gap: '10px', marginTop: '15px' },
        messageInput: { flex: 1, padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff' }
    };

    if (view === 'onboarding') {
        return (
            <div style={styles.container}>
                <div style={{ ...styles.content, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Welcome to Cheating Daddy</h1>
                    <p style={{ marginBottom: '30px', opacity: 0.8 }}>Your AI assistant for interviews and meetings</p>
                    <button style={styles.button} onClick={() => {
                        localStorage.setItem('onboardingCompleted', 'true');
                        setView('main');
                    }}>Get Started</button>
                </div>
            </div>
        );
    }

    if (view === 'main') {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.title}>Cheating Daddy - React Version</div>
                    <button style={{ ...styles.button, background: 'transparent', color: '#fff', padding: '8px' }} onClick={() => window.close()}>✕</button>
                </div>
                <div style={styles.content}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Welcome</h2>
                    <input 
                        type="password" 
                        placeholder="Enter your Gemini API Key" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        style={styles.input}
                    />
                    <button style={styles.button} onClick={startSession}>Start Session</button>
                    <p style={{ marginTop: '15px', fontSize: '14px', opacity: 0.7 }}>
                        Don't have an API key? <a href="https://aistudio.google.com/apikey" style={{ color: '#007aff' }}>Get one here</a>
                    </p>
                </div>
            </div>
        );
    }

    if (view === 'assistant') {
        const currentResponse = responses[currentIndex] || 'Listening to your session...';
        
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.title}>Cheating Daddy</div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', opacity: 0.7 }}>{status}</span>
                        <button style={{ ...styles.button, padding: '8px 16px' }} onClick={() => {
                            if (window.cheddar) window.cheddar.stopCapture();
                            setView('main');
                        }}>Close Session</button>
                    </div>
                </div>
                <div style={styles.content}>
                    <div style={styles.response} dangerouslySetInnerHTML={{ __html: marked.parse(currentResponse) }} />
                    <div style={styles.inputGroup}>
                        <button style={{ ...styles.button, padding: '10px' }} onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex <= 0}>←</button>
                        {responses.length > 0 && <span style={{ padding: '10px', opacity: 0.7 }}>{currentIndex + 1}/{responses.length}</span>}
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            style={styles.messageInput}
                        />
                        <button style={{ ...styles.button, padding: '10px' }} onClick={() => setCurrentIndex(Math.min(responses.length - 1, currentIndex + 1))} disabled={currentIndex >= responses.length - 1}>→</button>
                    </div>
                </div>
            </div>
        );
    }
}

// Render
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
