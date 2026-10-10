import React from 'react';

interface WebsiteLogoProps {
  customLogoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export function WebsiteLogo({ customLogoUrl, size = 'md', showSubtitle = true }: WebsiteLogoProps) {
  if (customLogoUrl) {
    return (
      <div className="flex items-center gap-2.5">
        <img
          src={customLogoUrl}
          alt="Ihimbazwe Manzi Norbert Logo"
          className={`${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-9 h-9'} rounded-lg object-cover border border-slate-200 shadow-xs`}
        />
        <div>
          <span className="font-extrabold tracking-tight text-slate-900 block leading-tight text-sm sm:text-base">
            MANZI NORBERT
          </span>
          {showSubtitle && (
            <span className="text-[10px] text-blue-700 font-semibold tracking-wider uppercase block">
              Rwanda · Full-Stack
            </span>
          )}
        </div>
      </div>
    );
  }

  // Official Rwandan Flag Styled Brand Emblem matching user's uploaded flag
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative overflow-hidden rounded-lg border border-slate-200/90 shadow-xs shrink-0 bg-white">
        {/* Rwandan Flag 3-stripe representation with sun */}
        <div className={`${size === 'sm' ? 'w-8 h-6' : size === 'lg' ? 'w-12 h-8' : 'w-9 h-6.5'} flex flex-col`}>
          {/* Blue band (50% height) with golden sun */}
          <div className="h-1/2 bg-[#00A1DE] relative flex items-center justify-end pr-1 overflow-hidden">
            {/* 24-rayed golden sun symbol */}
            <svg
              className={`${size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} text-[#FAD201]`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          {/* Yellow band (25% height) */}
          <div className="h-1/4 bg-[#FAD201]" />
          {/* Green band (25% height) */}
          <div className="h-1/4 bg-[#20603D]" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 leading-tight">
          <span className="font-extrabold tracking-tight text-slate-900 text-sm sm:text-base">
            MANZI.DEV
          </span>
          <span className="hidden sm:inline text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
            RW
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase block">
            Ihimbazwe Manzi Norbert
          </span>
        )}
      </div>
    </div>
  );
}
