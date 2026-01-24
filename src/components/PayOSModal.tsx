import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode } from 'lucide-react';
import { Button } from './Button';
import { createPaymentLink } from '../lib/payos';

interface PayOSModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    amount: number;
    onSuccess: () => void;
}

export const PayOSModal = ({ isOpen, onClose, planName, amount, onSuccess }: PayOSModalProps) => {
    const [isSimulating, setIsSimulating] = useState(false);
    const [isLoadingQR, setIsLoadingQR] = useState(false);

    useEffect(() => {
        const initPayment = async () => {
            if (isOpen) {
                setIsLoadingQR(true);
                // Mock creation call
                await createPaymentLink({
                    orderCode: Date.now(),
                    amount,
                    description: `Mua goi ${planName}`,
                    cancelUrl: window.location.href,
                    returnUrl: window.location.href
                });
                setIsLoadingQR(false);
            }
        };
        initPayment();
    }, [isOpen, amount, planName]);

    const handleSimulateSuccess = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setIsSimulating(false);
            onSuccess();
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/90 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg bg-brand-navy border border-brand-primary/20 rounded-2xl overflow-hidden relative shadow-2xl shadow-brand-purple/20"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Thanh toán an toàn</h3>
                                <p className="text-gray-400">Gói <span className="text-brand-cyan font-bold">{planName}</span> - <span className="text-gradient-brand font-bold">{amount.toLocaleString()}đ</span></p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8 justify-center mb-8">
                                {/* QR Box */}
                                <div className="bg-white p-4 rounded-xl shadow-2xl relative group w-48 h-48 flex items-center justify-center">
                                    {isLoadingQR ? (
                                        <div className="animate-spin w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full" />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 border-2 border-brand-cyan opacity-50 rounded-lg pointer-events-none"></div>
                                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-[scan_2s_ease-in-out_infinite] z-10"></div>

                                            <div className="text-center">
                                                <QrCode className="w-20 h-20 text-black mx-auto opacity-80" />
                                                <p className="text-[10px] text-gray-500 font-mono mt-2 uppercase font-bold">Quét VietQR</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Instructions */}
                                <div className="space-y-4 text-sm text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold text-xs shrink-0">1</div>
                                        <p>Mở App Ngân hàng bất kỳ</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold text-xs shrink-0">2</div>
                                        <p>Quét mã QR bên cạnh</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold text-xs shrink-0">3</div>
                                        <p>Hệ thống tự động xác nhận</p>
                                    </div>
                                </div>
                            </div>

                            {/* Dev Only: Simulate Button */}
                            <div className="border-t border-white/5 pt-6 text-center">
                                <Button
                                    variant="primary"
                                    onClick={handleSimulateSuccess}
                                    disabled={isSimulating}
                                    className="w-full"
                                >
                                    {isSimulating ? 'Processing...' : 'Simulate Payment Success (Dev)'}
                                </Button>
                                <p className="text-[10px] text-gray-500 mt-2">*This is a simulator for development</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
