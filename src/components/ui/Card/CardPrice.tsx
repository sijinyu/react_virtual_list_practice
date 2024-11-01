type TCardPriceProps = {
  discountedPrice: number;
  discountRate?: number;
} & React.HTMLAttributes<HTMLParagraphElement>;

export const CardPrice: React.FC<TCardPriceProps> = ({
  discountedPrice,
  discountRate,
  className,
  ...props
}) => (
  <div className={`flex items-center gap-2 ${className || ''}`} {...props}>
    {discountRate && (
      <strong
        className='text-red-600 font-bold'
        aria-label={`할인율 ${discountRate}%`}
      >
        {discountRate}%
      </strong>
    )}
    <strong
      className='text-gray-900 font-bold'
      aria-label={`할인가 ${discountedPrice.toLocaleString()}원`}
    >
      {discountedPrice.toLocaleString()}
      <span className='text-sm ml-1'>원</span>
    </strong>
  </div>
);
