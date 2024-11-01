import { PropsWithChildren } from 'react';
import { CardImage } from './CardImage';
import { CardContent } from './CardContent';
import { CardTitle } from './CardTitle';
import { CardPrice } from './CardPrice';

interface CardProps extends React.HTMLAttributes<HTMLLIElement> {
  as?: React.ElementType;
}

interface CardComposition {
  Image: typeof CardImage;
  Content: typeof CardContent;
  Title: typeof CardTitle;
  Price: typeof CardPrice;
}

const Card: React.FC<PropsWithChildren<CardProps>> & CardComposition = ({
  as: Component = 'li',
  children,
  className,
  ...props
}) => {
  return (
    <Component
      className={`flex flex-col overflow-hidden ${className || ''}`}
      {...props}
    >
      {children}
    </Component>
  );
};

Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Price = CardPrice;

export default Card;
