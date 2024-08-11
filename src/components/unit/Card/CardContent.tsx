interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<
  React.PropsWithChildren<CardContentProps>
> = ({ children, className, ...props }) => (
  <div
    className={`bg-white flex flex-col flex-1 justify-between p-4 ${
      className || ''
    }`}
    {...props}
  >
    {children}
  </div>
);
