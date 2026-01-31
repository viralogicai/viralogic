import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'ViraLogic AI',
  description: 'AI-Powered Viral Content Creation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(
          inter.variable,
          spaceGrotesk.variable,
          "bg-brand-dark text-slate-50 font-sans antialiased"
        )}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
