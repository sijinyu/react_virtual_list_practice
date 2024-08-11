interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const CardImage: React.FC<CardImageProps> = ({
  className,
  ...props
}) => (
  <img className={`aspect-square object-cover ${className || ''}`} {...props} />
);
