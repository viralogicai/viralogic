import { motion } from 'framer-motion';
import { Download, PlayCircle, Star, TrendingUp, Zap } from 'lucide-react';
import { Button } from './Button';

export const HeroSection = () => {
    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative pt-32 pb-32 overflow-hidden px-6">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/20 blur-[120px] rounded-full -z-10 animate-pulse-glow" />
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-purple/20 blur-[100px] rounded-full -z-10 animate-pulse-glow delay-700" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-pink/10 blur-[100px] rounded-full -z-10 animate-pulse-glow delay-1000" />

            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-purple/50 bg-brand-purple/10 text-brand-purple-light text-xs font-medium mb-6 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
                        </span>
                        AI Prompt Kit for Creators
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Bật chế độ viral <br />
                        <span className="text-gradient-brand drop-shadow-lg">Prompt Kit tối ưu traffic</span>
                    </h1>

                    <p className="text-gray-400 text-lg mb-8 max-w-lg">
                        Copy → Paste → Ra idea, viết hook, script, CTA trong vài giây.
                        <span className="text-white font-medium"> Thao túng nội dung</span> với bộ 1000+ Prompt chuyên biệt cho TikTok, Reels & Shorts.
                    </p>

                    {/* Mobile 3D Product (Visible on Mobile Only) */}
                    <div className="lg:hidden relative w-[280px] h-[280px] mx-auto mb-10">
                        <div className="absolute inset-0 bg-brand-cyan/20 blur-[40px] rounded-full -z-10" />

                        {/* Box - Floating lightly */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full h-full z-10"
                        >
                            <img
                                src="/product-box-transparent.png"
                                alt="ViraLogic AI Product Box"
                                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                            />
                        </motion.div>

                        {/* Floating Badge 1: 1000+ Prompts */}
                        <motion.div
                            animate={{ y: [-15, 5, -15], x: [0, 5, 0], rotate: [0, 2, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -right-5 top-10 bg-black/80 backdrop-blur-md border border-brand-cyan/40 px-3 py-2 rounded-xl shadow-lg shadow-brand-cyan/10 z-20"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                                <div>
                                    <div className="text-[9px] text-gray-400 uppercase tracking-widest leading-none mb-0.5">Prompts</div>
                                    <div className="text-base font-bold font-display text-white leading-none">1000+</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Badge 2: Instant Viral (Trending) */}
                        <motion.div
                            animate={{ y: [10, -10, 10], x: [0, -3, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -left-4 bottom-20 bg-black/80 backdrop-blur-md border border-brand-purple/40 px-3 py-2 rounded-xl shadow-lg shadow-brand-purple/10 z-20"
                        >
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-3 h-3 text-green-400" />
                                <span className="text-sm font-bold text-white">Instant Viral</span>
                            </div>
                        </motion.div>

                        {/* Floating Badge 3: Save Time */}
                        <motion.div
                            animate={{ y: [-5, 15, -5], x: [5, -5, 5] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                            className="absolute -right-2 bottom-10 bg-black/80 backdrop-blur-md border border-brand-pink/40 px-3 py-2 rounded-xl shadow-lg shadow-brand-pink/10 z-10"
                        >
                            <div className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-yellow-400" />
                                <div className="text-xs font-medium text-gray-200">
                                    <span className="font-bold text-white">Tiết kiệm</span> 2h/ngày
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Badge 4: High Retention */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                            className="absolute left-0 top-0 bg-brand-cyan/10 backdrop-blur-md border border-brand-cyan/20 px-2 py-1 rounded-lg z-0"
                        >
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] font-mono text-brand-cyan font-bold">High Retention</span>
                            </div>
                        </motion.div>

                        {/* Floating Element 5: Decorative Blur/Icon */}
                        <motion.div
                            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-10 -bottom-5 w-12 h-12 bg-brand-pink/20 blur-xl rounded-full z-0"
                        />
                        <motion.div
                            animate={{ rotate: [0, 10, 0], y: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute left-10 -top-5 z-0"
                        >
                            <Star className="w-6 h-6 text-brand-pink/30 fill-current" />
                        </motion.div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <Button variant="primary" size="lg" className="group shadow-lg shadow-brand-purple/25 hover:shadow-brand-purple/40" onClick={scrollToPricing}>
                            <span className="relative z-10 flex items-center gap-2 font-bold tracking-wide">
                                Mua ngay & Nhận link
                                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                            </span>
                        </Button>

                        <button
                            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-brand-purple/30 group hover:bg-brand-purple/5 transition-all text-gray-300 hover:text-white font-medium backdrop-blur-sm"
                        >
                            <PlayCircle className="w-5 h-5 text-brand-purple group-hover:scale-110 transition-transform" />
                            Xem prompt mẫu
                        </button>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span className="text-gray-300 ml-2 font-medium">4.9/5</span>
                        </div>
                        <div className="h-4 w-px bg-white/10"></div>
                        <span>Cập nhật trọn đời</span>
                    </div>
                </motion.div>

                {/* Right Content - 3D Product */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-full aspect-square max-w-[500px] mx-auto animate-float-slow">
                        {/* Product Image */}
                        <img
                            src="/product-box-transparent.png"
                            alt="ViraLogic AI Product Box"
                            className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,240,255,0.3)] transform transition-transform duration-500 hover:scale-110"
                        />

                        {/* Floating Elements */}
                        <div className="absolute top-10 right-0 p-4 glass-panel rounded-xl animate-float-medium" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                                    <Download className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Download</div>
                                    <div className="text-xs text-gray-400">Ready instantly</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-20 left-0 p-4 glass-panel rounded-xl animate-float-medium" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Viral Ready</div>
                                    <div className="text-xs text-gray-400">TikTok & Reels</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
