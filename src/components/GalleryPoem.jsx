import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, HelpCircle, Image as ImageIcon, Feather } from 'lucide-react';

function Quiz({ onUnlock }) {
  const questions = useMemo(
    () => [
      {
        q: 'Her favorite color is…',
        options: ['Sky Blue', 'Emerald Green', 'Sunset Pink'],
        a: 0,
      },
      {
        q: 'Best birthday treat?',
        options: ['Chocolate cake', 'Ice-cream', 'Croissants'],
        a: 0,
      },
      {
        q: 'A perfect weekend looks like…',
        options: ['Cozy movies', 'Mountain hikes', 'City shopping'],
        a: 0,
      },
    ],
    []
  );

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const allCorrect = answers.every((v, i) => v === questions[i].a);

  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur border border-sky-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 text-sky-700">
        <HelpCircle className="w-5 h-5" />
        <h3 className="font-semibold">Unlock the Gallery</h3>
      </div>

      <div className="mt-4 space-y-6">
        {questions.map((item, i) => (
          <div key={i}>
            <p className="font-medium text-sky-900">{i + 1}. {item.q}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.options.map((op, j) => {
                const selected = answers[i] === j;
                return (
                  <button
                    key={j}
                    onClick={() => {
                      const copy = [...answers];
                      copy[i] = j;
                      setAnswers(copy);
                    }}
                    className={`px-3 py-2 rounded-full border text-sm transition-colors ${
                      selected ? 'bg-sky-600 text-white border-sky-600' : 'bg-white border-sky-200 hover:border-sky-400'
                    }`}
                  >
                    {op}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className={`text-sm ${allCorrect ? 'text-emerald-600' : 'text-slate-500'}`}>
          {allCorrect ? 'All answers look perfect! 🎉' : 'Pick what feels right…'}
        </p>
        <button
          onClick={() => allCorrect && onUnlock()}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-sm border transition-colors ${
            allCorrect
              ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
              : 'bg-white text-slate-500 border-slate-200 cursor-not-allowed'
          }`}
        >
          {allCorrect ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />} {allCorrect ? 'Unlock' : 'Locked'}
        </button>
      </div>
    </div>
  );
}

function Gallery() {
  const photos = [
    'https://images.unsplash.com/photo-1529154631080-1a856a04a943?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975922284-7b683c8b2f3d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529634893849-6022387b2a13?q=80&w=1200&auto=format&fit=crop',
  ];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((src, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
          <img src={src} alt={`Memory ${i + 1}`} className="h-48 w-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      ))}
    </div>
  );
}

export default function GalleryPoem() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-sky-900 text-center"
        >
          Secret Gallery & A Poem
        </motion.h2>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-sky-700">
              <ImageIcon className="w-5 h-5" />
              <h3 className="font-semibold">Memories in Frames</h3>
            </div>
            {unlocked ? <Gallery /> : <Quiz onUnlock={() => setUnlocked(true)} />}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-white/80 backdrop-blur border border-sky-100 p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sky-700">
              <Feather className="w-5 h-5" />
              <h3 className="font-semibold">A Poem for You</h3>
            </div>
            <p className="mt-4 leading-relaxed text-slate-700">
              In a sky of blue and silver light,<br />
              You glow like dawn, so warm and bright.<br />
              With every laugh, the world feels new—<br />
              A softer place, because of you.<br />
              <br />
              Today we dance, today we sing,<br />
              For all the joy your moments bring;<br />
              May every wish drift home to you—<br />
              My favorite star, my sky of blue.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
