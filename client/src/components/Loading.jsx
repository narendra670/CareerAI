const Loading = ({ size = 'md', fullScreen = false, text = '' }) => {
  const sizes = {
    sm: { spinner: 'w-5 h-5', ring: 'border-2', icon: 'w-3 h-3' },
    md: { spinner: 'w-10 h-10', ring: 'border-[3px]', icon: 'w-4 h-4' },
    lg: { spinner: 'w-16 h-16', ring: 'border-4', icon: 'w-6 h-6' },
  };

  const { spinner, ring, icon } = sizes[size] || sizes.md;

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Dual-ring spinner */}
      <div className={`relative ${spinner}`}>
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full ${ring} border-indigo-100`}
        />
        {/* Spinning ring */}
        <div
          className={`absolute inset-0 rounded-full ${ring} border-transparent border-t-indigo-500 border-r-violet-500 animate-spin`}
        />
        {/* Inner reverse ring */}
        <div
          className={`absolute inset-1.5 rounded-full ${ring} border-transparent border-b-violet-400 animate-spin`}
          style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
        />
        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 animate-pulse" />
        </div>
      </div>

      {/* Optional text */}
      {text && (
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-5">
          {/* Larger version for full screen */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-[3px] border-indigo-100" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 border-r-violet-500 animate-spin" />
            <div
              className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-violet-400 animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '1.3s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 animate-pulse shadow-lg shadow-indigo-400/40" />
            </div>
          </div>
          {text && (
            <p className="text-base font-medium text-slate-600 tracking-wide">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      {content}
    </div>
  );
};

export default Loading;