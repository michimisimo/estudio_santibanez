"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === "/";
    const isSolid = isScrolled || !isHomePage || isMenuOpen;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Cerrar el menú automáticamente cuando se cambia de página o se hace clic en un enlace
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header id="navbar" className={isSolid ? "scrolled" : ""}>
            <div className="navbar-container">
                <Link href="/" className="logo">
                   Estudio Santibañez
                </Link>

                {/* Botón Hamburguesa (Solo visible en móviles) */}
                <button 
                    className="hamburger-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Navigation"
                >
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>

                {/* Menú de Navegación */}
                <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                    <Link href="/#filosofia" onClick={() => setIsMenuOpen(false)}>Estudio</Link>
                    <Link href="/#areas" onClick={() => setIsMenuOpen(false)}>Práctica</Link>
                    <Link href="/#equipo" onClick={() => setIsMenuOpen(false)}>Equipo</Link>
                    <Link href="/#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
                </nav>
            </div>
        </header>
    );
}