'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Loader2, Copy, ArrowRight, Mail, AlertTriangle, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const orderCode = searchParams?.get('orderCode');
    const planId = searchParams?.get('planId');
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [copied, setCopied] = useState(false);

    // Determine effective status
    useEffect(() => {
        const statusParam = searchParams?.get('status');
        if (statusParam === 'skipped') {
            setStatus('success');
            return;
        }

        if (!orderCode) return;

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/payos/check-status?orderCode=${orderCode}`);
                const data = await res.json();
                if (data.success && (data.data.status === 'PAID')) {
                    setStatus('success');
                } else if (data.data.status === 'CANCELLED') {
                    setStatus('error');
                } else {
                    // Assume success if redirected here properly, or keep pending. 
                    // For better UX, let's assume success if we arrived here via returnUrl but usually we check.
                    // The user just 'Simulated' so it should be PAID.
                    if (data.data.status === 'PAID') setStatus('success');
                }
            } catch (e) {
                console.error(e);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 3000);
        return () => clearInterval(interval);
    }, [orderCode, searchParams]);

    // Allow render if status is skipped even without orderCode
    const isSkipped = searchParams?.get('status') === 'skipped';

    if (!orderCode && !isSkipped) {
        return (
            <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
                <Link href="/" className="text-brand-cyan hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background derived from Logo Colors */}
            <div className="absolute inset-0 bg-grid-cyberpunk opacity-30 z-0"></div>

            {/* Large blurred glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 md:p-12 rounded-3xl text-center border-t border-brand-cyan/20 shadow-2xl shadow-brand-cyan/10"
                >
                    {/* Logo or Brand Element */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg shadow-brand-cyan/20">
                            <Image
                                src="/logo-app.png"
                                alt="ViraLogic AI"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {status === 'pending' && (
                        <div className="py-12">
                            <Loader2 className="w-16 h-16 text-brand-cyan animate-spin mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-white mb-2">Đang xác nhận giao dịch...</h2>
                            <p className="text-gray-400">Vui lòng đợi trong giây lát.</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-1 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                            >
                                <CheckCircle className="w-10 h-10 text-emerald-400" />
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                                Cảm ơn bạn! <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink">
                                    {isSkipped ? 'Đơn hàng đã được xác nhận' : 'Thanh toán thành công'}
                                </span>
                            </h1>

                            {isSkipped && (
                                <p className="text-gray-400 mb-6">
                                    Bạn đã chọn giữ nguyên gói <span className="text-white font-bold uppercase">{planId || 'Starter'}</span>.
                                </p>
                            )}

                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left max-w-lg mx-auto">
                                <h3 className="text-xl font-bold text-white mb-6">🎉 Chào mừng bạn đến với ViraLogic AI</h3>

                                {(!planId || planId === 'starter') && (
                                    <div className="bg-brand-purple/20 border border-brand-purple/40 rounded-lg p-4 mb-6">
                                        <p className="font-bold text-brand-purple-light flex items-center gap-2 mb-2">
                                            👉 BƯỚC 1 (QUAN TRỌNG):
                                        </p>
                                        <p className="text-gray-200 text-sm mb-3">
                                            Trước khi mở prompt, hãy bắt đầu ở đây để không đi sai thứ tự.
                                        </p>
                                        <Link href="/start-here">
                                            <Button size="sm" className="w-full bg-brand-purple hover:bg-brand-purple/80 text-white font-bold">
                                                [ START HERE – 7 NGÀY ĐẦU ] <ArrowRight className="w-4 h-4 ml-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                )}

                                <ul className="space-y-4 text-gray-300 text-sm pt-4 border-t border-white/5">
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                        <span>
                                            Hệ thống đã gửi email xác nhận và link truy cập gói
                                            <span className="font-bold text-white mx-1 capitalize">{planId || 'Membership'}</span>
                                            vào hộp thư của bạn.
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                        <span>
                                            <span className="text-red-400 font-bold flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" /> Lưu ý:
                                            </span>
                                            Kiểm tra mục <strong>Spam</strong> hoặc <strong>Quảng cáo</strong> nếu không thấy email.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4 max-w-md mx-auto">
                                {(planId?.includes('vip') || planId?.includes('mentorship')) ? (
                                    <Link href="/membership" className="block w-full">
                                        <Button variant="cyber" className="w-full py-4 text-lg font-bold shadow-lg shadow-brand-cyan/25">
                                            Truy cập Membership Area
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/" className="block w-full">
                                        <Button variant="outline" className="w-full py-4 text-lg font-bold">
                                            Quay về Trang chủ
                                        </Button>
                                    </Link>
                                )}

                                {orderCode && (
                                    <p className="text-xs text-gray-500 pt-4 border-t border-white/5">
                                        Mã đơn hàng: <span className="font-mono text-gray-400">{orderCode}</span>
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    {status === 'error' && (
                        <div className="py-8">
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-red-500/30">
                                <AlertTriangle className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Thanh toán thất bại</h2>
                            <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                                Giao dịch đã bị hủy hoặc không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ.
                            </p>
                            <Link href="/#pricing">
                                <Button variant="outline">Quay lại trang thanh toán</Button>
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
