import { useState, useEffect, useRef } from 'react';
import { Github, Mail, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Discord Webhook URL is not defined');
      setStatus('error');
      // In a real scenario, you might want to show a specific error or fallback
      return;
    }

    try {
      const payload = {
        embeds: [
          {
            title: 'New Contact Form Submission',
            color: 0xd4af37, // Gold color
            fields: [
              { name: 'Name', value: formData.name, inline: true },
              { name: 'Email', value: formData.email, inline: true },
              { name: 'Message', value: formData.message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
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
    { icon: Github, label: 'GitHub', href: 'https://github.com/Pens-1' },
    // { icon: Linkedin, label: 'LinkedIn', href: '#' },
    // { icon: Twitter, label: 'Twitter', href: '#' },
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
            業務自動化やデータ処理システムのご相談、協業のお誘いをお待ちしています。
            <br />
            ご都合にあわせて、柔軟に調整可能です。
          </p>
        </div>

        <div className={`relative ${isVisible ? 'slide-up delay-400' : 'opacity-0'}`}>
          {status === 'success' ? (
             <div className="text-center p-12 border border-gold/30 bg-gold/5 rounded-lg animate-fade-in">
               <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
               <h3 className="text-2xl text-white mb-2">Message Sent!</h3>
               <p className="text-white/70">お問い合わせありがとうございます。確認次第、ご連絡いたします。</p>
               <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm text-gold hover:underline underline-offset-4"
               >
                 Send another message
               </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 mb-16">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    disabled={status === 'submitting'}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/40 focus:border-gold focus:border-b-2 outline-none transition-all duration-300 hover:border-white/40 disabled:opacity-50"
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
                    disabled={status === 'submitting'}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/40 focus:border-gold focus:border-b-2 outline-none transition-all duration-300 hover:border-white/40 disabled:opacity-50"
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
                  disabled={status === 'submitting'}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/40 focus:border-gold focus:border-b-2 outline-none transition-all duration-300 hover:border-white/40 resize-none disabled:opacity-50"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
                   <AlertCircle className="w-4 h-4" />
                   <span>送信に失敗しました。時間をおいて再度お試しいただくか、GitHub経由でご連絡ください。</span>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group flex items-center gap-3 px-12 py-4 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 transform-gpu hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'submitting' ? (
                     <>
                       <Loader2 className="w-4 h-4 animate-spin" />
                       <span className="tracking-wider">Sending...</span>
                     </>
                  ) : (
                    <>
                      <span className="relative z-10 tracking-wider">Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

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
              <social.icon className="w-6 h-6 text-white/60 hover:text-gold transition-all duration-300 hover:scale-125 hover:rotate-12 transform-gpu" />
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
