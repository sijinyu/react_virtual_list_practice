interface CardPriceProps extends React.HTMLAttributes<HTMLParagraphElement> {
  discountedPrice: number;
}

export const CardPrice: React.FC<CardPriceProps> = ({
  discountedPrice,
  className,
  ...props
}) => (
  <p className={`text-sm font-bold space-x-4 ${className || ''}`} {...props}>
    <span>{discountedPrice.toLocaleString()}원</span>
  </p>
);
