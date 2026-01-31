'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/Button';
import { ArrowRight, Lock, Mail, Loader2 } from 'lucide-react';

export default function MemberLoginPage() {
    const router = useRouter();
    const { upgradeTier } = useAuth(); // We'll leverage this to update local context

    const [step, setStep] = useState<'email' | 'password' | 'setup'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/member-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                setLoading(false);
                return;
            }

            if (data.status === 'SETUP_REQUIRED') {
                setStep('setup');
            } else if (data.status === 'PASSWORD_REQUIRED') {
                setStep('password');
            }
        } catch (err) {
            setError('Connection failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/member-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                // Update Context
                upgradeTier('vip_mentorship'); // Or update entire user object if context supported it
                // Redirect
                router.push('/membership');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/setup-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword: password })
            });
            const data = await res.json();

            if (data.success) {
                upgradeTier('vip_mentorship');
                router.push('/membership');
            } else {
                setError(data.error || 'Setup failed');
            }
        } catch (err) {
            setError('Setup error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-cyberpunk opacity-20 z-0"></div>

            <MotionDiv
                className="relative z-10 w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-display font-bold text-white mb-2">Member Login</h1>
                    <p className="text-gray-400 text-sm">Access your VIP Mentorship Area</p>
                </div>

                {step === 'email' && (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email Address used for purchase</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-cyan focus:outline-none"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <Button variant="primary" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Continue'}
                        </Button>
                    </form>
                )}

                {step === 'password' && (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="flex items-center justify-between mb-4 bg-white/5 p-3 rounded-lg">
                            <span className="text-gray-300 text-sm">{email}</span>
                            <button type="button" onClick={() => setStep('email')} className="text-xs text-brand-cyan hover:underline">Change</button>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-cyan focus:outline-none"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <Button variant="primary" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Login'}
                        </Button>
                    </form>
                )}

                {step === 'setup' && (
                    <form onSubmit={handleSetup} className="space-y-4">
                        <div className="bg-brand-cyan/10 border border-brand-cyan/20 p-4 rounded-lg mb-4 text-sm text-brand-cyan">
                            Welcome! Since this is your first time, please create a password for your account.
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Create Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-cyan focus:outline-none"
                                    placeholder="New password"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <Button variant="primary" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Create Account & Login'}
                        </Button>
                    </form>
                )}
            </MotionDiv>
        </div>
    );
}

// Simple wrapper for animation without importing framer motion just for this component if needed, 
// using a div here.
const MotionDiv = (props: any) => <div {...props} />;
