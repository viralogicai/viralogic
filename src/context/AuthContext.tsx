'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type UserTier = 'guest' | 'starter' | 'pro' | 'vip_mentorship';

interface AuthContextType {
    userTier: UserTier;
    upgradeTier: (tier: UserTier) => void;
    checkAccess: (requiredTier: UserTier) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userTier, setUserTier] = useState<UserTier>('guest');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('viralogic_tier') as UserTier;
            if (stored) {
                setUserTier(stored);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('viralogic_tier', userTier);
        }
    }, [userTier]);

    const upgradeTier = (tier: UserTier) => {
        setUserTier(tier);
    };

    const checkAccess = (requiredTier: UserTier) => {
        const tiers: UserTier[] = ['guest', 'starter', 'pro', 'vip_mentorship'];
        const currentLevel = tiers.indexOf(userTier);
        const requiredLevel = tiers.indexOf(requiredTier);
        return currentLevel >= requiredLevel;
    };

    return (
        <AuthContext.Provider value={{ userTier, upgradeTier, checkAccess }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
