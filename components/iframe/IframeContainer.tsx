'use client';

import { useState } from 'react';

type Props = {
  src?: string;
};

const IframeContainer = ({ src }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) {
    return <div>Контент временно недоступен</div>;
  }

  return (
    <div className="relative h-[600px] w-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <span className="ml-3 text-slate-500">Загрузка модуля бронирования...</span>
        </div>
      )}

      <iframe
        src={src}
        onLoad={() => setIsLoading(false)}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default IframeContainer;
