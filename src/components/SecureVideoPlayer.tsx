'use client';

import { useRef, useState } from 'react';
import { Play, Pause, Shield } from 'lucide-react';

interface SecureVideoPlayerProps {
    src: string;
    poster?: string;
    title: string;
}

export const SecureVideoPlayer = ({ src, poster, title }: SecureVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div
            className="relative group rounded-xl overflow-hidden bg-black border border-white/10"
            onContextMenu={(e) => e.preventDefault()} // Disable Right Click
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full aspect-video object-cover"
                controls={false} // Custom controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controlsList="nodownload" // Chrome hint
            />

            {/* Security Overlay (Prevent Drag/Drop and Save) */}
            <div className="absolute inset-0 z-10 bg-transparent" onClick={togglePlay}></div>

            {/* UI Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 transition-opacity duration-300"
                style={{ opacity: isPlaying ? 0 : 1 }}>
                <div className="flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-white flex items-center gap-1 border border-white/10">
                        <Shield className="w-3 h-3 text-brand-cyan" />
                        Protected Content
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-brand-cyan/20 backdrop-blur-sm flex items-center justify-center border border-brand-cyan/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        {isPlaying ? <Pause className="w-8 h-8 text-white fill-current" /> : <Play className="w-8 h-8 text-white fill-current ml-1" />}
                    </div>
                </div>

                <div className="bg-gradient-to-t from-black/80 to-transparent p-4 -mx-4 -mb-4 pt-12">
                    <h3 className="text-white font-medium text-lg">{title}</h3>
                </div>
            </div>
        </div>
    );
};
