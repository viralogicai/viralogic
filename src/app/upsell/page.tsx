'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PayOSModal } from '@/components/PayOSModal';
import { Clock, ShieldCheck, Star, Video } from 'lucide-react';
import { Button } from '@/components/Button';

function UpsellContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { upgradeTier } = useAuth();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Determine Upsell Context from Query Params
    const fromPlan = searchParams.get('fromPlan') || 'starter'; // 'starter' or 'pro'
    const isProToElite = fromPlan === 'pro';

    // Dynamic Content Configuration
    const content = isProToElite
        ? {
            title: "Ưu đãi VIP độc quyền",
            desc: "Bạn đã chọn gói Pro. Tuy nhiên, các Creator thu nhập 9 con số đều sở hữu gói Elite để nhận Coaching 1-1.",
            benefit: "Video Masterclass + 1:1 Support",
            targetPlan: "Elite (VIP)",
            basePrice: 999000,
            paidAmount: 399000,
            upgradePrice: 600000,
            upgradeTierId: 'elite' as const,
            icon: <Video className="w-12 h-12 text-brand-cyan mb-4 mx-auto" />
        }
        : {
            title: "Ưu đãi độc quyền",
            desc: "Bạn đã sở hữu gói Starter. Nhưng để bùng nổ traffic thực sự, bạn cần Full 1000+ Prompt của gói Pro.",
            benefit: "Full 1000+ Prompt",
            targetPlan: "Pro Creator",
            basePrice: 399000,
            paidAmount: 199000,
            upgradePrice: 200000,
            upgradeTierId: 'pro' as const,
            icon: <Star className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
        };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/membership'); // Auto skip if time runs out
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [router]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleUpgradeSuccess = () => {
        upgradeTier(content.upgradeTierId);
        setIsPaymentOpen(false);
        router.push('/membership');
    };

    const handleSkip = () => {
        // If skipping, they keep their originally selected tier
        if (isProToElite) {
            upgradeTier('pro');
        } else {
            upgradeTier('starter');
        }
        router.push('/membership');
    };

    return (
        <div className="min-h-screen bg-[#050814] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-cyberpunk opacity-50 z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl w-full text-center my-12">

                {/* Anchor Text - Mental Anchor */}
                {isProToElite && (
                    <div className="mb-8 text-sm text-gray-400 max-w-lg mx-auto bg-black/40 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                        Bạn đã có đầy đủ công cụ để triển khai. <br className="md:hidden" /> Phần dưới đây chỉ dành cho người muốn đi nhanh hơn.
                    </div>
                )}

                {/* Timer Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/50 text-red-500 font-mono font-bold text-xl mb-6 animate-pulse">
                    <Clock className="w-5 h-5" />
                    {formatTime(timeLeft)}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 md:p-10 rounded-3xl relative text-left"
                >
                    {isProToElite ? (
                        <>
                            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 text-center">
                                Elite không giúp bạn làm nhiều hơn. <br />
                                <span className="text-brand-cyan">Elite giúp bạn biết sửa đúng chỗ.</span>
                            </h1>
                            <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto text-sm md:text-base">
                                Bạn vừa mua Pro — đủ để làm bài bản. Elite tồn tại cho những lúc video không giữ người, kênh đứng view mà bạn không biết sửa ở đâu.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></div> Quyết định khi kẹt
                                    </h3>
                                    <p className="text-sm text-gray-400">Khi video flop → sửa đúng 1 biến, không đập lại tất cả. Khi kênh đứng → biết test tiếp hay đổi format.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></div> Góc nhìn người đi trước
                                    </h3>
                                    <p className="text-sm text-gray-400">Những lỗi phổ biến không ai ghi trong PDF. Những thứ chỉ thấy sau khi đã triển khai thật.</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 bg-brand-cyan/5 p-6 rounded-xl border border-brand-cyan/10">
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0" />
                                    <span>3–5 Video Masterclass (Bee trực tiếp chia sẻ)</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0" />
                                    <span>Membership Area riêng & Tool lọc kịch bản song ngữ</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <ShieldCheck className="w-5 h-5 text-brand-cyan shrink-0" />
                                    <span>Cập nhật định kỳ Tool AI & Cách dùng mới</span>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <div className="text-center">
                            {content.icon}
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                Khoan đã! <br />
                                <span className="text-brand-cyan">{content.title}</span> dành cho bạn
                            </h1>
                            <p className="text-gray-400 text-lg mb-8">
                                {content.desc}
                            </p>
                        </div>
                    )}


                    <div className="bg-brand-cyan/5 border border-brand-cyan/20 p-6 rounded-xl mb-8">
                        <div className="flex justify-between items-center mb-4 border-b border-brand-cyan/10 pb-4">
                            <span className="text-gray-400">{content.targetPlan}</span>
                            <span className="text-2xl font-bold text-white">{content.basePrice.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-400">Bạn đã trả ({isProToElite ? 'Pro' : 'Starter'})</span>
                            <span className="text-red-400 font-mono">-{content.paidAmount.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between items-center text-brand-cyan font-bold text-xl mt-4 pt-4 border-t border-brand-cyan/20">
                            <span>Nâng cấp ngay chỉ:</span>
                            <span>{content.upgradePrice.toLocaleString()}đ</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            variant="cyber"
                            className="w-full py-6 text-lg uppercase tracking-wide font-bold"
                            onClick={() => setIsPaymentOpen(true)}
                        >
                            {isProToElite ? 'Mở quyền truy cập ELITE ngay bây giờ' : `Nâng cấp ngay - Chỉ ${content.upgradePrice.toLocaleString()}đ`}
                        </Button>
                        <button
                            onClick={handleSkip}
                            className="block mx-auto text-gray-500 hover:text-white text-sm underline decoration-gray-700 underline-offset-4 transition-colors text-center"
                        >
                            {isProToElite ? 'Không phải lúc này? Bạn vẫn có thể triển khai đầy đủ với gói Pro.' : 'Không cảm ơn, tôi sẽ dùng gói Starter'}
                        </button>
                    </div>

                    <div className="mt-8 text-center text-xs text-gray-500 italic">
                        {isProToElite ? (
                            "Bạn có thể tự mò và sẽ học được. Elite chỉ giúp bạn trả giá bằng tiền thay vì thời gian."
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                Thanh toán 1 chạm - Kích hoạt ngay lập tức
                            </span>
                        )}
                    </div>
                </motion.div>
            </div>

            <PayOSModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                planName={`Upgrade to ${content.targetPlan}`}
                planId={content.targetPlan.toLowerCase()}
                amount={content.upgradePrice}
                onSuccess={handleUpgradeSuccess}
            />
        </div>
    );
}

export default function UpsellPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-dark text-white">Loading...</div>}>
            <UpsellContent />
        </Suspense>
    );
}
