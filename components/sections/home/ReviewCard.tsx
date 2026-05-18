'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { type Review } from '@/types/review';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps): React.JSX.Element {
  return (
    <div className="w-[380px] shrink-0 rounded-2xl border border-white/40 bg-white/40 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/40 dark:shadow-none">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200 dark:border-slate-800">
          <Image
            src={review.avatarUrl}
            alt={review.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="text-left">
          <h4 className="text-sm font-bold text-[#0f2043] dark:text-white">{review.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{review.role}</p>
        </div>
      </div>

      {/* Рейтинг */}
      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < review.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-200 dark:text-slate-700'
            }`}
          />
        ))}
        <span className="ml-1 text-xs font-bold text-slate-600 dark:text-slate-400">
          {review.tourName}
        </span>
      </div>

      {/* Текст отзыва */}
      <p className="mt-4 text-left text-sm leading-relaxed font-medium text-slate-700 dark:text-slate-300">
        «{review.text}»
      </p>
    </div>
  );
}
