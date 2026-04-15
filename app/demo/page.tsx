'use client';

import Image from 'next/image';
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function DemoContent() {
    const searchParams = useSearchParams();

    const clinicName = searchParams.get('clinicName') || 'SmileCraft Dental Studio';
    const doctorName = searchParams.get('doctorName') || 'Dr. Priya Mehta';
    const phone = searchParams.get('phone') || '+91 98765 43210';
    const address = searchParams.get('address') || '14, North Main Road, Koregaon Park, Pune 411001';
    const location = searchParams.get('location') || 'Koregaon Park, Pune';
    const heroImage = searchParams.get('heroImage') || 'https://images.pexels.com/photos/5622277/pexels-photo-5622277.jpeg';

    const mapQuery = encodeURIComponent(address);
    const phoneClean = phone.replace(/\D/g, '');

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const submitForm = () => {
        const name = nameInputRef.current?.value;
        if (!name || !name.trim()) {
            alert('Please enter your name to book an appointment.');
            return;
        }
        alert(`Thank you, ${name}! ${doctorName}'s team will contact you within 2 hours to confirm your appointment.`);
    };

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        closeMenu();
    };

    return (
        <>
            <nav id="navbar" style={{ padding: isScrolled ? '0' : '' }}>
                <div className="nav-inner">
                    <div className="logo">{clinicName}</div>
                    <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Menu">
                        <span></span><span></span><span></span>
                    </button>
                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')}>Services</a></li>
                        <li><a href="#doctor" onClick={(e) => handleSmoothScroll(e, 'doctor')}>Our Doctor</a></li>
                        <li><a href="#results" onClick={(e) => handleSmoothScroll(e, 'results')}>Results</a></li>
                        <li><a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')}>Reviews</a></li>
                        <li><a href="#contact" className="nav-cta" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book Now</a></li>
                    </ul>
                </div>
            </nav>

            {/* HERO */}
            <section id="hero">
                <div className="hero-bg-img">
                    <Image src={heroImage} alt={clinicName} fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        {location}
                    </div>
                    <h1>Where <em>Confidence</em><br />Begins With<br />Your Smile</h1>
                    <p className="hero-sub">Premium dental care designed around you. From subtle enhancements to complete smile transformations — crafted with precision and care.</p>
                    <div className="hero-actions">
                        <a href="#contact" className="btn-primary" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book Consultation</a>
                        <a href="#services" className="btn-ghost" onClick={(e) => handleSmoothScroll(e, 'services')}>Explore Treatments</a>
                    </div>
                    <div className="hero-stats">
                        <div className="stat"><div className="stat-num">15+</div><div className="stat-label">Years Experience</div></div>
                        <div className="stat-divider"></div>
                        <div className="stat"><div className="stat-num">4,800+</div><div className="stat-label">Smiles Transformed</div></div>
                        <div className="stat-divider"></div>
                        <div className="stat"><div className="stat-num">4.9★</div><div className="stat-label">Google Rating</div></div>
                    </div>
                </div>
            </section>

            {/* PHOTOS STRIP */}
            <div className="photos-strip">
                <div className="photo-item">
                    <Image src="https://images.pexels.com/photos/6812427/pexels-photo-6812427.jpeg" alt="Dental clinic reception" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="25vw" />
                    <span>Reception Area</span>
                </div>
                <div className="photo-item">
                    <Image src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80" alt="Treatment room" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="25vw" />
                    <span>Treatment Suite</span>
                </div>
                <div className="photo-item">
                    <Image src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80" alt="Dental equipment" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="25vw" />
                    <span>Advanced Technology</span>
                </div>
                <div className="photo-item">
                    <Image src="https://img.freepik.com/free-photo/diverse-group-people-waiting-hospital-reception-lobby-attend-medical-appointment-with-general-practitioner-patients-waiting-room-lobby-sitting-healthcare-clinic-tripod-shot_482257-46247.jpg?semt=ais_hybrid&w=740&q=80" alt="Waiting area" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="25vw" />
                    <span>Patient Lounge</span>
                </div>
            </div>

            {/* SERVICES */}
            <section id="services">
                <div className="section-header reveal">
                    <div className="section-label">What We Offer</div>
                    <div className="section-title">Our <em>Treatments</em></div>
                    <div className="section-divider"></div>
                </div>
                <div className="services-grid">
                    <div className="service-card reveal">
                        <div className="service-img">
                            <Image src="https://images.pexels.com/photos/16212691/pexels-photo-16212691.png" alt="Teeth whitening" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="33vw" />
                            <div className="service-img-overlay"></div>
                        </div>
                        <div className="service-body">
                            <div className="service-icon-wrap">✦</div>
                            <div className="service-name">Teeth Whitening</div>
                            <div className="service-desc">Professional Zoom whitening — 8–10 shades brighter in a single session. Safe, effective, long-lasting results.</div>
                            <div className="service-footer">
                                <span className="service-price">From ₹6,000</span>
                                <a href="#contact" className="service-link" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book →</a>
                            </div>
                        </div>
                    </div>
                    <div className="service-card reveal">
                        <div className="service-img">
                            <Image src="https://www.smylifedental.co.in/wp-content/uploads/2018/02/invisalign.jpg" alt="Invisalign aligners" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="33vw" />
                            <div className="service-img-overlay"></div>
                        </div>
                        <div className="service-body">
                            <div className="service-icon-wrap">◈</div>
                            <div className="service-name">Invisalign Aligners</div>
                            <div className="service-desc">Straighten teeth discreetly with custom clear aligners. No metal, no discomfort — just a perfect smile.</div>
                            <div className="service-footer">
                                <span className="service-price">From ₹80,000</span>
                                <a href="#contact" className="service-link" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book →</a>
                            </div>
                        </div>
                    </div>
                    <div className="service-card reveal">
                        <div className="service-img">
                            <Image src="https://images.pexels.com/photos/16309612/pexels-photo-16309612.jpeg" alt="Dental implants" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="33vw" />
                            <div className="service-img-overlay"></div>
                        </div>
                        <div className="service-body">
                            <div className="service-icon-wrap">◎</div>
                            <div className="service-name">Dental Implants</div>
                            <div className="service-desc">Permanent tooth replacement that looks, feels, and functions like natural teeth. Swiss implants, lifetime warranty.</div>
                            <div className="service-footer">
                                <span className="service-price">From ₹35,000</span>
                                <a href="#contact" className="service-link" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book →</a>
                            </div>
                        </div>
                    </div>
                    <div className="service-card reveal">
                        <div className="service-img">
                            <Image src="https://media.istockphoto.com/id/973923664/photo/dentist-cleaning-teeth-with-titanium-metal-tooth-pick-instrument-to-remove-plaque-and-decay.jpg?s=612x612&w=0&k=20&c=QNG4Mxcd4FfCUFd4fDSAGCtIfwy_Nx0rHjstxrgk9ZA=" alt="Root canal treatment" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="33vw" />
                            <div className="service-img-overlay"></div>
                        </div>
                        <div className="service-body">
                            <div className="service-icon-wrap">⬡</div>
                            <div className="service-name">Root Canal Therapy</div>
                            <div className="service-desc">Pain-free rotary endodontics. Save your natural tooth — completed in a single, comfortable appointment.</div>
                            <div className="service-footer">
                                <span className="service-price">From ₹5,500</span>
                                <a href="#contact" className="service-link" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book →</a>
                            </div>
                        </div>
                    </div>
                    <div className="service-card reveal">
                        <div className="service-img">
                            <Image src="https://t4.ftcdn.net/jpg/19/44/62/71/240_F_1944627135_6HEXJGCJWmwUBYGf5waGmLddtfotBLCv.jpg" alt="Smile designing veneers" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="33vw" />
                            <div className="service-img-overlay"></div>
                        </div>
                        <div className="service-body">
                            <div className="service-icon-wrap">◇</div>
                            <div className="service-name">Smile Designing</div>
                            <div className="service-desc">Digital smile preview before any procedure. Veneers, bonding & contouring for a Hollywood-worthy smile.</div>
                            <div className="service-footer">
                                <span className="service-price">From ₹12,000</span>
                                <a href="#contact" className="service-link" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book →</a>
                            </div>
                        </div>
                    </div>
                    <div className="service-card reveal">
                        <div className="service-img">
                            <Image src="https://media.istockphoto.com/id/489865490/photo/teeth-checkup-at-dentists-office-dentist-examining-girls-teeth.jpg?s=612x612&w=0&k=20&c=EgtajCOVo_-JgvWIHEVE-zt6qlINW2NfWXYXjq4P8pw=" alt="Kids dentistry" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="33vw" />
                            <div className="service-img-overlay"></div>
                        </div>
                        <div className="service-body">
                            <div className="service-icon-wrap">○</div>
                            <div className="service-name">Paediatric Dentistry</div>
                            <div className="service-desc">Gentle, fun dental care for children from age 3. Building positive habits that last a lifetime.</div>
                            <div className="service-footer">
                                <span className="service-price">From ₹800</span>
                                <a href="#contact" className="service-link" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book →</a>
                            </div>
                        </div>
                    </div>
                    <div className="service-card reveal">
                        <div className="service-img">
                            <Image src="https://media.istockphoto.com/id/1254343541/photo/3d-render-of-jaw-x-ray-with-implants-supported-dental-bridge.jpg?s=612x612&w=0&k=20&c=y5B52-VWBE1OBo0g88m_7ndtSPu6Cw0K3OdpDBDSEZw=" alt="Crowns and Bridges" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="33vw" />
                            <div className="service-img-overlay"></div>
                        </div>
                        <div className="service-body">
                            <div className="service-icon-wrap">◨</div>
                            <div className="service-name">Crowns & Bridges</div>
                            <div className="service-desc">Restore damaged or missing teeth with custom-crafted, natural-looking ceramic crowns and bridges.</div>
                            <div className="service-footer">
                                <span className="service-price">From ₹8,000</span>
                                <a href="#contact" className="service-link" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book →</a>
                            </div>
                        </div>
                    </div>
                    <div className="service-card reveal">
                        <div className="service-img">
                            <Image src="https://media.istockphoto.com/id/2193409937/photo/asian-woman-inflamed-swollen-gums.webp?a=1&b=1&s=612x612&w=0&k=20&c=cMXiB_RO1y8F-kKtGSgsaxzbNGKT9l_VpiDiiZwFFqk=" alt="Gum Therapy" width={600} height={400} style={{ objectFit: 'cover', width: '100%', height: '100%' }} sizes="33vw" />
                            <div className="service-img-overlay"></div>
                        </div>
                        <div className="service-body">
                            <div className="service-icon-wrap">⚱</div>
                            <div className="service-name">Gum Therapy</div>
                            <div className="service-desc">Advanced periodontal care to treat gum disease, prevent tooth loss, and maintain optimal oral health.</div>
                            <div className="service-footer">
                                <span className="service-price">From ₹3,000</span>
                                <a href="#contact" className="service-link" onClick={(e) => handleSmoothScroll(e, 'contact')}>Book →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DOCTOR */}
            <section id="doctor">
                <div className="doctor-inner">
                    <div className="doctor-img-wrap reveal">
                        <div className="doctor-frame"></div>
                        <Image
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=80"
                            alt={doctorName}
                            width={700} height={900}
                            className="doctor-photo"
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="doctor-badge-float">
                            <span className="badge-num">15+</span>
                            <span className="badge-lbl">Years of Care</span>
                        </div>
                    </div>
                    <div className="doctor-content reveal">
                        <div className="section-label">Meet Your Doctor</div>
                        <h2 className="doc-name"><em>{doctorName}</em></h2>
                        <div className="doc-title">BDS · MDS (Prosthodontics) · Invisalign Platinum Provider</div>
                        <div className="section-divider"></div>
                        <p className="doc-bio">Welcome to {clinicName}. With years of dedicated practice, {doctorName} has built a reputation for combining clinical excellence with genuine compassion — bringing world-class expertise to every patient.</p>
                        <div className="doc-creds">
                            <div className="doc-cred"><span className="cred-line"></span>MDS — Armed Forces Medical College, Pune</div>
                            <div className="doc-cred"><span className="cred-line"></span>Advanced Implantology — Royal College, London</div>
                            <div className="doc-cred"><span className="cred-line"></span>Certified Invisalign Provider (Platinum Level)</div>
                            <div className="doc-cred"><span className="cred-line"></span>Speaker — National Dental Congress 2022, 2023</div>
                        </div>
                        <a href="#contact" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }} onClick={(e) => handleSmoothScroll(e, 'contact')}>
                            Meet {doctorName} →
                        </a>
                    </div>
                </div>
            </section>

            {/* RESULTS */}
            <section id="results" style={{ background: 'var(--dark2)' }}>
                <div className="section-header reveal">
                    <div className="section-label">Real Patients · Real Results</div>
                    <div className="section-title">Before &amp; <em>After</em></div>
                    <div className="section-divider"></div>
                </div>
                <div className="results-grid">
                    <div className="result-card reveal">
                        <div className="result-pair">
                            <div className="result-half">
                                <Image src="https://i.postimg.cc/5NyGFGZF/before.png" alt="Before smile treatment" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                <div className="ba-label before-lbl">Before</div>
                            </div>
                            <div className="result-half">
                                <Image src="https://i.postimg.cc/kGqs9P3H/after.png" alt="After smile treatment" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                <div className="ba-label after-lbl">After</div>
                            </div>
                        </div>
                        <div className="result-info">
                            <div className="result-treatment">Smile Makeover + Veneers</div>
                            <div className="result-detail">Patient: Sneha R. &nbsp;·&nbsp; 3 week treatment</div>
                        </div>
                    </div>
                    <div className="result-card reveal">
                        <div className="result-pair">
                            <div className="result-half">
                                <Image src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&q=80" alt="Before teeth alignment" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                <div className="ba-label before-lbl">Before</div>
                            </div>
                            <div className="result-half">
                                <Image src="https://images.ctfassets.net/vh25xg5i1h5l/7mBIU2XUrep5UbR0uzTQFW/eb3655c1c2f1722f433797d9b8e47519/photo-resources-patrick-mahomes-grey-background-putting-in-invisalign.jpg?w=1920" alt="After invisalign" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                <div className="ba-label after-lbl">After</div>
                            </div>
                        </div>
                        <div className="result-info">
                            <div className="result-treatment">Invisalign Clear Aligners</div>
                            <div className="result-detail">Patient: Rahul M. &nbsp;·&nbsp; 8 month treatment</div>
                        </div>
                    </div>
                    <div className="result-card reveal">
                        <div className="result-pair">
                            <div className="result-half">
                                <Image src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80" alt="Before whitening" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                <div className="ba-label before-lbl">Before</div>
                            </div>
                            <div className="result-half">
                                <Image src="https://i.pinimg.com/736x/d0/76/e6/d076e69d0ded3ae92ac00f7d1835fd8c.jpg" alt="After whitening" width={400} height={300} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                <div className="ba-label after-lbl">After</div>
                            </div>
                        </div>
                        <div className="result-info">
                            <div className="result-treatment">Zoom Teeth Whitening</div>
                            <div className="result-detail">Patient: Anjali S. &nbsp;·&nbsp; Single session</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials">
                <div className="section-header reveal">
                    <div className="section-label">Patient Stories</div>
                    <div className="section-title">What Our <em>Patients</em> Say</div>
                    <div className="section-divider"></div>
                </div>
                <div className="testi-grid">
                    <div className="testi-card reveal">
                        <div className="testi-quote">"</div>
                        <p className="testi-text">I was terrified of dentists my whole life. The doctor changed that completely. My Invisalign journey was painless and the results are beyond what I expected. The clinic feels like a luxury spa, not a dental office.</p>
                        <div className="testi-author">
                            <Image src="https://images.unsplash.com/photo-1675469675830-11d9a6099ef4?w=80&q=80" alt="Sneha Rathod" width={80} height={80} className="testi-avatar-img" style={{ objectFit: 'cover' }} />
                            <div><div className="testi-name">Sneha Rathod</div><div className="testi-stars">★★★★★</div></div>
                        </div>
                    </div>
                    <div className="testi-card reveal">
                        <div className="testi-quote">"</div>
                        <p className="testi-text">Got 3 implants done here. The technology they use is incredible — I was eating normally within days. The doctor explains every step patiently. Worth every rupee!</p>
                        <div className="testi-author">
                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" alt="Anil Marathe" width={80} height={80} className="testi-avatar-img" style={{ objectFit: 'cover' }} />
                            <div><div className="testi-name">Anil Marathe</div><div className="testi-stars">★★★★★</div></div>
                        </div>
                    </div>
                    <div className="testi-card reveal">
                        <div className="testi-quote">"</div>
                        <p className="testi-text">Came in for teeth whitening before my wedding. The results were stunning — 8 shades whiter in one session! Everyone kept complimenting my smile in the wedding photos.</p>
                        <div className="testi-author">
                            <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" alt="Pooja Joshi" width={80} height={80} className="testi-avatar-img" style={{ objectFit: 'cover' }} />
                            <div><div className="testi-name">Pooja Joshi</div><div className="testi-stars">★★★★★</div></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" style={{ background: 'var(--dark2)', padding: '0' }}>
                <div className="contact-wrapper">
                    <div className="contact-info reveal">
                        <div className="section-label">Visit Us</div>
                        <div className="section-title">Book Your <em>Consultation</em></div>
                        <div className="section-divider"></div>
                        <div className="contact-detail">
                            <div className="contact-icon">📍</div>
                            <div>
                                <div className="contact-label">Location</div>
                                <div className="contact-val">{address}</div>
                            </div>
                        </div>
                        <div className="contact-detail">
                            <div className="contact-icon">📞</div>
                            <div>
                                <div className="contact-label">Phone / WhatsApp</div>
                                <div className="contact-val">
                                    <a href={`tel:${phone}`} style={{ color: 'var(--cream)', textDecoration: 'none' }}>{phone}</a>
                                </div>
                            </div>
                        </div>
                        <div className="contact-detail">
                            <div className="contact-icon">🕐</div>
                            <div>
                                <div className="contact-label">Clinic Hours</div>
                                <div className="contact-val">Mon–Sat: 10 AM – 8 PM<br />Sunday: By Appointment Only</div>
                            </div>
                        </div>
                        <a href={`https://wa.me/${phoneClean}?text=Hi%20${encodeURIComponent(doctorName)}!%20I%20would%20like%20to%20book%20a%20consultation%20at%20${encodeURIComponent(clinicName)}.`} className="whatsapp-btn" target="_blank" rel="noreferrer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Chat on WhatsApp
                        </a>
                        <div className="map-embed">
                            <iframe src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`} width="100%" height="220" style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(80%)' }} allowFullScreen={false} loading="lazy"></iframe>
                        </div>
                    </div>
                    <div className="contact-form reveal">
                        <div className="form-title">Request an Appointment</div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-input" placeholder="Your name" ref={nameInputRef} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-input" placeholder="you@email.com" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Treatment Interest</label>
                            <select className="form-input">
                                <option value="">Select a service</option>
                                <option>Teeth Whitening</option>
                                <option>Invisalign Clear Aligners</option>
                                <option>Dental Implants</option>
                                <option>Root Canal Therapy</option>
                                <option>Smile Designing</option>
                                <option>Paediatric Dentistry</option>
                                <option>General Checkup</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Preferred Date</label>
                            <input type="date" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message (Optional)</label>
                            <textarea className="form-input" rows={3} placeholder="Any concerns or special requirements..."></textarea>
                        </div>
                        <button className="btn-primary btn-full" onClick={submitForm}>Request Appointment</button>
                        <p className="form-note">Our team will confirm within 2 hours via WhatsApp or call.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer>
                <div className="footer-inner">
                    <div className="footer-logo">{clinicName}</div>
                    <div className="footer-links">
                        <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')}>Services</a>
                        <a href="#doctor" onClick={(e) => handleSmoothScroll(e, 'doctor')}>Doctor</a>
                        <a href="#results" onClick={(e) => handleSmoothScroll(e, 'results')}>Results</a>
                        <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
                    </div>
                    <div className="footer-text">© 2025 {clinicName} · {location}</div>
                </div>
            </footer>

            <a href={`https://wa.me/${phoneClean}`} className="float-wa" target="_blank" rel="noreferrer" title="Chat on WhatsApp">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
        </>
    );
}

export default function DemoPage() {
    return (
        <Suspense fallback={<div style={{ background: '#0A0A0A', minHeight: '100vh' }}></div>}>
            <DemoContent />
        </Suspense>
    );
}