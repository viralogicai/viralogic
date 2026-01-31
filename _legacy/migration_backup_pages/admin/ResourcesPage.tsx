import { useEffect, useState, useCallback } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
    Plus,
    Trash2,
    Edit,
    X,
    Save,
    Loader2,
    Video,
    FileText,
    Link as LinkIcon,
    FileSpreadsheet
} from 'lucide-react';
import { Button } from '../../components/Button';

interface Resource {
    id: string;
    month: string;
    title: string;
    description: string | null;
    type: string;
    url: string;
    tier: 'FREE' | 'STARTER' | 'PRO' | 'VIP_MENTORSHIP';
    isActive: boolean;
    order: number;
    createdAt: string;
}

const TIERS = ['FREE', 'STARTER', 'PRO', 'VIP_MENTORSHIP'] as const;
const TYPES = [
    { value: 'video', label: 'Video', icon: Video },
    { value: 'pdf', label: 'PDF', icon: FileText },
    { value: 'link', label: 'Link', icon: LinkIcon },
    { value: 'excel', label: 'Excel', icon: FileSpreadsheet },
];

export const ResourcesPage = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResource, setEditingResource] = useState<Resource | null>(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [formData, setFormData] = useState<{
        month: string;
        title: string;
        description: string;
        type: string;
        url: string;
        tier: 'FREE' | 'STARTER' | 'PRO' | 'VIP_MENTORSHIP';
        isActive: boolean;
    }>({
        month: new Date().toISOString().slice(0, 7),
        title: '',
        description: '',
        type: 'video',
        url: '',
        tier: 'PRO',
        isActive: true
    });
    const [isSaving, setIsSaving] = useState(false);

    const fetchResources = useCallback(async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            const response = await fetch(`/api/admin/resources?month=${selectedMonth}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setResources(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedMonth]);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            const url = '/api/admin/resources';
            const method = editingResource ? 'PUT' : 'POST';
            const body = editingResource
                ? { id: editingResource.id, ...formData }
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
                setEditingResource(null);
                resetForm();
                fetchResources();
            }
        } catch (error) {
            console.error('Failed to save resource:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa resource này?')) return;

        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            await fetch(`/api/admin/resources?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchResources();
        } catch (error) {
            console.error('Failed to delete resource:', error);
        }
    };

    const handleEdit = (resource: Resource) => {
        setEditingResource(resource);
        setFormData({
            month: resource.month,
            title: resource.title,
            description: resource.description || '',
            type: resource.type,
            url: resource.url,
            tier: resource.tier,
            isActive: resource.isActive
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            month: selectedMonth,
            title: '',
            description: '',
            type: 'video',
            url: '',
            tier: 'PRO',
            isActive: true
        });
    };

    const getTypeIcon = (type: string) => {
        const typeInfo = TYPES.find(t => t.value === type);
        return typeInfo?.icon || LinkIcon;
    };

    // Generate month options (current month + 11 previous)
    const monthOptions = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return date.toISOString().slice(0, 7);
    });

    return (
        <AdminLayout title="Resources Management">
            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan"
                >
                    {monthOptions.map((month) => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
                <Button
                    variant="primary"
                    onClick={() => {
                        setEditingResource(null);
                        resetForm();
                        setFormData(prev => ({ ...prev, month: selectedMonth }));
                        setIsModalOpen(true);
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm Resource
                </Button>
            </div>

            {/* Resources Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource) => {
                        const TypeIcon = getTypeIcon(resource.type);
                        return (
                            <div key={resource.id} className="glass-panel p-6 rounded-xl">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${resource.type === 'video' ? 'bg-red-500/20 text-red-400' :
                                        resource.type === 'pdf' ? 'bg-blue-500/20 text-blue-400' :
                                            resource.type === 'excel' ? 'bg-emerald-500/20 text-emerald-400' :
                                                'bg-violet-500/20 text-violet-400'
                                        }`}>
                                        <TypeIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(resource)}
                                            className="p-2 text-gray-400 hover:text-brand-cyan transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(resource.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <h4 className="text-white font-medium mb-2">{resource.title}</h4>
                                {resource.description && (
                                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{resource.description}</p>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs ${resource.tier === 'VIP_MENTORSHIP' ? 'bg-amber-500/20 text-amber-400' :
                                        resource.tier === 'PRO' ? 'bg-violet-500/20 text-violet-400' :
                                            resource.tier === 'STARTER' ? 'bg-brand-cyan/20 text-brand-cyan' :
                                                'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {resource.tier}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs ${resource.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-500'
                                        }`}>
                                        {resource.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    {resources.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            Chưa có resource nào cho tháng {selectedMonth}
                        </div>
                    )}
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-lg bg-brand-navy border border-white/10 rounded-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">
                                {editingResource ? 'Edit Resource' : 'Thêm Resource Mới'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Month</label>
                                    <input
                                        type="month"
                                        value={formData.month}
                                        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan"
                                    >
                                        {TYPES.map((type) => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
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
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
                                <input
                                    type="url"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-cyan"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
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
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 pb-3">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-gray-300">Active</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    {editingResource ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ResourcesPage;
