import Link from "next/link";
import { notFound } from "next/navigation";
import { partners } from "@/data/partners";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const partner = partners.find(p => p.id === resolvedParams.id);
  
  if (!partner) return { title: 'Socio no encontrado' };
  
  return {
    title: `${partner.name} - Estudio Santibañez`,
    description: `Perfil profesional de ${partner.name}, ${partner.role}.`
  };
}

export default async function PartnerPage({ params }: Props) {
  const resolvedParams = await params;
  const partner = partners.find(p => p.id === resolvedParams.id);

  if (!partner) {
    notFound();
  }

  async function handleContactSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    
    console.log(`📩 CONSULTA ENVIADA DESDE PERFIL DE: ${partner?.name}`);
    console.log(`De: ${name} (${email})`);
    console.log(`Mensaje: ${message}`);
  }

  return (
    <main style={{ backgroundColor: '#ffffff', color: '#1a202c', minHeight: '100vh', paddingTop: '100px' }}>
      {/* ================= HERO DEL PERFIL ================= */}
      <section className="profile-hero">
        <div className="profile-img-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={partner.img} 
            alt={`Retrato corporativo de ${partner.name}`} 
            className="partner-portrait" 
          />
        </div>
        
        <div className="profile-info-col">
          <Link href="/#equipo" className="btn-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al equipo
          </Link>
          
          <h1 className="profile-title" style={{ color: '#1a202c' }}>{partner.name}</h1>
          <p className="profile-role">{partner.role}</p>

          <h4 style={{ marginBottom: '1rem', color: '#1a202c' }}>Áreas de Práctica</h4>
          <div className="pills-wrapper">
            {partner.specialties.map(spec => (
              <span key={spec} className="pill pill-accent">{spec}</span>
            ))}
          </div>

          <h4 style={{ marginTop: '1rem', marginBottom: '1rem', color: '#1a202c' }}>Idiomas</h4>
          <div className="pills-wrapper">
            {partner.languages.map(lang => (
              <span key={lang} className="pill pill-dark">{lang}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAYECTORIA Y FORMACIÓN ================= */}
      <section className="container bg-white" style={{ padding: '4rem 5%', borderBottom: '1px solid #e5e5e5' }}>
        <div className="timeline-grid">
          <div>
            <h2 className="section-title" style={{ marginBottom: '2.5rem', fontSize: '2rem', color: '#1a202c' }}>
              Trayectoria
            </h2>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-date">Actualidad</span>
                <h3 style={{ marginBottom: '0.5rem', color: '#1a202c' }}>{partner.role}</h3>
                <p style={{ fontWeight: 'bold', color: '#4a5568' }}>Estudio Santibañez, Santiago, Chile.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="section-title" style={{ marginBottom: '2.5rem', fontSize: '2rem', color: '#1a202c' }}>
              Formación
            </h2>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-date">Grado Académico</span>
                <h3 style={{ marginBottom: '0.5rem', color: '#1a202c' }}>Licenciatura en Ciencias Jurídicas</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACTO (Sin clases "reveal") ================= */}
      <section id="contacto" className="container bg-white" style={{ padding: '4rem 5%' }}>
        <h2 className="section-title" style={{ textAlign: 'center', color: '#1a202c' }}>Contáctenos</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', color: '#718096', marginBottom: '2rem' }}>
          Garantizamos absoluta reserva y confidencialidad desde su primer mensaje.
        </p>
        
        <div className="contact-wrapper">
          <form action={handleContactSubmit}>
            <input type="text" name="name" className="form-control" required placeholder="Nombre completo o Empresa" />
            <input type="email"  name="email" className="form-control" required placeholder="Correo electrónico corporativo" />
            <textarea name="message" className="form-control" required placeholder="Describa brevemente la naturaleza de su consulta..."></textarea>
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