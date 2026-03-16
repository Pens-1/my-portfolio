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
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      setStatus('error');
      return;
    }

    try {
      const payload = {
        embeds: [
          {
            title: 'New Contact Form Submission',
            color: 0xfbff48,
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/Pens-1' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@example.com' },
  ];

  const inputClass =
    'w-full bg-neo-black border-2 border-white/20 px-4 py-4 text-white font-body placeholder-white/30 focus:border-neo-blue focus:outline-none transition-colors duration-200 focus:shadow-[4px_4px_0_#3B82F6]';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-neo-black py-32 px-8 overflow-hidden grid-bg"
    >
      <span className="section-num">04</span>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="font-mono text-neo-blue/60 text-xs uppercase tracking-[0.3em] mb-3">
            &gt; Let's work together
          </div>
          <h2
            className="font-display font-black text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            GET IN<br />
            <span className="text-neo-blue">TOUCH</span>
          </h2>
          <div className="mt-6 w-16 h-1 bg-neo-blue" />
          <p className="mt-6 text-white/50 font-body max-w-lg">
            業務自動化やデータ処理システムのご相談、協業のお誘いをお待ちしています。
            ご都合にあわせて、柔軟に調整可能です。
          </p>
        </div>

        {/* Form */}
        <div
          className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {status === 'success' ? (
            <div className="border-2 border-neo-green p-12 text-center shadow-[6px_6px_0_#33FF57]">
              <CheckCircle className="w-14 h-14 text-neo-green mx-auto mb-6" />
              <h3 className="font-display font-black text-2xl text-white mb-3">MESSAGE SENT!</h3>
              <p className="text-white/60 font-body mb-8">
                お問い合わせありがとうございます。確認次第、ご連絡いたします。
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="font-mono text-xs text-neo-green uppercase tracking-widest hover:underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  disabled={status === 'submitting'}
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  disabled={status === 'submitting'}
                  className={inputClass}
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                rows={7}
                disabled={status === 'submitting'}
                className={`${inputClass} resize-none`}
              />

              {status === 'error' && (
                <div className="flex items-center gap-2 text-neo-pink font-mono text-xs border-2 border-neo-pink p-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>送信に失敗しました。時間をおいて再度お試しいただくか、GitHub経由でご連絡ください。</span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="neo-btn border-2 border-neo-blue text-neo-blue bg-transparent shadow-[5px_5px_0_#3B82F6] hover:shadow-[1px_1px_0_#3B82F6] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-100 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Social links */}
        <div
          className={`flex gap-4 mt-16 pt-12 border-t-2 border-white/10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-white/50 uppercase tracking-widest border-2 border-white/10 px-4 py-2 hover:border-neo-yellow hover:text-neo-yellow hover:shadow-[3px_3px_0_#FBFF48] transition-all duration-150"
            >
              <social.icon className="w-4 h-4" />
              {social.label}
            </a>
          ))}
        </div>

        <div
          className={`mt-12 font-mono text-[10px] text-white/20 uppercase tracking-widest transition-all duration-700 delay-[400ms] ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          © 2025 Portfolio. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Contact;
