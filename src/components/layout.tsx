import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
// import { Header } from './Header';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="flex flex-col h-full bg-[radial-gradient(#fa6b77_1px,transparent_1px)] [background-size:32px_32px]">
        {/* <Header /> */}
        <main className="flex-grow container mx-auto p-4 sm:px-6 lg:px-8 xl:px-10 2xl:container 2xl:mx-auto">
          {children}
        </main>
        <footer className="bg-gray-900/20 shadow mt-8 py-4 text-center text-sm text-indigo-500">
          © {new Date().getFullYear()} PyDocs - AOC, Inc. All rights reserved.
        </footer>
      </div>
    </ClerkProvider>
  );
}
