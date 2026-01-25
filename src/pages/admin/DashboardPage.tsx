import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { FileText, FolderOpen, Users, TrendingUp } from 'lucide-react';

interface Stats {
    totalPrompts: number;
    totalResources: number;
    totalUsers: number;
    activeMonth: string;
}

export const DashboardPage = () => {
    const [stats, setStats] = useState<Stats>({
        totalPrompts: 0,
        totalResources: 0,
        totalUsers: 0,
        activeMonth: new Date().toISOString().slice(0, 7)
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) return;

            try {
                // Fetch prompts count
                const promptsRes = await fetch('/api/admin/prompts', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const promptsData = await promptsRes.json();

                // Fetch resources count
                const resourcesRes = await fetch('/api/admin/resources', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const resourcesData = await resourcesRes.json();

                setStats({
                    totalPrompts: promptsData.data?.length || 0,
                    totalResources: resourcesData.data?.length || 0,
                    totalUsers: 0, // TODO: Implement users API
                    activeMonth: new Date().toISOString().slice(0, 7)
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Prompts', value: stats.totalPrompts, icon: FileText, color: 'text-brand-cyan' },
        { label: 'Total Resources', value: stats.totalResources, icon: FolderOpen, color: 'text-violet-400' },
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-emerald-400' },
        { label: 'Active Month', value: stats.activeMonth, icon: TrendingUp, color: 'text-amber-400' },
    ];

    return (
        <AdminLayout title="Dashboard">
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full" />
                </div>
            ) : (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((stat) => (
                            <div key={stat.label} className="glass-panel p-6 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">{stat.label}</p>
                                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a href="/admin/prompts" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                <FileText className="w-6 h-6 text-brand-cyan mb-2" />
                                <p className="text-white font-medium">Manage Prompts</p>
                                <p className="text-gray-500 text-sm">Add, edit, or delete prompts</p>
                            </a>
                            <a href="/admin/resources" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                <FolderOpen className="w-6 h-6 text-violet-400 mb-2" />
                                <p className="text-white font-medium">Manage Resources</p>
                                <p className="text-gray-500 text-sm">Configure monthly resources</p>
                            </a>
                            <a href="/admin/prompts" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
                                <p className="text-white font-medium">Upload Excel</p>
                                <p className="text-gray-500 text-sm">Bulk import prompts</p>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
};
