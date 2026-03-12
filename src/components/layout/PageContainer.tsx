import { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {children}
        <footer className="border-t border-white/5 pt-4 pb-6 text-center text-[11px] text-slate-500">
          <p className="font-medium text-slate-300">Careflick Dashboard</p>
          <p className="mt-0.5">Frontend Internship Assignment</p>
          <p className="mt-0.5 text-slate-500">
            Built with React, TypeScript, and TailwindCSS
          </p>
        </footer>
      </div>
    </main>
  );
};

export default PageContainer;
