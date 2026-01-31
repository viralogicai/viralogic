'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PayOSModal } from '@/components/PayOSModal';
import { Clock, ShieldCheck, Star, Video, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import Image from 'next/image';

const UpsellContent = () => {
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
            // PRO -> VIP MASTERCLASS
            title: <>Bạn đã có công cụ.<br />Nhưng bạn có chắc mình đang đi nhanh nhất?</>,
            desc: (
                <div className="space-y-4 text-left">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="font-bold text-white mb-2">Gói Pro giúp bạn:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li>Có đủ prompt</li>
                            <li>Có quy trình rõ ràng</li>
                            <li>Không làm TikTok theo cảm hứng nữa</li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-bold text-lg text-white">Nhưng có một sự thật là:</p>
                        <p className="text-brand-pink font-bold text-xl my-2">👉 Có công cụ ≠ đi nhanh.</p>
                        <p className="mb-2 text-gray-300">Phần lớn người dùng Pro vẫn: Tự test, Tự đoán, Tự sắp xếp lại thứ tự...</p>
                        <p className="italic text-gray-400">Và điều đó tốn thời gian hơn bạn nghĩ.</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                        <p className="font-bold text-brand-cyan mb-2 uppercase text-sm">Vip Masterclass ĐƯỢC TẠO RA CHO AI?</p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-brand-purple shrink-0 mt-1" /> Bạn không muốn tự mò nữa</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-brand-purple shrink-0 mt-1" /> Bạn muốn biết chính xác nên làm gì trước – sau</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-brand-purple shrink-0 mt-1" /> Bạn muốn rút ngắn vài tháng thử–sai</li>
                        </ul>
                    </div>
                </div>
            ),
            targetPlan: "Vip Masterclass",
            basePrice: 2999000,
            upgradePrice: 1999000,
            upgradeTierId: 'vip_mentorship' as const,
            features: [
                "Toàn bộ quyền lợi gói Pro",
                "3–5 Video Masterclass (Đi đúng thứ tự & Giải thích tại sao)",
                "Membership Area riêng (Xem video trực tiếp, không lan man)",
                "Bonus: Danh sách công cụ AI & Update định kỳ",
                "👉 Vip Masterclass loại bỏ việc thừa"
            ],
            ctaText: "Nâng cấp lên Vip Masterclass – 1.999.000đ",
            skipText: "Bạn có thể tiếp tục với Pro. Vip Masterclass chỉ dành cho người muốn đi nhanh hơn."
        }
        : {
            // STARTER -> PRO UPSELL
            title: <>Bạn đã bắt đầu đúng thứ tự.<br />Muốn đi nhanh hơn không?</>,
            desc: (
                <div className="space-y-4 text-left">
                    <p>Bạn vừa quyết định không làm TikTok theo cảm hứng nữa. Đó là bước khó nhất.</p>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="font-bold text-white mb-2">Gói Starter giúp bạn:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li>Gỡ rối</li>
                            <li>Làm đúng thứ tự</li>
                            <li>Không mò mẫm như trước</li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-2">Nhưng nếu bạn muốn:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li>Không muốn tự sắp xếp lại mọi thứ</li>
                            <li>Muốn có đủ kịch bản cho từng mục tiêu</li>
                            <li>Triển khai nhanh hơn thay vì thử – sai</li>
                        </ul>
                    </div>
                    <p className="font-bold text-brand-cyan">👉 Phiên bản Pro được tạo ra cho giai đoạn đó.</p>
                </div>
            ),
            targetPlan: "Pro Creator",
            basePrice: 999000,
            upgradePrice: 699000,
            upgradeTierId: 'pro' as const,
            features: [
                "100+ Prompt độc quyền (Tăng view, Follow, Bán hàng)",
                "PDF Guide: Quy trình xây kênh từ A–Z",
                "Không dắt tay từng ngày - Không học lan man",
                "👉 Chỉ tập trung vào triển khai nhanh & đúng"
            ],
            ctaText: "Nâng cấp lên Pro – 699.000đ",
            skipText: "Không sao cả. Bạn vẫn có thể bắt đầu với Starter và nâng cấp sau."
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
        <div className="min-h-screen bg-[#030712] relative overflow-hidden flex flex-col items-center justify-center p-4 font-body">
            {/* Background Dynamics */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 mask-gradient" />
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-purple/20 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
            </div>

            <div className="relative z-10 w-full max-w-5xl">
                {/* Timer Badge */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)] backdrop-blur-md animate-pulse">
                        <Clock className="w-5 h-5 text-red-400" />
                        <span className="font-mono text-xl font-bold text-red-400 tracking-widest">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-0 lg:gap-8 items-stretch">
                    {/* LEFT COLUMN - CONTENT (Span 3) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3 flex flex-col justify-center"
                    >
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
                                {content.title}
                            </h1>
                            <div className="text-gray-300 text-lg leading-relaxed">
                                {content.desc}
                            </div>
                        </div>

                        {/* Feature Highlight Piks */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {content.features.map((feature, i) => (
                                <div key={i} className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-brand-purple/10 hover:border-brand-purple/30 transition-all duration-300">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-pink shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{feature}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN - OFFER CARD (Span 2) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 mt-12 lg:mt-0"
                    >
                        <div className="relative h-full bg-brand-dark/80 backdrop-blur-2xl border border-brand-purple/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-brand-purple/20 overflow-hidden group">
                            {/* Decor Glow */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-brand-pink/20 to-brand-purple/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-75 transition-opacity duration-700" />

                            <div className="relative z-10 text-center">
                                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-6">
                                    Special Upgrade Offer
                                </div>

                                <div className="space-y-1 mb-8">
                                    <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">Giá gốc</div>
                                    <div className="text-2xl text-gray-500 line-through decoration-red-500/50 decoration-2">{content.basePrice.toLocaleString('vi-VN')}đ</div>

                                    <div className="h-px w-20 bg-white/10 mx-auto my-4" />

                                    <div className="text-white text-sm font-bold mb-1">CHỈ CÒN</div>
                                    <div className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink drop-shadow-md">
                                        {content.upgradePrice.toLocaleString('vi-VN')}
                                        <span className="text-2xl ml-1 text-brand-pink">đ</span>
                                    </div>
                                </div>

                                <Button
                                    variant="cyber"
                                    className="w-full py-6 text-lg font-bold shadow-xl shadow-brand-purple/20 hover:shadow-brand-purple/40 hover:scale-[1.02] transition-all duration-300 group-hover:animate-pulse-slow"
                                    onClick={() => setIsPaymentOpen(true)}
                                >
                                    {content.ctaText}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>

                                <p className="mt-4 text-[10px] text-gray-400 font-medium tracking-wide opacity-70">
                                    ⚡ Kích hoạt ngay lập tức sau khi thanh toán
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 pt-6 border-t border-white/5 text-center">
                                <button
                                    onClick={handleSkip}
                                    className="text-gray-500 hover:text-white text-sm transition-colors hover:underline decoration-brand-cyan/50 underline-offset-4"
                                >
                                    {content.skipText}
                                </button>
                            </div>
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
