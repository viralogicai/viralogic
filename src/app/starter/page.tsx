"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, Download, Star, FileText, TrendingUp, PlayCircle, Plus, Hexagon, Circle } from 'lucide-react';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { PayOSModal } from '@/components/PayOSModal';

// Animated Background Elements using Framer Motion
const BackgroundShape = ({
    className,
    delay = 0,
    duration = 20,
    xRange = [-20, 20],
    yRange = [-20, 20],
    rotateRange = [0, 360],
    children
}: {
    className?: string,
    delay?: number,
    duration?: number,
    xRange?: number[],
    yRange?: number[],
    rotateRange?: number[],
    children?: React.ReactNode
}) => (
    <motion.div
        animate={{
            x: xRange,
            y: yRange,
            rotate: rotateRange
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: delay
        }}
        className={`absolute pointer-events-none ${className}`}
    >
        {children}
    </motion.div>
);

// Premium Background with Grid, Patterns and Floating Shapes
const PremiumBackground = () => (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#030712]">

        {/* Moving Dashed Cyberpunk Grid */}
        <motion.div
            initial={{ backgroundPosition: "0px 0px" }}
            animate={{ backgroundPosition: "40px 40px" }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
            }}
            className="absolute inset-0 opacity-[0.08]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40M0 0v40' stroke='white' stroke-width='1' stroke-dasharray='4 4' fill='none'/%3E%3C/svg%3E")`,
                maskImage: 'linear-gradient(to bottom, transparent, 10% white, 90% white, transparent)'
            }}
        />

        {/* Secondary Delicate Grid (Intersections) - Static for depth contrast */}
        <div className="absolute inset-0 opacity-[0.1]"
            style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}
        />

        {/* --- Gradient Orbs (Ambient Light) --- */}
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-brand-cyan/20 blur-[120px] rounded-full"
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, delay: 2, repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-brand-purple/20 blur-[120px] rounded-full"
        />
        <div className="absolute top-[40%] left-[60%] w-[500px] h-[500px] bg-brand-pink/10 blur-[150px] rounded-full" />


        {/* --- Floating Tech Shapes (Slightly fainter now) --- */}

        {/* 1. Hollow Circles */}
        <BackgroundShape
            className="top-[15%] right-[10%] w-24 h-24 border border-white/5 rounded-full"
            duration={15}
            yRange={[-30, 30]}
        />
        <BackgroundShape
            className="bottom-[25%] left-[5%] w-32 h-32 border border-white/5 rounded-full"
            duration={18}
            delay={2}
            rotateRange={[0, 0]}
        />

        {/* 2. Crosses (+ signs) */}
        <BackgroundShape
            className="top-[25%] left-[10%] text-white/10"
            duration={12}
            rotateRange={[0, 90]}
        >
            <Plus className="w-8 h-8" />
        </BackgroundShape>
        <BackgroundShape
            className="bottom-[40%] right-[15%] text-brand-cyan/30"
            duration={14}
            delay={1}
            rotateRange={[0, -90]}
        >
            <Plus className="w-12 h-12" />
        </BackgroundShape>

        {/* 3. Hexagons */}
        <BackgroundShape
            className="top-[45%] left-[5%] text-brand-purple/20"
            duration={20}
            rotateRange={[0, 180]}
        >
            <Hexagon className="w-16 h-16 stroke-1" />
        </BackgroundShape>

        {/* 4. Small decorative dots */}
        <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-brand-cyan/40 rounded-full animate-pulse" />
        <div className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-brand-pink/40 rounded-full animate-pulse delay-700" />
        <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-white/20 rounded-full" />

        {/* --- Beam Effects --- */}
        <div className="absolute top-0 left-1/4 w-[1px] h-[70vh] bg-gradient-to-b from-transparent via-white/5 to-transparent blur-[0.5px]" />
        <div className="absolute top-0 right-1/4 w-[1px] h-[60vh] bg-gradient-to-b from-transparent via-white/5 to-transparent blur-[0.5px]" />
    </div>
);

const SimpleNavbar = ({ onCtaClick }: { onCtaClick: () => void }) => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 group-hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden shadow-lg shadow-brand-cyan/20">
                    <Image
                        src="/logo.png"
                        alt="ViraLogic AI Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <span className="font-display font-bold text-white tracking-wider text-lg">
                    ViraLogic <span className="text-gradient-brand">AI</span>
                </span>
            </Link>
            <div className="hidden md:block">
                <Button variant="ghost" size="sm" onClick={onCtaClick} className="text-brand-cyan hover:bg-brand-cyan/10">
                    Get Starter Access
                </Button>
            </div>
        </div>
    </nav>
);

const ProductBox3D = () => (
    <div className="relative w-full aspect-square max-w-[400px] lg:max-w-[450px] mx-auto">
        <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative z-10"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 blur-[60px] rounded-full -z-10" />
            <img
                src="/product-box-transparent.png"
                alt="ViraLogic AI Product Box"
                className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,240,255,0.4)]"
            />
        </motion.div>

        {/* Floating Cards around box */}
        <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-0 right-[-10px] sm:right-[-30px] p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl z-20"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan shadow-lg shadow-brand-cyan/20">
                    <Download className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs font-bold text-white">Truy cập ngay</div>
                    <div className="text-[10px] text-gray-400">Hệ thống Online</div>
                </div>
            </div>
        </motion.div>

        <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-10 left-[-10px] sm:left-[-30px] p-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl z-20"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple shadow-lg shadow-brand-purple/20">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs font-bold text-white">1000+ Kịch bản</div>
                    <div className="text-[10px] text-gray-400">Đã kiểm chứng</div>
                </div>
            </div>
        </motion.div>
    </div>
);

export default function StarterPage() {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const router = useRouter();

    const handlePaymentSuccess = () => {
        setIsPaymentOpen(false);
        router.push('/membership'); // Or a specific thank you page
    };

    const openPayment = () => setIsPaymentOpen(true);

    return (
        <div className="min-h-screen text-white font-body selection:bg-brand-pink/30 selection:text-brand-pink-light overflow-x-hidden relative">
            <PremiumBackground />
            <SimpleNavbar onCtaClick={openPayment} />

            <main className="flex-grow pt-32 pb-20">

                {/* 1. HERO */}
                <section className="container max-w-7xl mx-auto px-6 mb-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-purple-light text-sm font-medium mb-8 backdrop-blur-md shadow-lg shadow-brand-purple/10">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-purple"></span>
                                </span>
                                Đừng tạo video rác nữa
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
                                Đừng tạo thêm video nữa <br />
                                <span className="text-gradient-brand">hãy tạo đúng video trước</span>
                            </h1>

                            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl">
                                Hệ thống AI giúp bạn biết nên làm gì trước, làm gì sau để video không bị lướt qua ngay 3 giây đầu.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={openPayment}
                                    className="shadow-xl shadow-brand-purple/20 hover:shadow-brand-purple/40"
                                >
                                    <Rocket className="w-5 h-5 mr-2" />
                                    Bắt đầu ngay — chỉ từ 199k
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Tìm hiểu thêm
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <ProductBox3D />
                        </motion.div>
                    </div>
                </section>

                {/* 2. PROBLEM */}
                <section id="problem" className="py-24 relative overflow-hidden">
                    {/* Decorative background element for section */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="container max-w-4xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-500 mb-6 shadow-lg border border-orange-500/20">
                                <AlertTriangle className="w-7 h-7" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">VẤN ĐỀ DUY NHẤT</h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Bạn không thiếu ý tưởng. Bạn thiếu <span className="text-white font-bold border-b-2 border-brand-cyan">thứ tự</span>.</p>
                        </div>

                        {/* FLOW LAYOUT CONTAINER */}
                        <div className="relative flex flex-col items-center">

                            {/* Central Vertical Line */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-12 w-0.5 bg-gradient-to-b from-transparent via-brand-purple/50 to-brand-cyan/50 hidden md:block"></div>

                            {/* Problem Items */}
                            <div className="w-full space-y-12 md:space-y-0 relative mb-16">
                                {[
                                    { text: "Hôm nay test hook", align: "left" },
                                    { text: "Mai đổi niche", align: "right" },
                                    { text: "Video flop không biết sửa gì", align: "left" }
                                ].map((item, idx) => (
                                    <div key={idx} className={`flex items-center w-full ${item.align === 'left' ? 'md:justify-start' : 'md:justify-end'} relative`}>

                                        {/* Connector Dot on Center Line (Desktop only) */}
                                        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-purple z-10 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>

                                        {/* Content Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                                            className={`
                                                relative w-full md:w-[45%] p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm 
                                                hover:bg-white/10 hover:border-white/10 transition-all cursor-default group
                                                ${item.align === 'left' ? 'md:mr-auto' : 'md:ml-auto'}
                                            `}
                                        >
                                            {/* Connector Line to Center (Desktop only) */}
                                            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[11%] h-px bg-brand-purple/30 ${item.align === 'left' ? '-right-[11%]' : '-left-[11%]'} `}></div>

                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-red-400 group-hover:shadow-[0_0_10px_rgba(248,113,113,0.5)] transition-shadow" />
                                                <p className="text-lg text-gray-300 group-hover:text-white transition-colors">{item.text}</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            {/* Final Solution Card - Centered at Bottom */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative w-full max-w-2xl p-10 rounded-3xl bg-gradient-to-br from-brand-purple/20 via-brand-dark to-brand-cyan/10 border border-brand-purple/30 text-center shadow-2xl overflow-hidden group z-20"
                            >
                                <div className="absolute inset-0 bg-brand-purple/10 blur-[50px] group-hover:bg-brand-purple/20 transition-colors duration-700" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4 text-white">Giải pháp</h3>
                                    <div className="text-4xl md:text-5xl font-display font-bold text-gradient-brand mb-4 drop-shadow-sm">ViraLogic AI</div>
                                    <p className="text-gray-300 text-lg">Sinh ra để giải quyết đúng điểm này.</p>
                                    <div className="mt-8 flex justify-center">
                                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent rounded-full opacity-50" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 3. START HERE */}
                <section className="py-32 relative">
                    <div className="container max-w-6xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">START HERE</h2>
                            <p className="text-xl text-gray-400">7 ngày đầu — chỉ cần làm đúng <span className="text-brand-cyan font-bold">3 việc</span></p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Mục Tiêu", desc: "Chọn đúng mục tiêu (view / follow / bán)", icon: TrendingUp, color: "text-brand-cyan", bg: "bg-brand-cyan/10" },
                                { title: "Test Hook", desc: "Test hook trước khi quay nhiều", icon: PlayCircle, color: "text-brand-purple", bg: "bg-brand-purple/10" },
                                { title: "Tối Ưu", desc: "Video flop → sửa 1 biến, không đập lại", icon: Star, color: "text-brand-pink", bg: "bg-brand-pink/10" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="relative p-8 rounded-3xl bg-brand-dark/50 border border-white/10 backdrop-blur-md hover:border-brand-purple/50 transition-all hover:-translate-y-2 hover:shadow-2xl group"
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <div className="absolute top-8 right-8 text-6xl font-display font-bold text-white/5 pointer-events-none select-none">0{idx + 1}</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <div className="inline-block p-4 rounded-xl bg-gradient-to-r from-brand-cyan/10 to-brand-purple/10 border border-brand-cyan/20">
                                <p className="text-lg text-white font-medium flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    ViraLogic AI đã sắp xếp sẵn để bạn chỉ việc triển khai.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. OFFER */}
                <section id="offer" className="py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-purple/5 pointer-events-none" />

                    <div className="container max-w-5xl mx-auto px-6 relative z-10">
                        <div className="bg-gradient-to-br from-brand-cyan via-brand-purple to-brand-pink p-[1px] rounded-[32px] shadow-2xl shadow-brand-purple/20">
                            <div className="bg-brand-dark/95 backdrop-blur-xl rounded-[31px] p-8 md:p-16 text-center relative overflow-hidden">
                                {/* Background fx */}
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-purple/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-cyan/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10 max-w-3xl mx-auto">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-purple/20 to-brand-pink/20 border border-brand-purple/30 text-white text-sm font-bold mb-8 shadow-lg">
                                        <Rocket className="w-4 h-4 text-brand-pink" />
                                        OFFER DUY NHẤT (DỄ TEST ADS)
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">ViraLogic AI – Starter</h3>
                                    <p className="text-gray-400 mb-10 text-lg">Bộ khởi động giúp bạn hiểu hệ thống và bắt đầu đúng hướng <br /> (phù hợp nếu bạn mới hoặc đang bí ý tưởng)</p>

                                    <div className="flex items-center justify-center gap-4 mb-12">
                                        <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                                            <span className="text-gray-500 line-through text-xl mr-3">399.000đ</span>
                                            <span className="text-5xl font-bold text-white tracking-tight">199.000đ</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                        <Button size="lg" className="w-full sm:w-auto min-w-[240px] shadow-xl shadow-brand-cyan/20 group text-lg" onClick={openPayment}>
                                            Truy cập ngay
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>

                                    <p className="mt-8 text-sm text-gray-500">
                                        Bạn có thể nâng cấp lên Pro sau nếu muốn làm bài bản hơn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. TRUST LINE */}
                <section className="py-20 border-t border-white/5 bg-brand-dark/50">
                    <div className="container max-w-5xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            {[
                                { text: "Không hứa viral", icon: ShieldCheck, color: "text-gray-500" },
                                { text: "Không hứa thu nhập", icon: ShieldCheck, color: "text-gray-500" },
                                { text: "Giúp bạn không làm sai từ đầu", icon: CheckCircle, color: "text-brand-cyan" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors cursor-default">
                                    <item.icon className={`w-8 h-8 ${item.color}`} />
                                    <span className={`font-medium text-lg ${item.color === 'text-gray-500' ? 'text-gray-400' : 'text-white'}`}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </main>

            <PayOSModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                planName="Starter — Bắt đầu đúng"
                planId="starter"
                amount={199000}
                onSuccess={handlePaymentSuccess}
            />
        </div>
    );
}
