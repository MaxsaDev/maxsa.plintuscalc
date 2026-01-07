import { CURRENT_VERSION } from '@/lib/const';

export const FooterCopyright = () => {
  return (
    <div className="border-border bg-background flex-shrink-0 border-t py-6">
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <p className="text-muted-foreground text-sm">
          Copyright © {new Date().getFullYear()} Maxsa
        </p>
        <p className="text-muted-foreground text-xs">v.{CURRENT_VERSION}</p>
      </div>
    </div>
  );
};
