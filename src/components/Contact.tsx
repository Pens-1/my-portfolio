import { useState } from 'react';
import { Github, Mail, Send, Loader2, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

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
            color: 0x7cf7d6,
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
        throw new Error('Failed to send');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    'w-full bg-transparent border border-border px-4 py-3 text-fg placeholder-fg-faint font-sans text-sm focus:border-accent focus:outline-none transition-colors';

  return (
    <section id="contact" className="py-28 md:py-36 border-t border-border">
      <div className="container-prose">
        <header className="mb-12">
          <div className="eyebrow mb-3">05. Contact</div>
          <h2 className="font-display text-display-lg text-fg mb-4">
            Get in touch.
          </h2>
          <p className="text-fg-muted max-w-xl">
            業務自動化・データ処理・AI 統合システムの開発相談、フリーランス案件の打診、
            協業の声かけ、どれでも歓迎します。
          </p>
        </header>

        {status === 'success' ? (
          <div className="border border-accent/50 bg-accent-dim p-8 max-w-xl">
            <CheckCircle className="w-10 h-10 text-accent mb-4" />
            <h3 className="font-display text-xl font-semibold text-fg mb-2">
              Message sent.
            </h3>
            <p className="text-fg-muted text-sm mb-5">
              ありがとうございます。確認次第ご返信します。
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="font-mono text-[11px] text-accent uppercase tracking-[0.15em] hover:underline underline-offset-4"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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
              rows={6}
              disabled={status === 'submitting'}
              className={`${inputClass} resize-none`}
            />

            {status === 'error' && (
              <div className="flex items-start gap-2 text-[13px] text-fg-muted border border-border p-3">
                <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>
                  送信に失敗しました。時間をおいて再度お試しいただくか、GitHub 経由でご連絡ください。
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 bg-accent text-ink font-medium px-6 py-3 text-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-14 pt-10 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="https://github.com/Pens-1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[12px] text-fg-muted hover:text-accent transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            github.com/Pens-1
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="mailto:hello@yamataku.dev"
            className="group inline-flex items-center gap-2 font-mono text-[12px] text-fg-muted hover:text-accent transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            hello@yamataku.dev
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <div className="mt-10 font-mono text-[10px] text-fg-faint uppercase tracking-[0.15em]">
          © 2026 Yamamoto. Built with React + Vite.
        </div>
      </div>
    </section>
  );
};

export default Contact;
