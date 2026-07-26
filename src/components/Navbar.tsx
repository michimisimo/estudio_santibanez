"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importamos el detector de rutas

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Verificamos si estamos en el Home exacto
    const isHomePage = pathname === "/";
    
    // El navbar se verá "sólido" si hacemos scroll, O si NO estamos en el Home
    const navClass = (isScrolled || !isHomePage) ? "scrolled" : "";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header id="navbar" className={navClass}>
            <Link href="/" className="logo">
                Estudio Santibáñez y Asociados
            </Link>
            <nav>
                <Link href="/#filosofia">Estudio</Link>
                <Link href="/#areas">Práctica</Link>
                <Link href="/#equipo">Equipo</Link>
                <Link href="/#contacto">Contacto</Link>
            </nav>
        </header>
    );
}