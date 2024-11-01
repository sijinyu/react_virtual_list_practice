import { memo } from 'react';

export type TMaskProps = {
  title: string;
};

export const Mask = memo(({ title }: TMaskProps) => {
  return (
    <div className='absolute rounded-10 top-0 left-0 w-full h-full bg-black opacity-80 text-white flex items-center justify-center'>
      <span>{title}</span>
    </div>
  );
});
