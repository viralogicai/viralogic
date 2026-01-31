'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Minh Tuấn",
        handle: "@minhtuan.creator",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        quote: "Đỡ rối hơn hẳn. Mới đầu không biết bắt đầu từ đâu, giờ cứ theo plan mà làm.",
        role: "TikTok Creator"
    },
    {
        name: "Lan Anh",
        handle: "@lananh.daily",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
        quote: "Biết nên làm gì trước, không bị mông lung. Kịch bản có sẵn sườn rất dễ viết.",
        role: "Content Creator"
    },
    {
        name: "Hoàng K.",
        handle: "@hoangk.marketing",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        quote: "Không bị prompt dắt mũi nữa. Mình hiểu được tại sao video này viral.",
        role: "Marketing Freelancer"
    }
];

export const TestimonialSection = () => {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">
                        Creator nói gì về <span className="text-brand-cyan">ViraLogic AI</span>?
                    </h2>
                    <p className="text-gray-400">Những người đã thoát khỏi cảnh "bí idea" và bắt đầu làm đúng.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-panel p-6 rounded-2xl relative"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-purple/20 border border-white/10">
                                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t.name}</h4>
                                    <span className="text-xs text-gray-500">{t.handle}</span>
                                </div>
                            </div>

                            <p className="text-gray-300 text-sm italic leading-relaxed">"{t.quote}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
