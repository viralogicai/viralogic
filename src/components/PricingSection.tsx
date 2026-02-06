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
    features: [
      'Bộ hướng dẫn AI nền tảng',
      'Viết kịch bản ngắn & Hook',
      'Đủ để hiểu hệ thống hoạt động',
      'Không lan man, không quá tải',
    ],
    highlight: false,
    note:
      'Starter tập trung giúp bạn làm đúng thứ tự ban đầu.\nKhông bao gồm pipeline sản xuất & scaling.',
    ctaNote:
      'Bắt đầu với Starter để làm đúng thứ tự.\nSau khi rõ quy trình, bạn có thể nâng cấp Pro để sản xuất & mở rộng nội dung.',
  },
  {
    id: 'pro',
    name: 'Pro Creator — Hệ thống',
    price: 999000,
    originalPrice: 1299000,
    features: [
      'Toàn bộ 100+ kịch bản AI',
      'PDF Guide: Quy trình xây kênh',
      'Từ ý tưởng → Hook → Script',
      'Mỗi video là một lần test',
    ],
    highlight: true,
    tag: 'Best Seller',
  },
];

interface PricingSectionProps {
  onModalOpenChange?: (isOpen: boolean) => void;
}

export const PricingSection = ({ onModalOpenChange }: PricingSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const router = useRouter();
  const { upgradeTier } = useAuth();

  const handleSuccess = () => {
    if (!selectedPlan) return;

    if (selectedPlan.id === 'starter') upgradeTier('starter');
    if (selectedPlan.id === 'pro') upgradeTier('pro');

    router.push(`/upsell?fromPlan=${selectedPlan.id}`);
    setSelectedPlan(null);
  };

  return (
    <section id="pricing" className="py-24 px-4 bg-brand-dark relative z-10">
      <ScrollReveal width="100%">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl border bg-white/5 border-white/10"
              >
                <h3 className="text-xl font-medium text-white mb-2">
                  {plan.name}
                </h3>

                <div className="text-3xl font-bold text-white mb-6">
                  {plan.price.toLocaleString('vi-VN')}đ
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-2 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-brand-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* 🔥 NÚT MUA – CHỈ CẦN isPurchase */}
                <Button
                  isPurchase
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
