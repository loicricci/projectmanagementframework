export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Project Management Framework. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted">
            <span>Version 1.0.0</span>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-accent">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
