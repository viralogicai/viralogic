"use client";

import React from 'react';
import { Layout } from '@/components/Layout';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BookOpen, Calendar, HelpCircle, AlertTriangle, CheckCircle, ArrowRight, Video, Target, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StartHerePage() {
    return (
        <Layout>
            <div className="relative min-h-screen pb-24">
                {/* Background Decor */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px]" />
                </div>

                <div className="container max-w-4xl mx-auto px-6 relative z-10 pt-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-bold mb-6">
                            <BookOpen className="w-4 h-4" />
                            HƯỚNG DẪN NHẬP MÔN
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                            Start Here <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                                7 Ngày Đầu Với ViraLogic AI
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto italic border-l-4 border-brand-purple pl-4 text-left md:text-center md:border-none md:pl-0">
                            "Đọc trước khi bạn làm bất cứ thứ gì."
                        </p>
                    </div>

                    {/* Prologue */}
                    <ScrollReveal>
                        <div className="glass-panel p-8 rounded-2xl mb-16 border-l-4 border-l-brand-pink relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <HelpCircle className="w-32 h-32" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                📜 LỜI NÓI ĐẦU <span className="text-sm font-normal text-brand-pink border border-brand-pink/30 px-2 py-0.5 rounded uppercase tracking-wider">Bắt buộc đọc</span>
                            </h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>Nếu bạn từng:</p>
                                <ul className="space-y-2 pl-4 border-l border-white/10">
                                    <li className="flex items-center gap-2"><span className="text-red-400">•</span> Làm TikTok theo cảm hứng</li>
                                    <li className="flex items-center gap-2"><span className="text-red-400">•</span> Thấy người khác làm gì thì làm theo</li>
                                    <li className="flex items-center gap-2"><span className="text-red-400">•</span> Video flop → xoá → làm lại từ đầu</li>
                                </ul>
                                <div className="pt-4 space-y-2">
                                    <p className="flex items-center gap-2 text-white font-medium">
                                        👉 Vấn đề không phải bạn thiếu ý tưởng.
                                    </p>
                                    <p className="flex items-center gap-2 text-brand-cyan font-bold text-lg">
                                        👉 Vấn đề là bạn chưa bao giờ được dạy làm theo thứ tự.
                                    </p>
                                </div>
                                <p className="pt-2 italic text-gray-400">
                                    7 ngày này không giúp bạn giỏi lên ngay. Nó chỉ giúp bạn không làm sai ngay từ đầu.
                                    Và như vậy là đã hơn rất nhiều người rồi.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Timeline */}
                    <div className="space-y-12">

                        {/* DAY 1 */}
                        <ScrollReveal delay={0.1}>
                            <div className="relative pl-8 md:pl-0">
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-cyan/20 md:hidden" />
                                <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-brand-cyan md:hidden" />

                                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-colors">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                        <div className="shrink-0 w-16 h-16 bg-brand-cyan/10 rounded-xl flex flex-col items-center justify-center text-brand-cyan border border-brand-cyan/20">
                                            <span className="text-xs font-bold uppercase">Day</span>
                                            <span className="text-2xl font-bold">01</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-bold text-white mb-2">DỪNG LẠI (ĐỪNG LÀM GÌ CẢ)</h3>
                                            <div className="text-gray-300 space-y-4">
                                                <p>Việc bạn cần làm hôm nay:</p>
                                                <div className="flex gap-4 mb-4">
                                                    <div className="bg-red-500/10 px-3 py-1 rounded text-red-400 text-sm font-bold">👉 KHÔNG quay video</div>
                                                    <div className="bg-red-500/10 px-3 py-1 rounded text-red-400 text-sm font-bold">👉 KHÔNG mở prompt</div>
                                                </div>
                                                <p>Việc duy nhất: Đọc hết Day 1 và trả lời câu hỏi này:</p>
                                                <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                                                    <p className="text-lg font-bold text-white mb-4">Bạn đang làm TikTok để làm gì?</p>
                                                    <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                                                        <div className="p-2 bg-white/5 rounded text-gray-400">View?</div>
                                                        <div className="p-2 bg-white/5 rounded text-gray-400">Follow?</div>
                                                        <div className="p-2 bg-white/5 rounded text-gray-400">Bán hàng?</div>
                                                    </div>
                                                    <p className="mt-4 text-brand-pink font-bold text-sm uppercase tracking-wide">📌 Chỉ được chọn 1 mục tiêu duy nhất</p>
                                                </div>
                                                <div className="text-sm bg-brand-purple/10 p-4 rounded-lg border border-brand-purple/20">
                                                    <strong className="text-brand-purple-light block mb-1">Vì sao bước này quan trọng?</strong>
                                                    90% người mới muốn cả 3 cùng lúc 👉 Kết quả: không cái nào ra hồn.
                                                    <br />Nếu chưa chọn được: <strong>Dừng lại. Đừng làm tiếp.</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* DAY 2 */}
                        <ScrollReveal delay={0.1}>
                            <div className="relative pl-8 md:pl-0">
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-cyan/20 md:hidden" />
                                <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-brand-cyan md:hidden" />

                                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-colors">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                        <div className="shrink-0 w-16 h-16 bg-white/5 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-white/10">
                                            <span className="text-xs font-bold uppercase">Day</span>
                                            <span className="text-2xl font-bold">02</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-bold text-white mb-4">CHỌN ĐÚNG LOẠI VIDEO</h3>
                                            <div className="text-gray-300 space-y-4">
                                                <p>Hôm nay bạn vẫn <strong className="text-white">chưa cần quay</strong>.</p>
                                                <p>Việc bạn làm: Nhìn lại 5–10 video gần nhất. Hỏi: <em>"Video này phục vụ mục tiêu hôm qua không?"</em></p>
                                                <p className="text-red-400 font-bold">👉 Nếu không: Gạch bỏ.</p>

                                                <div className="grid md:grid-cols-3 gap-3 mt-4">
                                                    <div className="p-3 bg-white/5 rounded border border-white/5">
                                                        <div className="text-xs text-gray-500 uppercase mb-1">Muốn View</div>
                                                        <div className="text-white font-medium text-sm">Video đánh cảm xúc / tò mò</div>
                                                    </div>
                                                    <div className="p-3 bg-white/5 rounded border border-white/5">
                                                        <div className="text-xs text-gray-500 uppercase mb-1">Muốn Follow</div>
                                                        <div className="text-white font-medium text-sm">Video lặp insight</div>
                                                    </div>
                                                    <div className="p-3 bg-white/5 rounded border border-white/5">
                                                        <div className="text-xs text-gray-500 uppercase mb-1">Muốn Bán</div>
                                                        <div className="text-white font-medium text-sm">Video giải quyết vấn đề</div>
                                                    </div>
                                                </div>
                                                <p className="text-center text-gray-500 italic text-sm mt-2">📌 Đừng trộn lẫn các loại này.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* DAY 3 */}
                        <ScrollReveal delay={0.1}>
                            <div className="relative pl-8 md:pl-0">
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-cyan/20 md:hidden" />
                                <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-brand-cyan md:hidden" />

                                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-colors">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                        <div className="shrink-0 w-16 h-16 bg-white/5 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-white/10">
                                            <span className="text-xs font-bold uppercase">Day</span>
                                            <span className="text-2xl font-bold">03</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-bold text-white mb-4">ĐỪNG QUAY NHIỀU (ĐÂY LÀ BẪY)</h3>
                                            <div className="text-gray-300 space-y-4">
                                                <p>Hôm nay bạn có thể quay <strong className="text-brand-cyan">TỐI ĐA 1–2 video</strong>.</p>
                                                <div className="bg-white/5 p-4 rounded-lg">
                                                    <p className="font-bold text-white mb-2">Quy tắc vàng:</p>
                                                    <ul className="space-y-2 text-sm">
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" /> 1 video = 1 ý</li>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" /> 1 hook duy nhất</li>
                                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" /> Không sửa nội dung sau khi đăng</li>
                                                        <li className="flex items-center gap-2 text-red-400 font-bold"><div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Không xoá video flop</li>
                                                    </ul>
                                                </div>
                                                <div className="text-sm italic text-gray-400">
                                                    "Xoá video = Mất dữ liệu + Mất khả năng học. Video flop không phải thất bại, nó là bài test."
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* DAY 4 */}
                        <ScrollReveal delay={0.1}>
                            <div className="relative pl-8 md:pl-0">
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-cyan/20 md:hidden" />
                                <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-brand-cyan md:hidden" />

                                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-colors">
                                    <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                        <div className="shrink-0 w-16 h-16 bg-white/5 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-white/10">
                                            <span className="text-xs font-bold uppercase">Day</span>
                                            <span className="text-2xl font-bold">04</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-bold text-white mb-4">SỬA 1 BIẾN DUY NHẤT</h3>
                                            <div className="text-gray-300 space-y-4">
                                                <p>Hôm nay bạn <strong className="text-red-400">KHÔNG quay mới</strong>. Việc bạn làm: Nhìn lại video Day 3.</p>
                                                <p>Chỉ sửa 1 trong 3 thứ:</p>
                                                <div className="flex gap-4">
                                                    <span className="px-3 py-1 bg-white/5 rounded border border-white/10 text-white font-mono">1. Hook</span>
                                                    <span className="px-3 py-1 bg-white/5 rounded border border-white/10 text-white font-mono">2. Nhịp nói</span>
                                                    <span className="px-3 py-1 bg-white/5 rounded border border-white/10 text-white font-mono">3. Khung hình</span>
                                                </div>
                                                <p className="text-sm font-bold text-red-400">📌 Tuyệt đối không sửa cả 3.</p>
                                                <p className="text-sm text-gray-400">Người mới hay “đập lại hết”. Người làm lâu chỉ sửa 1 biến.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* DAY 5 - 6 - 7 Condensed */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* DAY 5 */}
                            <ScrollReveal delay={0.2}>
                                <div className="glass-panel p-6 rounded-2xl border border-white/5 h-full">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-bold text-white">05</div>
                                        <h4 className="font-bold text-white">TẠO NHỊP</h4>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">Không phải mục tiêu View, mà là mục tiêu Đăng.</p>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li>• 1 video / ngày</li>
                                        <li className="text-center font-bold text-xs text-gray-500">- HOẶC -</li>
                                        <li>• 1 video / 2 ngày</li>
                                    </ul>
                                    <p className="mt-4 text-xs font-bold text-brand-cyan">Quan trọng là ĐỀU.</p>
                                </div>
                            </ScrollReveal>

                            {/* DAY 6 */}
                            <ScrollReveal delay={0.3}>
                                <div className="glass-panel p-6 rounded-2xl border border-white/5 h-full">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-bold text-white">06</div>
                                        <h4 className="font-bold text-white">BIẾT BỎ QUA</h4>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">Hôm nay học cách KHÔNG làm khi:</p>
                                    <ul className="space-y-1 text-sm text-gray-300">
                                        <li>• Không rõ mục tiêu</li>
                                        <li>• Đang bắt chước</li>
                                        <li>• Thấy hoảng loạn</li>
                                    </ul>
                                    <p className="mt-4 text-xs font-bold text-white">Nghỉ 1 ngày ≠ Thua.<br />Làm bừa mới là thua.</p>
                                </div>
                            </ScrollReveal>

                            {/* DAY 7 */}
                            <ScrollReveal delay={0.4}>
                                <div className="glass-panel p-6 rounded-2xl border border-brand-purple/30 bg-brand-purple/5 h-full">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-brand-purple/20 rounded-lg flex items-center justify-center font-bold text-brand-purple-light">07</div>
                                        <h4 className="font-bold text-white">RESET KỲ VỌNG</h4>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-4">Sau 7 ngày, nếu chưa viral/chưa ra tiền: <br /><strong className="text-white">BÌNH THƯỜNG.</strong></p>
                                    <p className="text-sm text-gray-400">
                                        Quan trọng là bạn không còn làm lung tung. Đó là thứ đa số người không có.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                    </div>

                    {/* FINISH */}
                    <div className="mt-16 text-center">
                        <div className="inline-block p-1 rounded-full bg-gradient-to-r from-brand-cyan/50 to-brand-purple/50 mb-8">
                            <div className="bg-[#030712] rounded-full px-8 py-4">
                                <h3 className="text-xl font-bold text-white tracking-wider uppercase">Kết thúc Start Here</h3>
                            </div>
                        </div>
                        <div className="max-w-2xl mx-auto space-y-6 text-gray-300">
                            <p className="text-lg">
                                Nếu bạn đọc tới đây, bạn đã không còn mò mẫm hay chạy theo trend mù quáng.
                                Starter giúp bạn đặt lại nền móng.
                            </p>
                            <p className="text-white italic font-medium">
                                "Start Here không làm bạn giỏi hơn. Nó chỉ ngăn bạn làm sai. Và như vậy là đã hơn rất nhiều người."
                            </p>

                            <div className="pt-8">
                                <p className="text-sm text-gray-500 mb-4">Khi bạn đã sẵn sàng đi nhanh hơn:</p>
                                <a href="/membership" className="inline-flex items-center gap-2 text-brand-cyan font-bold hover:underline">
                                    Truy cập Hệ Thống Membership <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
