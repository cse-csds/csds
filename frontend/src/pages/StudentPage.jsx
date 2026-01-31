import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck, Database, RefreshCw, FileText } from 'lucide-react';
import api, { API_BASE_URL } from '../api';

const StudentPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const resp = await api.get('/api/subjects');
            if (Array.isArray(resp.data)) {
                setSubjects(resp.data);
            } else {
                console.error('API returned non-array data:', resp.data);
                setError('Backend returned an invalid response.');
            }
        } catch (err) {
            console.error('Failed to fetch subjects:', err);
            setError('Could not connect to the backend server. It may still be starting up.');
        } finally {
            setLoading(false);
        }
    };

    const openPdf = (url) => {
        if (!url) return;
        let fullUrl;
        if (url.startsWith('http')) {
            fullUrl = url;
        } else if (url.startsWith('uploads/')) {
            fullUrl = `${API_BASE_URL}/${url}`;
        } else {
            fullUrl = `${API_BASE_URL}/files/${url}`;
        }
        window.open(fullUrl, '_blank');
    };

    const categorized = {
        'Cyber Security': subjects.filter(s => s.category === 'Cyber Security'),
        'Data Science': subjects.filter(s => s.category === 'Data Science')
    };

    if (loading) {
        return (
            <div className="loading-container">
                <RefreshCw className="spin" size={48} />
                <p>Loading EduPortal...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="loading-container error-state">
                <RefreshCw size={48} onClick={fetchSubjects} style={{ cursor: 'pointer' }} />
                <p>{error}</p>
                <button onClick={fetchSubjects} className="cyber-btn" style={{ padding: '0.5rem 1rem' }}>Retry</button>
            </div>
        );
    }

    return (
        <div className="student-container">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="student-hero"
            >
                <GraduationCap size={48} className="hero-icon" />
                <h1>Cyber Security & Data Science Portal</h1>
                <p>Explore our current modules and roadmap</p>
                <button onClick={fetchSubjects} className="refresh-btn">
                    <RefreshCw size={16} /> Refresh List
                </button>
            </motion.div>

            <div className="subjects-grid">
                <section className="category-column">
                    <div className="category-header cs-header">
                        <ShieldCheck size={24} />
                        <h2>Cyber Security</h2>
                    </div>
                    <div className="subject-list">
                        {categorized['Cyber Security'].length > 0 ? (
                            categorized['Cyber Security'].map((s, idx) => (
                                <motion.div
                                    key={s._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="subject-card student-sc"
                                >
                                    <div className="subject-content">
                                        <div className="dot"></div>
                                        <span>{s.name}</span>
                                    </div>
                                    {s.pdfUrl && (
                                        <button className="view-pdf-btn" onClick={() => openPdf(s.pdfUrl)}>
                                            <FileText size={16} /> Question Bank
                                        </button>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <p className="empty-msg">No subjects listed yet.</p>
                        )}
                    </div>
                </section>

                <section className="category-column">
                    <div className="category-header ds-header">
                        <Database size={24} />
                        <h2>Data Science</h2>
                    </div>
                    <div className="subject-list">
                        {categorized['Data Science'].length > 0 ? (
                            categorized['Data Science'].map((s, idx) => (
                                <motion.div
                                    key={s._id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="subject-card student-sc"
                                >
                                    <div className="subject-content">
                                        <div className="dot"></div>
                                        <span>{s.name}</span>
                                    </div>
                                    {s.pdfUrl && (
                                        <button className="view-pdf-btn" onClick={() => openPdf(s.pdfUrl)}>
                                            <FileText size={16} /> Question Bank
                                        </button>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <p className="empty-msg">No subjects listed yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StudentPage;
