import { useState } from 'react';
import { Layout } from '../components/Layout';
import { SecureVideoPlayer } from '../components/SecureVideoPlayer';
import { FileText, Database, Calendar, Lock, LogOut, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const MembershipPage = () => {
    const navigate = useNavigate();
    // Initialize state lazily
    const [isVerified] = useState(() => localStorage.getItem('membership') === 'elite');

    const handleLogout = () => {
        localStorage.removeItem('membership');
        navigate('/');
    };

    if (!isVerified) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center p-8 border border-red-500/50 bg-red-500/10 rounded-2xl max-w-md">
                        <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
                        <p className="text-gray-400 mb-6">Trang này chỉ dành cho thành viên Elite VIP.</p>
                        <Button variant="primary" onClick={() => navigate('/')}>Trở về trang chủ</Button>
                        <div className="mt-4">
                            <button onClick={() => { localStorage.setItem('membership', 'elite'); window.location.reload(); }} className="text-xs text-gray-600 underline">
                                Dev Bypass: Set Elite Token
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white">Elite Member Dashboard</h1>
                        <p className="text-brand-cyan">Welcome back, VIP Creator.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </div>

                {/* Video Masterclass Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-display font-bold text-white mb-6 border-l-4 border-brand-cyan pl-4">Video Masterclass</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SecureVideoPlayer
                            title="Module 1: Tư duy Viral Video"
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            poster="https://marketplace.canva.com/EAFW7j5y0cQ/1/0/1600w/canva-purple-and-pink-gradient-modern-gaming-youtube-thumbnail-v1oOoM6wzjo.jpg"
                        />
                        <SecureVideoPlayer
                            title="Module 2: 3 Giây đầu quyết định"
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                            poster="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
                        />
                        <SecureVideoPlayer
                            title="Module 3: Điệp khúc & CTA"
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                            poster="https://img.freepik.com/free-vector/gradient-gaming-youtube-thumbnail_23-2148925567.jpg"
                        />
                    </div>
                </section>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Resources */}
                    <section className="md:col-span-2">
                        <h2 className="text-2xl font-display font-bold text-white mb-6 border-l-4 border-brand-cyan pl-4">Kho Tài Liệu (Resources)</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/40 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-500/20 text-blue-400 flex items-center justify-center rounded-lg"><FileText className="w-5 h-5" /></div>
                                    <div>
                                        <h4 className="font-medium text-white">Slide bài giảng PDF</h4>
                                        <p className="text-xs text-gray-500">Video Masterclass Summary</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">Download</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/40 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-500/20 text-green-400 flex items-center justify-center rounded-lg"><Calendar className="w-5 h-5" /></div>
                                    <div>
                                        <h4 className="font-medium text-white">30-Day Content Plan</h4>
                                        <p className="text-xs text-gray-500">Excel Template</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">Download</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/40 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-500/20 text-purple-400 flex items-center justify-center rounded-lg"><Database className="w-5 h-5" /></div>
                                    <div>
                                        <h4 className="font-medium text-white">Top 50 AI Tools 2026</h4>
                                        <p className="text-xs text-gray-500">Curated List</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">View List</Button>
                            </div>
                        </div>
                    </section>

                    {/* Monthly Updates & Support */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-display font-bold text-white mb-6 border-l-4 border-brand-cyan pl-4">Update Tháng 5</h2>
                            <div className="bg-gradient-to-b from-brand-cyan/10 to-transparent border border-brand-cyan/20 rounded-xl p-6">
                                <ul className="space-y-4">
                                    <li className="text-sm text-gray-300 flex gap-2">
                                        <span className="text-brand-cyan font-bold">•</span> [New] 50 Hook bắt trend "Biến hình"
                                    </li>
                                    <li className="text-sm text-gray-300 flex gap-2">
                                        <span className="text-brand-cyan font-bold">•</span> [New] Script dòng sự kiện
                                    </li>
                                    <li className="text-sm text-gray-300 flex gap-2">
                                        <span className="text-brand-cyan font-bold">•</span> [Fix] Prompt ChatGPT-4o
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <div className="bg-[#0B0F1A] border border-brand-cyan/50 p-6 rounded-xl text-center shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                                <h3 className="font-bold text-white mb-2">Cần hỗ trợ ưu tiên?</h3>
                                <p className="text-xs text-gray-400 mb-4">Chat trực tiếp với đội ngũ kỹ thuật và chuyên gia.</p>
                                <Button variant="cyber" className="w-full">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Tham gia Group VIP
                                </Button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
