type TErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: TErrorFallbackProps) => (
  <div className='text-red-500 p-4 border border-red-300 rounded'>
    <p>{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className='mt-2 px-4 py-2 bg-red-500 text-white rounded'
    >
      다시 시도
    </button>
  </div>
);
