
export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-[#03050a] py-12 px-6 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white text-xs font-display font-bold">V</div>
                    <span className="text-sm text-white font-medium">ViraLogic AI</span>
                </div>

                <div className="flex gap-6 text-xs text-gray-500">
                    <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
                    <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
                    <a href="#" className="hover:text-white transition-colors">Hỗ trợ</a>
                </div>

                <div className="text-xs text-gray-600">
                    © 2026 ViraLogic AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
