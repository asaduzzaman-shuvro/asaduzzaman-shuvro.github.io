import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { splitFixedCase } from '../data/case';

/**
 * Kinetic hero headline — the one React island on the site.
 * Renders "I BUILD / {rotating word} / THAT SHIP." with a staggered entrance
 * and a cycling middle word. Fully static + accessible when the user prefers
 * reduced motion (first word shown, no animation, no interval timer).
 */
const WORDS = ['iOS apps', 'backends', 'sync engines', 'teams'] as const;

/** The headline is uppercase; keep brand words like "iOS" in their own case. */
const word = (text: string) =>
  splitFixedCase(text).map((part, k) => (k % 2 ? <span key={k} className="normal-case">{part}</span> : part));

export default function HeroHeadline() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);

  const rise = {
    hidden: { opacity: 0, y: '0.6em' },
    show: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <h1 className="display text-fg text-[clamp(2.75rem,11vw,8.5rem)]">
      <motion.span
        className="block overflow-hidden"
        variants={rise}
        custom={0}
        initial={reduce ? false : 'hidden'}
        animate="show"
      >
        I build
      </motion.span>

      <span className="block overflow-hidden text-lime">
        {reduce ? (
          <span>{word(WORDS[0])}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: '0.55em' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-0.55em' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {word(WORDS[i])}
            </motion.span>
          </AnimatePresence>
        )}
      </span>

      <motion.span
        className="block overflow-hidden"
        variants={rise}
        custom={0.12}
        initial={reduce ? false : 'hidden'}
        animate="show"
      >
        that ship<span className="text-lime">.</span>
      </motion.span>
    </h1>
  );
}
