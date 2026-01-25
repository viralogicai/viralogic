'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Loader2, Copy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const orderCode = searchParams.get('orderCode');
    const planId = searchParams.get('planId');
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!orderCode) return;

        // Poll for status or just check once
        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/payos/check-status?orderCode=${orderCode}`);
                const data = await res.json();

                if (data.success && data.data.status === 'PAID') {
                    setStatus('success');
                    // Update user tier logic could be here or via webhook
                } else if (data.success && data.data.status === 'CANCELLED') {
                    setStatus('error');
                } else {
                    // Keep checking or show pending?
                    // For now assume if they got redirected here, it might be successful or pending.
                    // Let's rely on webhook for actual DB update, frontend just confirms.
                    if (data.data.status === 'PAID') setStatus('success');
                    else setStatus('pending'); // User might need to wait
                }
            } catch (error) {
                console.error('Check status error', error);
                setStatus('error');
            }
        };

        checkStatus();
        // Check every 3 seconds
        const interval = setInterval(checkStatus, 3000);
        return () => clearInterval(interval);

    }, [orderCode]);

    if (!orderCode) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
                <div className="text-center text-white">
                    <h1 className="text-2xl font-bold mb-4">Invalid Access</h1>
                    <Link href="/" className="text-brand-cyan hover:underline">Go Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-cyberpunk opacity-50 pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="glass-panel p-8 rounded-2xl text-center">
                    {status === 'pending' && (
                        <>
                            <Loader2 className="w-16 h-16 text-brand-cyan animate-spin mx-auto mb-6" />
                            <h1 className="text-2xl font-bold text-white mb-2">Verifying Payment...</h1>
                            <p className="text-gray-400">Please wait while we confirm your transaction.</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h1 className="text-3xl font-display font-bold text-white mb-2">Payment Successful!</h1>
                            <p className="text-gray-400 mb-6">Thank you for upgrading. Your account has been activated.</p>

                            <div className="bg-white/5 p-4 rounded-xl mb-6">
                                <div className="text-sm text-gray-400 mb-1">Order Code</div>
                                <div className="flex items-center justify-center gap-2 font-mono text-xl text-white">
                                    {orderCode}
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(orderCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                        className="text-gray-500 hover:text-white"
                                    >
                                        {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Link
                                href="/membership"
                                className="inline-flex items-center gap-2 bg-brand-cyan text-black font-bold py-3 px-8 rounded-xl hover:bg-brand-cyan/90 transition-colors w-full justify-center"
                            >
                                Go to Membership Area
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Loader2 className="w-8 h-8 text-red-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Payment Failed or Cancelled</h1>
                            <p className="text-gray-400 mb-6">We couldn't verify your payment. If you paid, please contact support.</p>
                            <Link
                                href="/#pricing"
                                className="text-white hover:text-brand-cyan underline"
                            >
                                Try Again
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-dark text-white">Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
