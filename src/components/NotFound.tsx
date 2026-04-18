import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container-prose text-center">
        <div className="font-mono text-[11px] text-fg-faint uppercase tracking-[0.2em] mb-4">
          ERR / 404 / Not Found
        </div>
        <h1 className="font-display text-display-lg text-fg mb-4">
          This page doesn't <span className="text-accent">exist yet</span>.
        </h1>
        <p className="text-fg-muted mb-8 max-w-md mx-auto">
          リンク切れか、作品が移動した可能性があります。トップに戻って選び直してください。
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-accent text-ink font-medium px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
