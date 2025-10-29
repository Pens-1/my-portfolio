import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@example.com' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen bg-black py-32 px-8 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2
            className={`text-5xl md:text-6xl mb-6 ${
              isVisible ? 'fade-in' : 'opacity-0'
            }`}
          >
            Get In Touch
          </h2>
          <div
            className={`w-24 h-px bg-gold mx-auto mb-8 ${
              isVisible ? 'fade-in delay-200' : 'opacity-0'
            }`}
          />
          <p
            className={`text-white/70 text-lg ${
              isVisible ? 'fade-in delay-300' : 'opacity-0'
            }`}
          >
            新しいプロジェクトのご相談、協業のお誘いをお待ちしています
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-8 mb-16 ${
            isVisible ? 'slide-up delay-400' : 'opacity-0'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/40 focus:border-gold outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/40 focus:border-gold outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={6}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/40 focus:border-gold outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="group flex items-center gap-3 px-12 py-4 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300"
            >
              <span className="tracking-wider">Send Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        <div
          className={`flex justify-center gap-8 pt-12 border-t border-white/10 ${
            isVisible ? 'fade-in delay-600' : 'opacity-0'
          }`}
        >
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6 text-white/60 hover:text-gold transition-colors" />
            </a>
          ))}
        </div>

        <div
          className={`text-center mt-16 text-white/40 text-sm ${
            isVisible ? 'fade-in delay-700' : 'opacity-0'
          }`}
        >
          <p>2025 Portfolio. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
