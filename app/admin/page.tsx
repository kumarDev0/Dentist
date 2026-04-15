'use client';
import { useState } from 'react';

export default function AdminPage() {
    const [form, setForm] = useState({
        clinicName: '',
        doctorName: '',
        phone: '',
        address: '',
        location: '',
        heroImage: '',
    });
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generateLink = () => {
        const allFilled = Object.values(form).every(v => v.trim() !== '');
        if (!allFilled) {
            alert('Sabhi 5 fields bharo pehle!');
            return;
        }
        const base = window.location.origin;
        const params = new URLSearchParams(form);
        setGeneratedLink(`${base}/demo?${params.toString()}`);
        setCopied(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const fields = [
        { label: '🏥 Clinic ka Naam', name: 'clinicName', placeholder: 'Sharma Dental Clinic' },
        { label: '👨‍⚕️ Doctor ka Naam', name: 'doctorName', placeholder: 'Dr. Rajesh Sharma' },
        { label: '📞 Phone Number', name: 'phone', placeholder: '+91 98111 22333' },
        { label: '📍 Full Address', name: 'address', placeholder: '12, MG Road, Connaught Place, New Delhi' },
        { label: '🗺️ Location (short)', name: 'location', placeholder: 'Connaught Place, New Delhi' },
        { label: '🖼️ Hero Image URL', name: 'heroImage', placeholder: 'https://images.pexels.com/photos/...' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
            <div style={{ width: '100%', maxWidth: '560px' }}>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.5rem' }}>
                        Admin Panel
                    </div>
                    <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '2.2rem', color: '#F9F5ED', marginBottom: '0.5rem' }}>
                        Client Demo <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Generator</em>
                    </h1>
                    <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>
                        5 cheezein bharo → link generate karo → client ko bhejo
                    </p>
                </div>

                <div style={{ background: '#111', border: '0.5px solid rgba(201,168,76,0.15)', borderRadius: '2px', padding: '2rem' }}>
                    {fields.map((field) => (
                        <div key={field.name} style={{ marginBottom: '1.2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888', marginBottom: '0.4rem' }}>
                                {field.label}
                            </label>
                            <input
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                value={form[field.name as keyof typeof form]}
                                style={{ width: '100%', padding: '0.8rem 1rem', background: '#0A0A0A', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '2px', color: '#F9F5ED', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>
                    ))}

                    <button
                        onClick={generateLink}
                        style={{ width: '100%', padding: '0.9rem', background: '#C9A84C', color: '#0A0A0A', border: 'none', borderRadius: '2px', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', marginTop: '0.5rem' }}
                    >
                        🔗 Link Generate Karo
                    </button>
                </div>

                {generatedLink && (
                    <div style={{ marginTop: '1.5rem', background: '#111', border: '0.5px solid rgba(201,168,76,0.35)', borderRadius: '2px', padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.68rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888', marginBottom: '0.8rem' }}>
                            Client ka Demo Link
                        </div>
                        <p style={{ color: '#C9A84C', wordBreak: 'break-all', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                            {generatedLink}
                        </p>
                        <button
                            onClick={copyLink}
                            style={{ width: '100%', padding: '0.9rem', background: copied ? '#1a472a' : '#25D366', color: 'white', border: 'none', borderRadius: '2px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'background 0.3s' }}
                        >
                            {copied ? '✅ Link Copy Ho Gaya!' : '📋 Copy Karo & Client Ko Bhejo'}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}