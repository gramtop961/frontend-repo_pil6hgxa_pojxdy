import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Sparkles, ChevronDown } from 'lucide-react';

// Simple fireworks canvas animation
function Fireworks({ duration = 6000, onComplete }) {
  const canvasRef = useRef(null);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    const gravity = 0.04;
    const friction = 0.98;

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.size = Math.random() * 2 + 1;
      }
      update() {
        this.vx *= friction;
        this.vy = this.vy * friction + gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.012;
      }
      draw() {
        ctx.globalAlpha = Math.max(this.alpha, 0);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    class Firework {
      constructor() {
        this.x = Math.random() * width * 0.8 + width * 0.1;
        this.y = Math.random() * height * 0.2 + height * 0.1;
        this.particles = [];
        const colors = ['#ff6b6b', '#ffd93d', '#6bcff6', '#b084f5', '#2dd4bf', '#f472b6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 70; i++) {
          this.particles.push(new Particle(this.x, this.y, color));
        }
      }
      update() {
        this.particles.forEach(p => p.update());
        this.particles = this.particles.filter(p => p.alpha > 0);
      }
      draw() {
        this.particles.forEach(p => p.draw());
      }
      get done() {
        return this.particles.length === 0;
      }
    }

    let fireworks = [];

    const loop = (t) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;

      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, width, height);

      // spawn
      if (Math.random() < 0.13) fireworks.push(new Firework());

      fireworks.forEach(f => {
        f.update();
        f.draw();
      });
      fireworks = fireworks.filter(f => !f.done);

      rafRef.current = requestAnimationFrame(loop);

      if (elapsed > duration) {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener('resize', onResize);
        onComplete?.();
      }
    };

    // clear with transparent bg
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, width, height);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [duration, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

export default function Hero() {
  const [showFireworks, setShowFireworks] = useState(true);
  const [showWish, setShowWish] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWish(true), 6200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/pVLJXSVq3zyQq0OD/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/0 via-sky-50/10 to-sky-50/90 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 text-sky-700 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Let the celebration begin
        </motion.div>

        <AnimatePresence>
          {showFireworks && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Fireworks duration={6000} onComplete={() => setShowFireworks(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-8 text-4xl md:text-6xl font-extrabold tracking-tight text-sky-900 drop-shadow-sm"
        >
          Happy Birthday, <span className="text-sky-600">Priyu</span>!
        </motion.h1>

        <AnimatePresence>
          {showWish && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-4 max-w-2xl text-sky-800/80 text-lg"
            >
              Wishing you a day as bright, bubbly and beautiful as you are. Here’s a little corner of the web just for you.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
        >
          Explore the surprise
          <ChevronDown className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
