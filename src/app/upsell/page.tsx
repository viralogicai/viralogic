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
                        Ưu đãi sẽ đóng lại sau: {formatTime(timeLeft)}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                        {content.title}
                    </h1>

                    <div className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        {content.desc}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
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
                                        <CheckCircle className="w-6 h-6 text-brand-cyan shrink-0 mt-0.5" />
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
                        <div className="text-center mb-8 mt-4">
                            <div className="text-gray-500 mb-1">Giá thông thường</div>
                            <div className="text-gray-400 line-through text-xl">{content.basePrice.toLocaleString()}đ</div>
                            <div className="mt-4">
                                <span className="text-gray-300">Giá đặc biệt hôm nay:</span>
                                <div className="text-5xl font-bold text-brand-cyan mt-2">
                                    {content.upgradePrice.toLocaleString()}đ
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                variant="cyber"
                                className="w-full py-6 text-lg tracking-wide font-bold shadow-lg shadow-brand-cyan/20 animate-pulse-glow"
                                onClick={() => setIsPaymentOpen(true)}
                            >
                                {content.ctaText}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <p className="text-xs text-center text-gray-500 mb-4">(Truy cập đầy đủ ngay lập tức)</p>

                            <button
                                onClick={handleSkip}
                                className="w-full text-center text-gray-500 hover:text-white text-sm hover:underline transition-colors py-2 px-4"
                            >
                                {content.skipText}
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
