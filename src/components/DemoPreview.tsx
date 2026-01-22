import { motion } from 'framer-motion';
import { Sparkles, Play, StopCircle } from 'lucide-react';

export const DemoPreview = () => {
    return (
        <section id="demo" className="max-w-5xl mx-auto mb-32 px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-white mb-4">Không cần nghĩ, chỉ cần Paste</h2>
                <p className="text-gray-400">Xem cách 1 prompt biến ý tưởng sơ sài thành kịch bản triệu view.</p>
            </div>

            <div className="relative group">
                {/* Glow behind */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                {/* Chat Interface */}
                <div className="relative bg-[#0A0E1A] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                    {/* Window Controls */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        <div className="ml-auto text-xs text-gray-500 font-mono">ChatGPT / Claude / Bing</div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6 max-h-[600px] overflow-y-auto no-scrollbar">
                        {/* User Input */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">You</div>
                            <div className="flex-1">
                                <div className="bg-gray-800/50 p-4 rounded-lg rounded-tl-none border border-white/5 text-sm md:text-base text-gray-200 font-mono">
                                    <span className="text-gray-500 block mb-2 text-xs">[Copy Paste Prompt #42]</span>
                                    <p className="mb-1"><span className="text-violet-400">Chủ đề:</span> Bán khóa học tiếng Anh.</p>
                                    <p className="mb-1"><span className="text-violet-400">Target:</span> GenZ mất gốc.</p>
                                    <p>Hãy viết 3 hook gây sốc trong 3 giây đầu tiên.</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Output */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-4"
                        >
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-violet-500 to-cyan-500 flex-shrink-0 flex items-center justify-center text-white">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <div className="bg-violet-900/10 p-4 rounded-lg rounded-tl-none border border-violet-500/20 text-sm md:text-base text-gray-100">
                                    <p className="mb-3 text-violet-300 text-xs uppercase tracking-wider font-bold">ViraLogic AI Output:</p>
                                    <ul className="space-y-4">
                                        <li className="flex gap-3">
                                            <span className="text-brand-cyan font-bold font-mono">1.</span>
                                            <p>"Đừng học từ vựng nữa nếu bạn chưa biết quy tắc 3 giây này..."</p>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-brand-cyan font-bold font-mono">2.</span>
                                            <p>"Giáo viên tiếng Anh của bạn sẽ ghét tôi khi tôi tiết lộ điều này..."</p>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-brand-cyan font-bold font-mono">3.</span>
                                            <p>"Sự thật: Bạn không dốt tiếng Anh, bạn đang học sai cách!"</p>
                                        </li>
                                    </ul>
                                    <div className="mt-4 flex gap-2">
                                        <button className="text-xs flex items-center gap-1 text-gray-500 hover:text-white transition-colors">
                                            <Play className="w-3 h-3" /> Copy Text
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
