'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { SecureVideoPlayer } from '@/components/SecureVideoPlayer';
import { Lock, Copy, Download, Folder, FileText, Check, Loader2 } from 'lucide-react';
import { AchievementBoard } from '@/components/AchievementBoard';
import { Button } from '@/components/Button';

interface Prompt {
    id: string;
    title: string;
    content: string;
    category: string;
    tier: string;
}

export default function MembershipPage() {
    const { userTier, checkAccess } = useAuth();
    const router = useRouter();
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Extract unique categories from prompts
    const categories = useMemo(() => {
        const cats = [...new Set(prompts.map(p => p.category))];
        return cats.sort();
    }, [prompts]);

    // Filter prompts by active category
    const filteredPrompts = useMemo(() => {
        if (!activeTab) return [];
        return prompts.filter(p => p.category === activeTab);
    }, [prompts, activeTab]);

    useEffect(() => {
        // Enforce VIP Access Only
        if (userTier !== 'vip_mentorship') {
            router.push('/membership/login');
        }
    }, [userTier, router]);

    // Fetch prompts from API
    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const res = await fetch('/api/prompts?tier=VIP_MENTORSHIP');
                const data = await res.json();
                if (data.success && data.data) {
                    setPrompts(data.data);
                    // Set first category as active tab
                    const cats = [...new Set(data.data.map((p: Prompt) => p.category))].sort() as string[];
                    if (cats.length > 0) {
                        setActiveTab(cats[0]);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch prompts:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userTier === 'vip_mentorship') {
            fetchPrompts();
        }
    }, [userTier]);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050814] text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-purple">ViraLogic AI</span>
                        <span className="font-display font-medium hidden md:block border-l border-white/10 pl-3 ml-3">Membership Area</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-xs text-gray-400">
                            Current Plan: <span className="text-brand-cyan font-bold uppercase">{userTier}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xs font-bold">
                            {userTier[0].toUpperCase()}
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">

                <h1 className="text-3xl font-display font-bold mb-8">Welcome back, Creator!</h1>

                <AchievementBoard />

                {/* Exclusive Resources (Available for All Paid) */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Folder className="w-5 h-5 text-brand-cyan" />
                        Tài liệu độc quyền
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">Content Plan 30 Days</h4>
                                <p className="text-xs text-gray-400">Excel Template</p>
                            </div>
                            <Download className="w-4 h-4 ml-auto text-gray-500 group-hover:text-white" />
                        </div>
                        <div className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">TikTok Algorithm PDF</h4>
                                <p className="text-xs text-gray-400">Guide 2024</p>
                            </div>
                            <Download className="w-4 h-4 ml-auto text-gray-500 group-hover:text-white" />
                        </div>
                    </div>
                </section>

                {/* Prompts Section (Dynamic Tabs & Table) */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-brand-purple" />
                        Prompt Library
                        <span className="text-sm font-normal text-gray-500 ml-2">({prompts.length} prompts)</span>
                    </h2>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="glass-panel rounded-xl p-12 text-center">
                            <p className="text-gray-500">Chưa có prompt nào. Vui lòng liên hệ admin.</p>
                        </div>
                    ) : (
                        <>
                            {/* Category Tabs */}
                            <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-1">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveTab(cat)}
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === cat ? 'bg-brand-cyan/10 text-brand-cyan border-b-2 border-brand-cyan' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        {cat}
                                        <span className="ml-2 text-xs opacity-50">({prompts.filter(p => p.category === cat).length})</span>
                                    </button>
                                ))}
                            </div>

                            {/* Prompts Table */}
                            <div className="glass-panel rounded-xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5 text-xs uppercase text-gray-400">
                                            <tr>
                                                <th className="px-6 py-4 w-1/3">Title</th>
                                                <th className="px-6 py-4 w-2/3">Prompt Content</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredPrompts.length > 0 ? (
                                                filteredPrompts.map((prompt) => (
                                                    <tr key={prompt.id} className="hover:bg-white/[0.02]">
                                                        <td className="px-6 py-4">
                                                            <span className="text-sm font-medium text-brand-cyan">{prompt.title}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex gap-2 items-start group">
                                                                <p className="text-sm text-gray-200 font-mono bg-black/30 p-3 rounded border border-white/5 flex-1 whitespace-pre-wrap">
                                                                    {prompt.content}
                                                                </p>
                                                                <button
                                                                    onClick={() => handleCopy(prompt.content, prompt.id)}
                                                                    className="text-gray-500 hover:text-brand-cyan transition-colors p-2 shrink-0"
                                                                    title="Copy Prompt"
                                                                >
                                                                    {copiedId === prompt.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={2} className="px-6 py-8 text-center text-gray-500 italic">
                                                        Không có prompt trong category này.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </section>

                {/* Video Masterclass (Elite Only) */}
                <section>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${checkAccess('vip_mentorship') ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        Video Masterclass
                        {!checkAccess('vip_mentorship') && <span className="text-xs font-normal text-gray-500 ml-2">(Locked: Elite Plan Only)</span>}
                    </h2>

                    {checkAccess('vip_mentorship') ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-panel p-4 rounded-xl">
                                <SecureVideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" title="Module 1: The Viral Framework" />
                                <h3 className="mt-4 font-medium text-lg">Module 1: The Viral Framework</h3>
                            </div>
                            <div className="glass-panel p-4 rounded-xl">
                                <SecureVideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" title="Module 2: Hook Psychology" />
                                <h3 className="mt-4 font-medium text-lg">Module 2: Hook Psychology</h3>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-panel p-12 rounded-xl text-center border-dashed border-2 border-white/10">
                            <Lock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Exclusive Content</h3>
                            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                This video masterclass requires the <b>Elite (VIP)</b> plan.
                                Upgrade now to unlock advanced viral strategies.
                            </p>
                            <Button
                                variant="primary"
                                className="w-full sm:w-auto"
                            >
                                Upgrade to Elite
                            </Button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
