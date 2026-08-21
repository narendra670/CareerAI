import useScrollAnimation from '../hooks/useScrollAnimation';

const ScrollReveal = ({
  children,
  animation = 'scroll-fade-up',
  delay = 0,
  className = '',
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? `animate-${animation.replace('scroll-', '')}` : `scroll-hidden ${animation}`
      }`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
