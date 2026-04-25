

interface LoadingDotsProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingDots({ color = 'bg-saffron', size = 'md' }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const baseDotClass = `rounded-full ${color} ${sizeClasses[size]}`;

  return (
    <div 
      className="flex space-x-1.5 items-center justify-center h-full p-2"
      role="status"
      aria-label="Loading"
    >
      <div data-testid="dot" className={`${baseDotClass} animate-bounce`} style={{ animationDelay: '0ms' }} />
      <div data-testid="dot" className={`${baseDotClass} animate-bounce`} style={{ animationDelay: '150ms' }} />
      <div data-testid="dot" className={`${baseDotClass} animate-bounce`} style={{ animationDelay: '300ms' }} />
    </div>
  );
}
