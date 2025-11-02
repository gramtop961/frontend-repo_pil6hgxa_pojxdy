import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Moments from './components/Moments.jsx';
import GalleryPoem from './components/GalleryPoem.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-800">
      <Hero />
      <About />
      <Moments />
      <GalleryPoem />
      <footer className="py-10 text-center text-sm text-slate-500">
        Made with love • Happy Birthday, Priyu 💙
      </footer>
    </div>
  );
}
