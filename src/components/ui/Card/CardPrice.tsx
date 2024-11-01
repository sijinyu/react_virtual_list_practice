type TCardPriceProps = {
  discountedPrice: number;
  discountRate?: number;
} & React.HTMLAttributes<HTMLParagraphElement>;

export const CardPrice: React.FC<TCardPriceProps> = ({
  discountedPrice,
  className,
  ...props
}) => (
  <p className={`text-sm font-bold space-x-4 ${className || ''}`} {...props}>
    <span>{discountedPrice.toLocaleString()}원</span>
  </p>
);
