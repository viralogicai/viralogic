import { Layout } from '../components/Layout';
import { HeroSection } from '../components/HeroSection';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { DemoPreview } from '../components/DemoPreview';
import { ArrowRight, Zap, Video, Calendar, Tag, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';

import { AchievementBoard } from '../components/AchievementBoard';

export const LandingPage = () => {
    return (
        <Layout>
            {/* Background Grid & Shapes - Global for Landing Page */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-grid-cyberpunk opacity-50"></div>

            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] right-[10%] w-32 h-32 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm animate-float-slow opacity-60" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-[20%] left-[5%] w-64 h-64 rounded-full border border-dashed border-violet-500/20 animate-rotate-slow opacity-40"></div>
                <div className="absolute top-[40%] left-[15%] w-16 h-16 rounded-2xl border border-white/5 bg-gradient-to-br from-violet-500/10 to-transparent backdrop-blur-md animate-float-medium opacity-50" style={{ animationDelay: '1s' }}></div>
            </div>

            <HeroSection />
            <AchievementBoard />

            {/* Problem/Solution Section */}
            <section className="relative z-10 max-w-5xl mx-auto mb-24 px-6 md:px-0 pt-16">
                <ScrollReveal width="100%">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                            VẤN ĐỀ / INSIGHT
                        </h2>
                        <p className="text-brand-purple-light font-medium uppercase tracking-wider text-sm">
                            (TẠI SAO BẠN ĐANG BÍ?)
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-panel p-6 rounded-2xl transition-transform hover:-translate-y-1">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                                <span className="text-xl">😓</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Bí Idea, Hook nhạt</h3>
                            <p className="text-sm text-gray-400 mb-4">Ngồi cả tiếng không ra kịch bản, 3 giây đầu bị lướt qua ngay lập tức.</p>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                            <div className="flex items-center gap-2 text-emerald-400 text-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                <span>Hook giữ chân 90%</span>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl transition-transform hover:-translate-y-1">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
                                <span className="text-xl">⏳</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Script lan man</h3>
                            <p className="text-sm text-gray-400 mb-4">Viết dài dòng, không đúng tâm lý người xem, retention thấp.</p>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                            <div className="flex items-center gap-2 text-emerald-400 text-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                <span>Cấu trúc Viral 30s</span>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl transition-transform hover:-translate-y-1">
                            <div className="w-10 h-10 rounded-full bg-gray-500/10 flex items-center justify-center text-gray-400 mb-4">
                                <span className="text-xl">📉</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Làm nhiều, View ít</h3>
                            <p className="text-sm text-gray-400 mb-4">Đăng video đều đặn nhưng mãi lẹt đẹt vài trăm view, không chuyển đổi.</p>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
                            <div className="flex items-center gap-2 text-emerald-400 text-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                <span>CTA tăng conversion</span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            <DemoPreview />

            {/* Start Here - 7 Days Roadmap Vertical Timeline */}
            <section className="relative z-10 max-w-5xl mx-auto mb-32 px-6">
                <ScrollReveal width="100%">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-bold mb-4">
                            START HERE — 7 NGÀY ĐẦU
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                            ❝ Nếu bạn mới, đừng làm vội ❞
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">
                            “Hầu hết creator không thất bại vì thiếu công cụ,
                            mà vì mỗi ngày làm một kiểu: hôm nay test hook, mai đổi niche,
                            không biết cái gì sai để sửa.”
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-cyan via-brand-purple to-transparent md:-translate-x-1/2 rounded-full opacity-30"></div>

                    <div className="space-y-12">
                        {[
                            { day: "Day 1", title: "Chọn hướng (chưa cần quay)", items: ["Xác định 1 mục tiêu: view / follow / bán", "Chọn đúng nhóm kịch bản AI theo mục tiêu đó"], color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
                            { day: "Day 2", title: "Hook (3 giây đầu)", items: ["Test 3–5 hook cho 1 ý tưởng", "Không đổi ý tưởng khi hook chưa ổn"], color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
                            { day: "Day 3", title: "Script ngắn gọn", items: ["Áp dụng cấu trúc: Hook → Giữ → Kết", "Cắt mọi câu không phục vụ retention"], color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
                            { day: "Day 4", title: "CTA đúng lúc", items: ["Video yếu → CTA nhẹ", "Video mạnh → CTA rõ", "Không ép bán quá sớm"], color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30" },
                            { day: "Day 5", title: "Nhịp đăng", items: ["Đăng đều, đúng format", "Không đăng theo cảm xúc"], color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30" },
                            { day: "Day 6", title: "Sửa đúng chỗ", items: ["Video flop → chỉ sửa 1 biến", "Không đập lại từ đầu"], color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" },
                            { day: "Day 7", title: "Nhân bản cái đang chạy", items: ["Lấy video tốt → làm biến thể", "Không “sáng tạo lại” quá sớm"], color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline Node */}
                                <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-[#050814] border-2 border-brand-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)] z-20">
                                    <div className="absolute inset-0 bg-brand-cyan/50 rounded-full animate-ping opacity-75"></div>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className={`glass-panel p-6 rounded-2xl border ${item.border} hover:bg-white/5 transition-all group relative overflow-hidden`}>
                                        <div className={`absolute top-0 left-0 w-1 h-full ${item.bg.replace('/10', '')} opacity-50`}></div>

                                        <div className={`inline-flex items-center gap-2 mb-2 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                            <span className={`text-xs font-bold uppercase tracking-wider ${item.color} bg-white/5 px-2 py-1 rounded`}>
                                                {item.day}
                                            </span>
                                        </div>

                                        <h3 className={`text-xl font-bold text-white mb-3 group-hover:${item.color} transition-colors`}>{item.title}</h3>

                                        <ul className={`space-y-1.5 ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                                            {item.items.map((sub, i) => (
                                                <li key={i} className={`text-sm text-gray-400 flex items-center gap-2 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${item.bg.replace('/10', '')} opacity-50`}></span>
                                                    {sub}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Spacer for opposite side */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <ScrollReveal width="100%" delay={0.3}>
                    <div className="mt-20 text-center">
                        <div className="bg-brand-purple/10 border border-brand-purple/20 p-6 rounded-2xl mb-8 max-w-2xl mx-auto backdrop-blur-sm">
                            <p className="text-white font-medium text-lg">
                                🔒 ViraLogic AI không giúp bạn viral trong một đêm. <br />
                                <span className="text-gray-400">Nó giúp bạn không đi sai đường trong nhiều tháng.</span>
                            </p>
                        </div>

                        <button
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-2 bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform glow-effect shadow-xl shadow-brand-cyan/20 group"
                        >
                            Truy cập hệ thống ViraLogic AI — chỉ từ 199k
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </ScrollReveal>
            </section>

            <DemoPreview />

            {/* USP Grid */}
            <section className="relative z-10 max-w-6xl mx-auto mb-32 px-6">
                <ScrollReveal width="100%">
                    <h2 className="text-3xl font-semibold text-white mb-10 text-center">Bộ Kit này có gì?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-colors">
                            <Zap className="text-yellow-400 w-8 h-8 mb-3" />
                            <h4 className="font-medium text-white mb-1">500+ Hooks</h4>
                            <p className="text-xs text-gray-400">Giữ chân người xem ngay lập tức.</p>
                        </div>
                        <div className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-colors">
                            <Video className="text-red-400 w-8 h-8 mb-3" />
                            <h4 className="font-medium text-white mb-1">Viral Scripts</h4>
                            <p className="text-xs text-gray-400">Cấu trúc kể chuyện Storytelling.</p>
                        </div>
                        <div className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-colors">
                            <Calendar className="text-brand-cyan w-8 h-8 mb-3" />
                            <h4 className="font-medium text-white mb-1">Content Plan</h4>
                            <p className="text-xs text-gray-400">Lịch đăng bài 30 ngày tự động.</p>
                        </div>
                        <div className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-colors">
                            <Tag className="text-violet-400 w-8 h-8 mb-3" />
                            <h4 className="font-medium text-white mb-1">SEO & Hashtag</h4>
                            <p className="text-xs text-gray-400">Tối ưu tìm kiếm trên TikTok.</p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            <PricingSection />
            <FAQSection />

            {/* Final CTA */}
            <section className="relative z-10 text-center mb-24 px-6">
                <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-violet-600 blur-[60px] opacity-30 rounded-full animate-pulse-glow"></div>
                    <h2 className="relative text-3xl md:text-5xl font-semibold text-white">Sẵn sàng bùng nổ traffic?</h2>
                </div>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">Đừng để ý tưởng tuyệt vời bị chôn vùi bởi kịch bản tồi. Sở hữu bộ vũ khí bí mật của Top Creators ngay hôm nay.</p>
                <div onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform glow-effect cursor-pointer">
                    Truy cập hệ thống ViraLogic AI — chỉ từ 199k
                    <CreditCard className="w-5 h-5" />
                </div>
            </section>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
                <div
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center justify-between bg-white text-black p-4 rounded-xl shadow-2xl border border-white/20 glow-effect cursor-pointer"
                >
                    <div className="flex flex-col text-left">
                        <span className="font-bold text-sm">Truy cập hệ thống ViraLogic AI</span>
                        <span className="text-xs text-gray-600">Chỉ từ 199k</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

        </Layout>
    );
};
