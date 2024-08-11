import React from 'react';
import { FallbackProps } from 'react-error-boundary';

export const FullScreenError: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className='fixed inset-0 bg-red-100 flex items-center justify-center z-50'>
    <div className='text-center'>
      <h1 className='text-2xl font-bold text-red-700 mb-4'>
        {error.message || '오류가 발생했습니다.'}
      </h1>
      <button
        onClick={resetErrorBoundary}
        className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
      >
        전체 페이지 새로고침
      </button>
    </div>
  </div>
);
