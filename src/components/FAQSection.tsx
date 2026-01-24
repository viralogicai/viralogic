import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
    {
        question: "Tôi sẽ nhận được gì sau khi mua?",
        answer: "Bạn sẽ nhận được email chứa link truy cập vào kho Prompt (được tổ chức trên Notion hoặc Excel) ngay lập tức sau khi thanh toán thành công."
    },
    {
        question: "Người mới bắt đầu có dùng được không?",
        answer: "Chắc chắn rồi! Các prompt được thiết kế dạng \"Điền vào chỗ trống\", bạn chỉ cần thay chủ đề của bạn vào là xong."
    },
    {
        question: "Bộ Kit có được cập nhật không?",
        answer: "Có. Chúng tôi liên tục cập nhật prompt mới theo xu hướng thuật toán TikTok. Bạn mua 1 lần và nhận update miễn phí trọn đời."
    }
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="max-w-2xl mx-auto mb-32 px-6">
            <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">Câu hỏi thường gặp</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="glass-panel rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <div className="flex items-center justify-between p-4 text-sm text-gray-200 font-medium">
                            {faq.question}
                            <ChevronDown
                                className={cn(
                                    "w-5 h-5 text-gray-500 transition-transform duration-300",
                                    openIndex === index && "rotate-180 text-brand-purple"
                                )}
                            />
                        </div>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};
