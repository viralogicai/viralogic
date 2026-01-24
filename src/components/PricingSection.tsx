import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { PayOSModal } from './PayOSModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        price: 199000,
        features: ['300 Prompt cơ bản', 'Hướng dẫn sử dụng PDF', 'Định dạng Notion/Excel'],
        highlight: false
    },
    {
        id: 'pro',
        name: 'Pro Creator',
        price: 399000,
        originalPrice: 999000,
        features: ['Full 1000+ Prompt', 'Template Content Calendar', 'Prompt chỉnh sửa Caption', 'Cập nhật miễn phí trọn đời'],
        highlight: true,
        tag: 'Best Seller'
    },
    {
        id: 'elite',
        name: 'Elite (VIP)',
        price: 999000,
        features: ['Mọi quyền lợi gói Pro', 'Bonus: Hook Generator Pack', 'Bonus: Sales Script Pack', 'Support 1-1 ưu tiên', 'Access Video Masterclass'],
        highlight: false
    }
];

export const PricingSection = () => {
    const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
    const navigate = useNavigate();
    const { upgradeTier } = useAuth();

    const handleSuccess = () => {
        if (selectedPlan) {
            // Update Context
            if (selectedPlan.id === 'starter') upgradeTier('starter');
            if (selectedPlan.id === 'pro') upgradeTier('pro');
            if (selectedPlan.id === 'elite') upgradeTier('elite');

            // Routing Logic
            if (selectedPlan.id === 'starter') {
                navigate('/upsell');
            } else {
                navigate('/membership');
            }
            setSelectedPlan(null);
        }
    };

    return (
        <section id="pricing" className="py-24 px-4 bg-brand-dark relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                        Đầu tư một lần, <span className="text-brand-cyan">dùng trọn đời</span>
                    </h2>
                    <p className="text-gray-400">Nhận link tải tự động ngay sau khi thanh toán.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            whileHover={{ y: -10 }}
                            className={`relative p-8 rounded-2xl border backdrop-blur-sm ${plan.highlight ? 'bg-brand-navy/60 border-brand-cyan/50 shadow-[0_0_40px_rgba(6,182,212,0.15)]' : 'bg-white/5 border-white/10 hover:bg-white/10'} transition-all`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    {plan.tag}
                                </div>
                            )}

                            <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-bold text-white">{plan.price.toLocaleString()}đ</span>
                                {plan.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">{plan.originalPrice.toLocaleString()}đ</span>
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

                            <Button
                                variant={plan.highlight ? 'primary' : 'outline'}
                                className="w-full"
                                onClick={() => setSelectedPlan(plan)}
                            >
                                {plan.highlight ? 'Sở hữu ngay' : 'Chọn gói này'}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <PayOSModal
                isOpen={!!selectedPlan}
                onClose={() => setSelectedPlan(null)}
                planName={selectedPlan?.name || ''}
                amount={selectedPlan?.price || 0}
                onSuccess={handleSuccess}
            />
        </section>
    );
};
