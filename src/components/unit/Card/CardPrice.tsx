interface CardPriceProps extends React.HTMLAttributes<HTMLParagraphElement> {
  discountRate: number;
  discountedPrice: number;
}

export const CardPrice: React.FC<CardPriceProps> = ({
  discountRate,
  discountedPrice,
  className,
  ...props
}) => (
  <p className={`text-sm font-bold space-x-4 ${className || ''}`} {...props}>
    {discountRate && <span className='text-red-500 mr-2'>{discountRate}%</span>}
    <span>{discountedPrice.toLocaleString()}원</span>
  </p>
);
