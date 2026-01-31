import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { PayOSModal } from './PayOSModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { ScrollReveal } from './ScrollReveal';

const plans = [
    {
        id: 'starter',
        name: 'Starter — Bắt đầu đúng',
        price: 199000,
        features: ['Bộ hướng dẫn AI nền tảng', 'Viết kịch bản ngắn & Hook', 'Đủ để hiểu hệ thống hoạt động', 'Không lan man, không quá tải'],
        highlight: false,
        note: "Starter tập trung giúp bạn làm đúng thứ tự ban đầu.\nKhông bao gồm pipeline sản xuất & scaling.",
        ctaNote: "Bắt đầu với Starter để làm đúng thứ tự.\nSau khi rõ quy trình, bạn có thể nâng cấp Pro để sản xuất & mở rộng nội dung."
    },
    {
        id: 'pro',
        name: 'Pro Creator — Hệ thống',
        price: 399000,
        originalPrice: 999000,
        features: ['Toàn bộ 1000+ kịch bản AI', 'PDF Guide: Quy trình xây kênh', 'Từ ý tưởng → Hook → Script', 'Mỗi video là một lần test'],
        highlight: true,
        tag: 'Best Seller'
    },
    {
        id: 'vip_mentorship',
        name: 'VIP Mentorship — Đi nhanh',
        price: 999000,
        features: ['Toàn bộ quyền lợi gói Pro', '3-5 Video Masterclass độc quyền', 'Membership Area riêng Updates', 'Công cụ lọc kịch bản song ngữ'],
        highlight: false
    }
];

interface PricingSectionProps {
    onModalOpenChange?: (isOpen: boolean) => void;
}

export const PricingSection = ({ onModalOpenChange }: PricingSectionProps) => {
    const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
    const router = useRouter();
    const { upgradeTier } = useAuth();

    const handleSuccess = () => {
        if (selectedPlan) {
            // Update Context
            if (selectedPlan.id === 'starter') upgradeTier('starter');
            if (selectedPlan.id === 'pro') upgradeTier('pro');
            if (selectedPlan.id === 'vip_mentorship') upgradeTier('vip_mentorship');

            // Routing Logic
            if (selectedPlan.id === 'pro') {
                router.push('/upsell?fromPlan=pro');
            } else {
                router.push('/membership');
            }
            setSelectedPlan(null);
        }
    };

    return (
        <section id="pricing" className="py-24 px-4 bg-brand-dark relative z-10">
            <ScrollReveal width="100%">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                            ViraLogic AI được chia thành <span className="text-brand-cyan">3 cấp độ</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            ViraLogic AI không bán “nhiều hay ít prompt”. <br className="hidden md:block" />
                            Chúng tôi bán đúng thứ bạn cần ở đúng thời điểm.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto mb-12">
                        {plans.filter(p => p.id !== 'vip_mentorship').map((plan) => (
                            <motion.div
                                key={plan.id}
                                whileHover={{ y: -10 }}
                                className={`relative p-8 rounded-2xl border backdrop-blur-sm ${plan.highlight ? 'bg-brand-navy/60 border-brand-cyan/50 shadow-[0_0_40px_rgba(6,182,212,0.15)] col-span-1 md:scale-105' : 'bg-white/5 border-white/10 hover:bg-white/10'} transition-all`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                        {plan.tag}
                                    </div>
                                )}

                                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-3xl font-bold text-white">{plan.price.toLocaleString('vi-VN')}đ</span>
                                    {plan.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through">{plan.originalPrice.toLocaleString('vi-VN')}đ</span>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                            <Check className={`w-5 h-5 ${plan.highlight ? 'text-brand-cyan' : 'text-gray-500'} shrink-0`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {(plan as any).note && (
                                    <div className="mb-6 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">
                                            ⚠️ {(plan as any).note}
                                        </p>
                                    </div>
                                )}

                                {(plan as any).ctaNote && (
                                    <p className="text-[10px] text-gray-500 mb-2 whitespace-pre-line text-center">
                                        {(plan as any).ctaNote}
                                    </p>
                                )}

                                <Button
                                    variant={plan.highlight ? 'primary' : 'outline'}
                                    className="w-full"
                                    onClick={() => {
                                        setSelectedPlan(plan);
                                        onModalOpenChange?.(true);
                                    }}
                                >
                                    {plan.highlight ? 'Sở hữu ngay' : 'Chọn gói này'}
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center max-w-2xl mx-auto bg-white/5 border border-white/10 p-6 rounded-xl">
                        <p className="text-gray-300 italic font-medium">
                            "Bạn có thể mua kịch bản ở bất kỳ đâu. <br />
                            Nhưng thứ tự sử dụng & cách ra quyết định chỉ tồn tại trong một hệ thống."
                        </p>
                    </div>
                </div>
            </ScrollReveal>

            <PayOSModal
                isOpen={!!selectedPlan}
                onClose={() => {
                    setSelectedPlan(null);
                    onModalOpenChange?.(false);
                }}
                planName={selectedPlan?.name || ''}
                planId={selectedPlan?.id || ''}
                amount={selectedPlan?.price || 0}
                onSuccess={handleSuccess}
            />
        </section>
    );
};
