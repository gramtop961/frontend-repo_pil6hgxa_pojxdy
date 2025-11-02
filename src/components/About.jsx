import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-sky-900 text-center"
        >
          About Her
        </motion.h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: 'Kind & Caring',
              text:
                'A heart that always puts others first, with warmth that lights up every room.',
            },
            {
              icon: Star,
              title: 'Brilliant & Brave',
              text:
                'Smart, determined, and bold — the kind of shine that never goes unnoticed.',
            },
            {
              icon: Heart,
              title: 'Joyful Soul',
              text:
                'Laughter that’s contagious and a smile that makes everything feel lighter.',
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="rounded-2xl bg-white shadow-sm border border-sky-100 p-6"
            >
              <card.icon className="w-8 h-8 text-sky-600" />
              <h3 className="mt-4 text-xl font-semibold text-sky-900">{card.title}</h3>
              <p className="mt-2 text-slate-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
