import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, MessageCircleHeart } from 'lucide-react';

export default function Moments() {
  const memories = [
    {
      title: 'First Coffee Date',
      text: 'Where time flew and the world felt just right.',
      img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Sunny Walks',
      text: 'Hand in hand under a soft blue sky.',
      img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Laugh Till We Cry',
      text: 'Inside jokes that never get old.',
      img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const wishes = [
    'May your days be filled with sunshine and sweet surprises.',
    'May you always find reasons to smile — big, bright, beautiful.',
    'May your dreams bloom into reality, gently and joyfully.',
  ];

  return (
    <section id="memories" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-sky-900 text-center"
        >
          Memories & Wishes
        </motion.h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {memories.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group overflow-hidden rounded-2xl bg-white border border-sky-100 shadow-sm"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={m.img}
                  alt={m.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sky-600">
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Memory</span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-sky-900">{m.title}</h3>
                <p className="text-slate-600">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {wishes.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="rounded-2xl bg-white border border-sky-100 p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 text-sky-600">
                <MessageCircleHeart className="w-5 h-5" />
                <span className="text-sm font-medium">Wish</span>
              </div>
              <p className="mt-2 text-slate-700">{w}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
