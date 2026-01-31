import { motion } from 'framer-motion';
import { Trophy, Users, Video, TrendingUp } from 'lucide-react';

const stats = [
    {
        icon: Video,
        value: "1,200+",
        label: "AI Videos Created",
        color: "text-brand-cyan",
        bg: "bg-brand-cyan/10"
    },
    {
        icon: Users,
        value: "500+",
        label: "Elite Members",
        color: "text-brand-purple",
        bg: "bg-brand-purple/10"
    },
    {
        icon: TrendingUp,
        value: "85%",
        label: "Retention Rate",
        color: "text-brand-pink",
        bg: "bg-brand-pink/10"
    }
];

export const AchievementBoard = () => {
    return (
        <section className="py-12 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-panel p-8 rounded-3xl relative overflow-hidden"
            >
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">

                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center text-center p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm"
                            >
                                <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className="text-2xl font-bold text-white mb-1 font-display">{stat.value}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Spotlight Card */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink rounded-2xl opacity-20 blur-sm" />
                        <div className="relative bg-brand-dark/80 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">

                            {/* Avatar */}
                            <div className="relative min-w-fit">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple p-1">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4`}
                                        alt="Creator Focus"
                                        className="w-full h-full rounded-full bg-brand-dark object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg border border-yellow-200">
                                    <Trophy className="w-3 h-3" />
                                    <span>TOP 1</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                    <h4 className="text-lg font-bold text-white">Minh Hoàng</h4>
                                    <span className="text-xs bg-brand-cyan/20 text-brand-cyan px-2 py-0.5 rounded-full border border-brand-cyan/20">Pro Creator</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-3">
                                    "Từ 200 view lên 1.5M views nhờ áp dụng bộ Script Viral. Income x5 sau 1 tháng!"
                                </p>
                                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-mono text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3 text-green-400" />
                                        <span className="text-green-400">+450% Traffic</span>
                                    </div>
                                    <div>12 Video Viral</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
};
