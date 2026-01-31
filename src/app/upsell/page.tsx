'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PayOSModal } from '@/components/PayOSModal';
import { Clock, ShieldCheck, Star, Video, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import Image from 'next/image';

function UpsellContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { upgradeTier } = useAuth();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Determine Upsell Context
    const fromPlan = searchParams?.get('fromPlan') || 'starter';
    const isProToElite = fromPlan === 'pro';

    // Dynamic Content
    const content = isProToElite
        ? {
            title: "Ưu đãi VIP độc quyền",
            desc: "Bạn đã chọn gói Pro. Tuy nhiên, các Creator thu nhập 9 con số đều sở hữu gói VIP Mentorship để nhận Coaching 1-1.",
            targetPlan: "VIP Mentorship",
            basePrice: 999000,
            paidAmount: 399000,
            upgradePrice: 600000,
            upgradeTierId: 'vip_mentorship' as const,
            features: [
                "3–5 Video Masterclass (Bee trực tiếp chia sẻ)",
                "Membership Area riêng & Tool lọc kịch bản song ngữ",
                "Cập nhật định kỳ Tool AI & Cách dùng mới",
                "Support 1-1 trực tiếp từ đội ngũ"
            ]
        }
        : {
            title: "Ưu đãi đặc biệt",
            desc: "Gói Starter là khởi đầu tốt. Nhưng để bùng nổ traffic thực sự, bạn cần Full 1000+ Prompt của gói Pro Creator.",
            targetPlan: "Pro Creator",
            basePrice: 399000,
            paidAmount: 199000,
            upgradePrice: 200000,
            upgradeTierId: 'pro' as const,
            features: [
                "Truy cập 1000+ Prompt Viral",
                "Update Prompt mới hàng tuần",
                "Mở khóa Case Study phân tích sâu",
                "Tham gia cộng đồng Pro Creator"
            ]
        };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Pass status=skipped to show thank you page for original purchase
                    router.push(`/payment-success?status=skipped&planId=${fromPlan}`);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [router, fromPlan]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleUpgradeSuccess = () => {
        upgradeTier(content.upgradeTierId);
        setIsPaymentOpen(false);
        // Redirect to success page for the UPGRADED plan
        router.push(`/payment-success?orderCode=UPGRADE-${Date.now()}&planId=${content.targetPlan}`);
    };

    const handleSkip = () => {
        if (isProToElite) {
            upgradeTier('pro');
        } else {
            upgradeTier('starter');
        }
        // Redirect to success page for the ORIGINAL plan (declined upsell)
        router.push(`/payment-success?status=skipped&planId=${fromPlan}`);
    };

    return (
        <div className="min-h-screen bg-[#030712] relative overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Background Branding */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-cyberpunk opacity-40"></div>
                {/* Logo Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none">
                    <Image
                        src="/logo-app.png"
                        alt="Background Logo"
                        fill
                        className="object-contain grayscale"
                    />
                </div>
                {/* Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl">
                {/* Header Status */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 font-mono font-bold animate-pulse mb-6">
                        <Clock className="w-4 h-4" />
                        Ưu đãi kết thúc sau: {formatTime(timeLeft)}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                        Khoan đã! Đừng bỏ lỡ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink">
                            Cơ hội nâng cấp duy nhất này
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {content.desc}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left: Product Value */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-brand-cyan relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Star className="w-24 h-24 text-brand-cyan" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6">{content.targetPlan} bao gồm:</h3>
                            <ul className="space-y-4">
                                {content.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-brand-cyan shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right: Pricing & Action */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-brand-navy border border-brand-cyan/30 rounded-2xl p-8 relative shadow-2xl shadow-brand-cyan/10"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-purple text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                            TIẾT KIỆM 40% NGAY HÔM NAY
                        </div>

                        <div className="text-center mb-8 mt-4">
                            <div className="text-gray-400 line-through text-lg">{content.basePrice.toLocaleString()}đ</div>
                            <div className="text-4xl font-bold text-white mb-2">
                                Chỉ thêm: <span className="text-brand-cyan">{content.upgradePrice.toLocaleString()}đ</span>
                            </div>
                            <p className="text-sm text-gray-500">
                                (Đã trừ {content.paidAmount.toLocaleString()}đ bạn vừa thanh toán)
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Button
                                variant="cyber"
                                className="w-full py-6 text-lg uppercase tracking-wide font-bold shadow-lg shadow-brand-cyan/20 animate-pulse-glow"
                                onClick={() => setIsPaymentOpen(true)}
                            >
                                Đồng ý nâng cấp ngay
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <button
                                onClick={handleSkip}
                                className="w-full text-center text-gray-500 hover:text-white text-sm hover:underline transition-colors py-2"
                            >
                                Không cảm ơn, tôi sẽ giữ gói {fromPlan}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <PayOSModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                planName={`Nâng cấp ${content.targetPlan}`}
                planId={content.targetPlan.toLowerCase()}
                amount={content.upgradePrice}
                onSuccess={handleUpgradeSuccess}
            />
        </div>
    );
}

export default function UpsellPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">Loading...</div>}>
            <UpsellContent />
        </Suspense>
    );
}
