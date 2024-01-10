import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  // useEffect Hook to create dynamic keyframe animations
  React.useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const animationName = `animate-pulse-${Math.round(value ?? 0)}`;
    const keyframes = `
      @keyframes ${animationName} {
        0%, 100% {
          box-shadow: 0 2px 4px rgba(0, 118, 255, 0.6);
        }
        50% {
          box-shadow: 0 2px 10px rgba(128, 0, 128, 0.9);
        }
      }
    `;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    return () => {
      // Cleanup: Remove the inserted rule on component unmount
      Array.from(styleSheet.cssRules).forEach((rule, index) => {
        if (rule.cssText.startsWith(`@keyframes ${animationName}`)) {
          styleSheet.deleteRule(index);
        }
      });
    };
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden border border-[#dab6ff]/40 rounded-full bg-slate-800',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full bg-gradient-to-r from-blue-400 to-purple-500',
            `animate-pulse-${Math.round(value ?? 0)}`,
          'transition-all duration-500 ease-in-out'
        )}
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = 'Progress';

export { Progress };
