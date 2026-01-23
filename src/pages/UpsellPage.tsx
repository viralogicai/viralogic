import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PayOSModal } from '../components/PayOSModal';
import { Clock, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';

export const UpsellPage = () => {
    const navigate = useNavigate();
    const { upgradeTier } = useAuth();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/membership'); // Auto skip if time runs out
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleUpgradeSuccess = () => {
        upgradeTier('pro');
        setIsPaymentOpen(false);
        navigate('/membership');
    };

    const handleSkip = () => {
        navigate('/membership');
    };

    return (
        <div className="min-h-screen bg-[#050814] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-cyberpunk opacity-50 z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl w-full text-center">

                {/* Timer Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/50 text-red-500 font-mono font-bold text-xl mb-8 animate-pulse">
                    <Clock className="w-5 h-5" />
                    {formatTime(timeLeft)}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 md:p-12 rounded-3xl"
                >
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        Khoan đã! <br />
                        <span className="text-brand-cyan">Ưu đãi độc quyền</span> dành cho bạn
                    </h1>

                    <p className="text-gray-400 text-lg mb-8">
                        Bạn đã sở hữu gói Starter. Nhưng để bùng nổ traffic thực sự, bạn cần <b>Full 1000+ Prompt</b> của gói Pro.
                    </p>

                    <div className="bg-brand-cyan/5 border border-brand-cyan/20 p-6 rounded-xl mb-8 text-left">
                        <div className="flex justify-between items-center mb-4 border-b border-brand-cyan/10 pb-4">
                            <span className="text-gray-400">Gói Pro Creator</span>
                            <span className="text-2xl font-bold text-white">399k</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-400">Bạn đã trả (Starter)</span>
                            <span className="text-red-400 font-mono">-199k</span>
                        </div>
                        <div className="flex justify-between items-center text-brand-cyan font-bold text-xl mt-4 pt-4 border-t border-brand-cyan/20">
                            <span>Nâng cấp ngay chỉ:</span>
                            <span>200k</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            variant="cyber"
                            className="w-full py-6 text-lg"
                            onClick={() => setIsPaymentOpen(true)}
                        >
                            Nâng cấp ngay - Chỉ 200k
                        </Button>
                        <button
                            onClick={handleSkip}
                            className="text-gray-500 hover:text-white text-sm underline decoration-gray-700 underline-offset-4"
                        >
                            Không cảm ơn, tôi sẽ dùng gói Starter
                        </button>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
                        <ShieldCheck className="w-4 h-4" />
                        Thanh toán 1 chạm - Kích hoạt ngay lập tức
                    </div>
                </motion.div>
            </div>

            <PayOSModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                planName="Upgrade to Pro"
                amount={200000}
                onSuccess={handleUpgradeSuccess}
            />
        </div>
    );
};
