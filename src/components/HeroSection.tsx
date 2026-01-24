import { motion } from 'framer-motion';
import { Download, PlayCircle, Star } from 'lucide-react';
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
                        AI Content Workflow for Short-Form Creators
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Bật chế độ viral bằng AI — <br />
                        <span className="text-gradient-brand drop-shadow-lg">với hệ thống tạo nội dung đúng thứ tự</span>
                    </h1>

                    <p className="text-gray-400 text-lg mb-4 max-w-lg">
                        Không cần đoán. Không cần thử bừa.
                        <br />
                        ViraLogic AI giúp creator biết nên làm gì trước, làm gì sau để video có cơ hội giữ người xem ngay từ 3 giây đầu.
                    </p>

                    <p className="text-sm text-gray-500 mb-8 italic border-l-2 border-brand-cyan/50 pl-3">
                        Từ ý tưởng → hook → kịch bản → CTA — tất cả đã được sắp xếp sẵn để bạn chỉ việc triển khai.
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
                        {/* Cleaned up floating badges as requested */}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <Button variant="primary" size="lg" className="group shadow-lg shadow-brand-purple/25 hover:shadow-brand-purple/40" onClick={scrollToPricing}>
                            <span className="relative z-10 flex items-center gap-2 font-bold tracking-wide">
                                Truy cập hệ thống ViraLogic AI — chỉ từ 199k
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
