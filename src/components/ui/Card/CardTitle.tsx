interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  title,
  className,
  ...props
}) => (
  <h3 className={`text-sm line-clamp-2 ${className || ''}`} {...props}>
    {title || '-'}
  </h3>
);
