'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, ExternalLink, Mail } from 'lucide-react';
import { Button } from './Button';
import { QRCodeSVG } from 'qrcode.react';
import NextImage from 'next/image';
import { createPaymentLink, pollPaymentStatus, generateOrderCode } from '../lib/payos';
import type { PaymentResponse } from '../lib/payos';

interface PayOSModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planId: string;
    amount: number;
    onSuccess: () => void;
}

type PaymentState = 'input_email' | 'loading' | 'ready' | 'polling' | 'success' | 'error';

export const PayOSModal = ({ isOpen, onClose, planName, planId, amount, onSuccess }: PayOSModalProps) => {
    const [paymentState, setPaymentState] = useState<PaymentState>('input_email');
    const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [orderCode, setOrderCode] = useState<number>(0);
    const [email, setEmail] = useState('');
    const [stopPolling, setStopPolling] = useState<(() => void) | null>(null);

    // Initialize state when modal opens
    useEffect(() => {
        if (isOpen) {
            setPaymentState('input_email');
            setErrorMessage('');
            setEmail('');
        }
    }, [isOpen]);

    const handleCreatePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setErrorMessage('Vui lòng nhập email hợp lệ');
            return;
        }

        setPaymentState('loading');
        setErrorMessage('');

        const newOrderCode = generateOrderCode();
        setOrderCode(newOrderCode);

        try {
            const response = await createPaymentLink({
                orderCode: newOrderCode,
                amount,
                // Use Order Code for description as requested
                description: `${newOrderCode}`,
                planId,
                buyerEmail: email
            });

            setPaymentData(response);
            setPaymentState('ready');

            // Start polling for payment status
            const cleanup = pollPaymentStatus(
                newOrderCode,
                () => {
                    setPaymentState('success');
                    setTimeout(() => {
                        onSuccess();
                    }, 1500);
                },
                (error) => {
                    if (error.message !== 'Payment timeout') {
                        setErrorMessage(error.message);
                        setPaymentState('error');
                    }
                }
            );
            setStopPolling(() => cleanup);

        } catch (error) {
            console.error('Payment initialization error:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Không thể tạo link thanh toán');
            setPaymentState('error');
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup polling on unmount
            if (stopPolling) {
                stopPolling();
            }
        };
    }, [stopPolling]);

    // Handle close
    const handleClose = () => {
        if (stopPolling) {
            stopPolling();
        }
        onClose();
    };

    // Open checkout URL in new tab
    const openCheckoutUrl = () => {
        if (paymentData?.checkoutUrl) {
            window.open(paymentData.checkoutUrl, '_blank');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/90 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg bg-brand-navy border border-brand-primary/20 rounded-2xl overflow-hidden relative shadow-2xl shadow-brand-purple/20 max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white z-50 p-2 bg-brand-navy/80 rounded-full backdrop-blur-sm"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-display font-bold text-white mb-2">
                                    {paymentState === 'success' ? 'Thanh toán thành công!' : 'Thanh toán an toàn'}
                                </h3>
                                <p className="text-gray-400">
                                    Gói <span className="text-brand-cyan font-bold">{planName}</span> -
                                    <span className="text-gradient-brand font-bold"> {amount.toLocaleString()}đ</span>
                                </p>
                            </div>

                            {/* Email Input Step */}
                            {paymentState === 'input_email' && (
                                <form onSubmit={handleCreatePayment} className="space-y-6">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email của bạn (để nhận thông báo)
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-brand-dark border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan transition-colors"
                                                placeholder="name@example.com"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg">
                                            {errorMessage}
                                        </p>
                                    )}

                                    <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                                        Tiếp tục thanh toán
                                    </Button>
                                </form>
                            )}

                            {/* Loading State */}
                            {paymentState === 'loading' && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="animate-spin w-12 h-12 border-4 border-brand-cyan border-t-transparent rounded-full mb-4" />
                                    <p className="text-gray-400">Đang tạo link thanh toán...</p>
                                </div>
                            )}

                            {/* Error State */}
                            {paymentState === 'error' && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                                    <p className="text-red-400 text-center mb-4">{errorMessage}</p>
                                    <Button variant="primary" onClick={() => setPaymentState('input_email')}>
                                        Thử lại
                                    </Button>
                                </div>
                            )}

                            {/* Success State */}
                            {paymentState === 'success' && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 10 }}
                                    >
                                        <CheckCircle className="w-20 h-20 text-emerald-400 mb-4" />
                                    </motion.div>
                                    <p className="text-emerald-400 text-lg font-bold">Thanh toán thành công!</p>
                                    <p className="text-gray-400 text-sm mt-2">Đang chuyển hướng...</p>
                                </div>
                            )}

                            {/* Ready State - Show QR */}
                            {(paymentState === 'ready' || paymentState === 'polling') && paymentData && (
                                <>
                                    <div className="flex flex-col md:flex-row items-center gap-8 justify-center mb-8">
                                        {/* QR Box */}
                                        <div className="bg-white p-4 rounded-xl shadow-2xl relative group w-48 h-48 flex items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 border-2 border-brand-cyan opacity-50 rounded-lg pointer-events-none"></div>
                                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-[scan_2s_ease-in-out_infinite] z-10"></div>

                                            {paymentData.qrCode ? (
                                                <div className="bg-white p-2 rounded-lg">
                                                    <QRCodeSVG
                                                        value={paymentData.qrCode}
                                                        size={160}
                                                        level="M"
                                                        includeMargin={true}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-600 mb-2">Chuyển khoản đến:</p>
                                                    <p className="font-mono text-sm font-bold text-black">{paymentData.accountNumber}</p>
                                                    <p className="text-xs text-gray-600 mt-1">{paymentData.accountName}</p>
                                                </div>
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

                                            {/* Bank transfer info */}
                                            <div className="mt-4 p-3 bg-white/5 rounded-lg">
                                                <p className="text-xs text-gray-400 mb-1">Số tài khoản:</p>
                                                <p className="font-mono text-brand-cyan font-bold">{paymentData.accountNumber}</p>
                                                <p className="text-xs text-gray-400 mt-2 mb-1">Nội dung CK:</p>
                                                <p className="font-mono text-white text-xs">{paymentData.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkout URL button */}
                                    <div className="border-t border-white/5 pt-6 text-center space-y-3">
                                        <Button
                                            variant="outline"
                                            onClick={openCheckoutUrl}
                                            className="w-full flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Mở trang thanh toán PayOS
                                        </Button>

                                        <p className="text-[10px] text-gray-500">
                                            Mã đơn hàng: <span className="font-mono">{orderCode}</span>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
