'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex min-w-0 items-center', className)} {...props} />;
  }
);
InputGroup.displayName = 'InputGroup';

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
  }
>(({ className, align = 'inline-start', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex shrink-0 items-center',
        align === 'inline-end' && 'order-3',
        align === 'block-start' && 'order-first',
        align === 'block-end' && 'order-last',
        className
      )}
      {...props}
    />
  );
});
InputGroupAddon.displayName = 'InputGroupAddon';

const InputGroupInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-slot="input-group-control"
        className={cn('flex-1', className)}
        {...props}
      />
    );
  }
);
InputGroupInput.displayName = 'InputGroupInput';

const InputGroupText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('text-muted-foreground flex items-center px-3 text-sm', className)}
        {...props}
      />
    );
  }
);
InputGroupText.displayName = 'InputGroupText';

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText };
