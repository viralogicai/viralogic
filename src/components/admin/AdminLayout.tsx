import { type ReactNode, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    LogOut,
    Menu
} from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
}

const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/prompts', icon: FileText, label: 'Prompts' },
    { path: '/admin/resources', icon: FolderOpen, label: 'Resources' },
];

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');

        if (!token) {
            navigate('/admin/login');
            return;
        }

        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-brand-dark flex">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-brand-navy border-r border-white/10 transform transition-transform duration-200
                lg:translate-x-0 lg:static
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <h1 className="text-xl font-display font-bold text-white">
                            ViraLogic <span className="text-brand-cyan">Admin</span>
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                    ${isActive
                                        ? 'bg-brand-cyan/10 text-brand-cyan'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User & Logout */}
                    <div className="p-4 border-t border-white/10">
                        {user && (
                            <div className="mb-4 px-4">
                                <p className="text-white font-medium text-sm">{user.name}</p>
                                <p className="text-gray-500 text-xs">{user.email}</p>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="flex-1 min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-brand-dark/80 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-white">{title}</h2>
                    </div>
                </header>

                {/* Page content */}
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
