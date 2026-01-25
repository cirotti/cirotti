import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !iconRef.current) return;

        gsap.fromTo(
            iconRef.current,
            { rotate: -90, scale: 0.5, opacity: 0 },
            { rotate: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    }, [theme, mounted]);

    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full hover:bg-muted transition-colors focus:outline-none z-[60]"
            aria-label="Toggle theme"
        >
            <div ref={iconRef} className="flex items-center justify-center">
                {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-foreground" />
                ) : (
                    <Sun className="w-5 h-5 text-foreground" />
                )}
            </div>
        </button>
    );
};

export default ThemeToggle;
