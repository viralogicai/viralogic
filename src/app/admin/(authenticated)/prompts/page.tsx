'use client';

import { useEffect, useState, useCallback } from 'react';
import {
    Plus,
    Upload,
    Trash2,
    Edit,
    X,
    Save,
    FileSpreadsheet,
    Loader2,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/Button';

interface Prompt {
    id: string;
    title: string;
    content: string;
    category: string;
    tier: 'FREE' | 'STARTER' | 'PRO' | 'VIP_MENTORSHIP';
    isActive: boolean;
    order: number;
    createdAt: string;
}

const TIERS = ['FREE', 'STARTER', 'PRO', 'VIP_MENTORSHIP'] as const;
const CATEGORIES = ['Hook', 'Script', 'CTA', 'Storytelling', 'Trend', 'Other'];

export default function PromptsPage() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
    const [formData, setFormData] = useState<{
        title: string;
        content: string;
        category: string;
        tier: 'FREE' | 'STARTER' | 'PRO' | 'VIP_MENTORSHIP';
        isActive: boolean;
    }>({
        title: '',
        content: '',
        category: 'Hook',
        tier: 'PRO',
        isActive: true
    });
    const [isSaving, setIsSaving] = useState(false);
    const [uploadResult, setUploadResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null);

    const fetchPrompts = useCallback(async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            const response = await fetch('/api/admin/prompts', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setPrompts(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch prompts:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrompts();
    }, [fetchPrompts]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            const url = '/api/admin/prompts';
            const method = editingPrompt ? 'PUT' : 'POST';
            const body = editingPrompt
                ? { id: editingPrompt.id, ...formData }
                : formData;

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                setIsModalOpen(false);
                setEditingPrompt(null);
                setFormData({ title: '', content: '', category: 'Hook', tier: 'PRO', isActive: true });
                fetchPrompts();
            }
        } catch (error) {
            console.error('Failed to save prompt:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa prompt này?')) return;

        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            await fetch(`/api/admin/prompts?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchPrompts();
        } catch (error) {
            console.error('Failed to delete prompt:', error);
        }
    };

    const handleEdit = (prompt: Prompt) => {
        setEditingPrompt(prompt);
        setFormData({
            title: prompt.title,
            content: prompt.content,
            category: prompt.category,
            tier: prompt.tier,
            isActive: prompt.isActive
        });
        setIsModalOpen(true);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const token = localStorage.getItem('adminToken');
        if (!token) return;

        // Read file as base64
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = (event.target?.result as string).split(',')[1];

            try {
                const response = await fetch('/api/admin/prompts-upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fileData: base64, fileName: file.name })
                });

                const data = await response.json();
                if (data.success) {
                    setUploadResult(data.data);
                    fetchPrompts();
                }
            } catch (error) {
                console.error('Upload failed:', error);
            }
        };
        reader.readAsDataURL(file);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
            </div>
        );
    }

    return (
        <>
            {/* Actions Bar */}
            <div className="flex flex-wrap gap-4 mb-6">
                <Button
                    variant="primary"
                    onClick={() => {
                        setEditingPrompt(null);
                        setFormData({ title: '', content: '', category: 'Hook', tier: 'PRO', isActive: true });
                        setIsModalOpen(true);
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm Prompt
                </Button>
                <Button variant="outline" onClick={() => setIsUploadModalOpen(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Excel
                </Button>
            </div>

            {/* Prompts Table */}
            <div className="glass-panel rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="text-left p-4 text-gray-400 font-medium">Title</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Category</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Tier</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prompts.map((prompt) => (
                                <tr key={prompt.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4">
                                        <p className="text-white font-medium">{prompt.title}</p>
                                        <p className="text-gray-500 text-sm truncate max-w-xs">{prompt.content}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300">
                                            {prompt.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-sm ${prompt.tier === 'VIP_MENTORSHIP' ? 'bg-amber-500/20 text-amber-400' :
                                            prompt.tier === 'PRO' ? 'bg-violet-500/20 text-violet-400' :
                                                prompt.tier === 'STARTER' ? 'bg-brand-cyan/20 text-brand-cyan' :
                                                    'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {prompt.tier}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`flex items-center gap-1 text-sm ${prompt.isActive ? 'text-emerald-400' : 'text-gray-500'
                                            }`}>
                                            <span className={`w-2 h-2 rounded-full ${prompt.isActive ? 'bg-emerald-400' : 'bg-gray-500'
                                                }`} />
                                            {prompt.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleEdit(prompt)}
                                            className="p-2 text-gray-400 hover:text-brand-cyan transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prompt.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {prompts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        Chưa có prompt nào. Hãy thêm prompt đầu tiên!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-2xl bg-brand-navy border border-white/10 rounded-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">
                                {editingPrompt ? 'Edit Prompt' : 'Thêm Prompt Mới'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan resize-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Tier</label>
                                    <select
                                        value={formData.tier}
                                        onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan"
                                    >
                                        {TIERS.map((tier) => (
                                            <option key={tier} value={tier}>{tier}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="isActive" className="text-gray-300">Active</label>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    {editingPrompt ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Upload Modal (Refactored to show code snippet or keep logic same) */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-brand-navy border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Upload Excel</h3>
                            <button onClick={() => { setIsUploadModalOpen(false); setUploadResult(null); }} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {uploadResult ? (
                            <div className="space-y-4">
                                <div className={`p-4 rounded-lg ${uploadResult.failed > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {uploadResult.failed > 0 ? (
                                            <AlertCircle className="w-5 h-5 text-amber-400" />
                                        ) : (
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        )}
                                        <span className="text-white font-medium">Upload Complete</span>
                                    </div>
                                    <p className="text-gray-300 text-sm">
                                        Imported: {uploadResult.success} / Failed: {uploadResult.failed}
                                    </p>
                                </div>
                                {uploadResult.errors.length > 0 && (
                                    <div className="p-4 bg-red-500/10 rounded-lg">
                                        <p className="text-red-400 text-sm mb-2">Errors:</p>
                                        <ul className="text-gray-400 text-xs space-y-1">
                                            {uploadResult.errors.map((err, i) => (
                                                <li key={i}>{err}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <Button variant="primary" className="w-full" onClick={() => { setIsUploadModalOpen(false); setUploadResult(null); }}>
                                    Done
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                                    <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-300 mb-2">Upload Excel file (.xlsx)</p>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Columns: title, content, category, tier (optional)
                                    </p>
                                    <label className="cursor-pointer">
                                        <span className="px-4 py-2 bg-brand-cyan/20 text-brand-cyan rounded-lg hover:bg-brand-cyan/30 transition-colors">
                                            Choose File
                                        </span>
                                        <input
                                            type="file"
                                            accept=".xlsx,.xls"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
