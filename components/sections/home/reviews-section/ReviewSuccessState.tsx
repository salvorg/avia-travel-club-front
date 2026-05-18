'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ReviewSuccessStateProps {
  onReset: () => void;
}

export function ReviewSuccessState({ onReset }: ReviewSuccessStateProps): React.JSX.Element {
  return (
    <motion.div
      key="review-success-content"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="rounded-full bg-emerald-50 p-3 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <h3 className="mt-4 text-xl font-black text-[#0f2043] dark:text-white">
        Отзыв отправлен на модерацию!
      </h3>
      <p className="mt-1.5 max-w-md text-center text-sm font-medium text-slate-500 dark:text-slate-400">
        Спасибо за обратную связь! Ваш отзыв появится на ленте сразу после проверки модератором.
      </p>

      <button
        onClick={onReset}
        className="mt-5 text-xs font-bold text-[#2563eb] hover:underline dark:text-blue-400"
      >
        Написать ещё один отзыв
      </button>
    </motion.div>
  );
}
