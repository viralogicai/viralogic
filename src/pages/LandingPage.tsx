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

            {/* Start Here - 7 Days Roadmap is below this block in file */}

            {/* Start Here - 7 Days Roadmap */}
            <section className="relative z-10 max-w-4xl mx-auto mb-32 px-6">
                <div className="text-center mb-12">
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

                <div className="space-y-4">
                    {[
                        { day: "Day 1", title: "Chọn hướng (chưa cần quay)", items: ["Xác định 1 mục tiêu: view / follow / bán", "Chọn đúng nhóm kịch bản AI theo mục tiêu đó"], color: "bg-blue-500" },
                        { day: "Day 2", title: "Hook (3 giây đầu)", items: ["Test 3–5 hook cho 1 ý tưởng", "Không đổi ý tưởng khi hook chưa ổn"], color: "bg-indigo-500" },
                        { day: "Day 3", title: "Script ngắn gọn", items: ["Áp dụng cấu trúc: Hook → Giữ → Kết", "Cắt mọi câu không phục vụ retention"], color: "bg-violet-500" },
                        { day: "Day 4", title: "CTA đúng lúc", items: ["Video yếu → CTA nhẹ", "Video mạnh → CTA rõ", "Không ép bán quá sớm"], color: "bg-fuchsia-500" },
                        { day: "Day 5", title: "Nhịp đăng", items: ["Đăng đều, đúng format", "Không đăng theo cảm xúc"], color: "bg-pink-500" },
                        { day: "Day 6", title: "Sửa đúng chỗ", items: ["Video flop → chỉ sửa 1 biến", "Không đập lại từ đầu"], color: "bg-rose-500" },
                        { day: "Day 7", title: "Nhân bản cái đang chạy", items: ["Lấy video tốt → làm biến thể", "Không “sáng tạo lại” quá sớm"], color: "bg-red-500" }
                    ].map((item, idx) => (
                        <div key={idx} className="glass-panel p-4 md:p-6 rounded-xl flex flex-col md:flex-row gap-4 md:items-center hover:bg-white/5 transition-colors border-l-4" style={{ borderLeftColor: item.color.replace('bg-', '') }}>
                            <div className="shrink-0 w-24">
                                <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold text-white ${item.color}`}>
                                    {item.day}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                    {item.items.map((sub, i) => (
                                        <li key={i}>{sub}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-brand-purple/10 border border-brand-purple/20 p-6 rounded-2xl mb-8">
                        <p className="text-white font-medium text-lg">
                            🔒 ViraLogic AI không giúp bạn viral trong một đêm. <br />
                            <span className="text-gray-400">Nó giúp bạn không đi sai đường trong nhiều tháng.</span>
                        </p>
                    </div>

                    <button
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform glow-effect shadow-xl shadow-brand-cyan/20"
                    >
                        Truy cập hệ thống ViraLogic AI — chỉ từ 199k
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
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
