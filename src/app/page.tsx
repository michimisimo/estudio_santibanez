"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { partners } from "@/data/partners"; // Importamos la BD centralizada

const faqs = [
  { q: '¿Cómo es el análisis inicial de un caso?', a: 'Evaluamos minuciosamente los antecedentes documentales y financieros para emitir un informe de viabilidad jurídica, trazando la ruta más eficiente antes de iniciar cualquier acción procesal o negociación.' },
  { q: '¿Manejan asuntos internacionales?', a: 'Sí, colaboramos de forma permanente con una red de estudios corresponsales de primer nivel en Norteamérica, Europa y el resto de Latinoamérica para acompañar la expansión de nuestros clientes corporativos.' },
  { q: '¿Cuál es el modelo de honorarios del estudio?', a: 'Mantenemos una política de transparencia total. Estructuramos nuestros honorarios dependiendo de la complejidad del asunto: mediante una tarifa por hora (con reporte detallado), igualas mensuales para clientes corporativos, o presupuestos cerrados por hitos procesales.' }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

const scrollPrev = () => {
    if (carouselRef.current) {
      // Avanza el ancho aproximado de una tarjeta + gap. El "snap" lo ajusta perfecto.
      const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 300;
      carouselRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 300;
      carouselRef.current.scrollBy({ left: (cardWidth + 24), behavior: 'smooth' });
    }
  };

  const infinitePartners = [...partners, ...partners, ...partners];

  useEffect(() => {
    // ==========================================
    // 1. ANIMACIONES DE REVELADO (SCROLL)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // ==========================================
    // 2. LÓGICA DEL CARRUSEL INFINITO
    // ==========================================
    const carousel = carouselRef.current;
    
    if (carousel) {
      // Función para obtener el ancho exacto de 1 Set de socios (1/3 del total)
      const getSetWidth = () => carousel.scrollWidth / 3;

      // Posicionamiento Inicial: Movemos el scroll al inicio del Set 2 (Sergio Santibañez)
      // Usamos un pequeño delay para asegurar que el CSS Flexbox ya renderizó los tamaños
      setTimeout(() => {
        carousel.style.scrollSnapType = 'none';
        carousel.scrollLeft = getSetWidth();
        carousel.style.scrollSnapType = 'x mandatory';
      }, 150);

      const handleScroll = () => {
        const currentScroll = carousel.scrollLeft;
        const setWidth = getSetWidth();
        
        // LÍMITE IZQUIERDO: Si el usuario retrocede y llega al inicio absoluto (Sergio del Set 1)
        if (currentScroll <= 0) {
          carousel.style.scrollSnapType = 'none'; // Apagamos el imán
          carousel.scrollLeft = setWidth;         // Saltamos invisiblemente al Set 2 (Sergio)
          
          // Doble frame para asegurar el repintado de la pantalla antes de encender el imán
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              carousel.style.scrollSnapType = 'x mandatory';
            });
          });
        } 
        // LÍMITE DERECHO: Si avanza y llega al inicio del Set 3 (Sergio del Set 3)
        // Usamos -5 como margen de seguridad por diferencias de sub-píxeles entre navegadores
        else if (currentScroll >= (setWidth * 2) - 5) {
          carousel.style.scrollSnapType = 'none'; 
          carousel.scrollLeft = setWidth;         // Saltamos invisiblemente de vuelta al Set 2
          
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              carousel.style.scrollSnapType = 'x mandatory';
            });
          });
        }
      };

      // Escuchamos el scroll con passive: true para no bloquear el rendimiento en móviles
      carousel.addEventListener("scroll", handleScroll, { passive: true });
      
      // Limpieza de eventos al cambiar de página
      return () => {
        revealElements.forEach(el => revealOnScroll.unobserve(el));
        carousel.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado exitosamente (Simulación).');
  };

  return (
    <main>
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="reveal">IX periti sumus</h1>
          <p className="reveal delay-1">Resolvemos la complejidad legal con precisión para proteger el patrimonio y el futuro de nuestros clientes.</p>
          <Link href="/#contacto" className="btn reveal delay-2">Agendar Sesión</Link>
        </div>
      </section>

      {/* ================= FILOSOFÍA ================= */}
      <section id="filosofia" className="philosophy">
        <div className="container" style={{ padding: '2rem 0' }}>
          <span className="quote-icon">“</span>
          <h2 className="section-title reveal" style={{ color: 'var(--accent)' }}>Nuestra Filosofía</h2>
          <p className="reveal delay-1">
            Creemos que el ejercicio del derecho no se trata solo de interpretar la norma, sino de entender el negocio y el contexto humano detrás de cada conflicto. En Estudio Santibañez, nos convertimos en aliados estratégicos de nuestros clientes, combinando la tradición de la abogacía clásica con la agilidad que demanda el mundo corporativo moderno.
          </p>
        </div>
      </section>

      {/* ================= ÁREAS DE PRÁCTICA ================= */}
      <section id="areas" className="container">
        <h2 className="section-title reveal">Áreas de Especialidad</h2>
        <p className="section-subtitle reveal">Un enfoque preventivo y analítico diseñado para escenarios de alta exigencia.</p>
        
        <div className="grid-3-cols">
          <div className="service-card reveal delay-1">
            <h3>Derecho Corporativo</h3>
            <p>Estructuración de negocios, fusiones, adquisiciones y diseño de gobiernos corporativos robustos.</p>
          </div>
          <div className="service-card reveal delay-2">
            <h3>Litigios y Arbitraje</h3>
            <p>Defensa técnica en disputas civiles y comerciales complejas ante tribunales ordinarios y arbitrales.</p>
          </div>
          <div className="service-card reveal delay-3">
            <h3>Derecho Tributario</h3>
            <p>Planificación fiscal estratégica y defensa especializada ante requerimientos administrativos y judiciales.</p>
          </div>
        </div>
      </section>

      {/* ================= CARRUSEL DE SOCIOS ================= */}
      <section id="equipo" className="container bg-white">
        
        {/* Nueva cabecera que agrupa títulos y controles */}
        <div className="carousel-header reveal">
          <div>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Nuestros Socios</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>Trayectoria académica y experiencia en la resolución de conflictos.</p>
          </div>
          
          <div className="carousel-controls">
            <button onClick={scrollPrev} className="btn-carousel" aria-label="Ver anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button onClick={scrollNext} className="btn-carousel" aria-label="Ver siguiente">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* El contenedor del carrusel se mantiene igual */}
       <div className="team-carousel reveal delay-1" ref={carouselRef}>
          {infinitePartners.map((partner, index) => (
            /* Convertimos TODA la tarjeta en un Link */
            <Link 
              href={`/socio/${partner.id}`} 
              key={`${partner.id}-${index}`} 
              className="team-member"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="team-img-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={partner.img} alt={partner.name} className="team-img" />
              </div>
              <h3>{partner.name}</h3>
              <p>{partner.role}</p>
              
              {/* Cambiamos el antiguo Link interno por un <span> visual */}
              <span className="profile-link">
                Ver perfil completo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
        
      </section>

      {/* ================= FAQ ================= */}
      <section className="container">
        <h2 className="section-title reveal">Consultas Frecuentes</h2>
        
        <div className="faq-wrapper reveal delay-1">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                <span>{faq.q}</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <p>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACTO ================= */}
      <section id="contacto" className="container bg-white">
        <h2 className="section-title reveal">Contáctenos</h2>
        <p className="section-subtitle reveal">Garantizamos absoluta reserva y confidencialidad desde su primer mensaje.</p>
        
        <div className="contact-wrapper reveal delay-1">
          <form onSubmit={handleContactSubmit}>
            <input type="text" className="form-control" required placeholder="Nombre completo o Empresa" />
            <input type="email" className="form-control" required placeholder="Correo electrónico corporativo" />
            <textarea className="form-control" required placeholder="Describa brevemente la naturaleza de su consulta..."></textarea>
            <button type="submit" className="btn btn-submit">Enviar Solicitud</button>
          </form>
        </div>
      </section>

      {/* ================= BOTÓN WHATSAPP ================= */}
      <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="fab-whatsapp" aria-label="Chat en WhatsApp">
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
      
    </main>
  );
}