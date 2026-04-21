import { Bell, Calendar, Clock3, FileText, HelpCircle, House, MessageCircle, Shield, Users } from 'lucide-react';
import railLogo from '@/assets/sidebar-rail-logo.png';

const icons = [House, MessageCircle, Users, Calendar, FileText, Shield, Clock3];

/** `figma-make-moment3` Sidebarv2: 64px rail, tinted surface, logo tile, 20px menu icons. */
export function AppRail() {
  return (
    <aside
      data-name="AppRail"
      className="relative flex w-16 shrink-0 flex-col items-stretch self-stretch bg-[rgba(0,64,255,0.03)]"
      aria-label="Primary navigation"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border-r border-solid border-[rgba(0,9,50,0.12)]"
      />
      <div className="relative flex min-h-16 w-full shrink-0 flex-col items-center border-b border-[rgba(0,9,50,0.12)] px-4">
        <div className="flex min-h-[inherit] w-full flex-1 items-center justify-center">
          <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#135bec]">
            <img src={railLogo} alt="" className="size-[18px] max-w-none object-contain" width={18} height={18} />
          </div>
        </div>
      </div>
      <nav className="relative flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto overflow-x-hidden py-4">
        {icons.map((Icon, index) => {
          const active = index === 0;
          return (
            <button
              key={`rail-nav-${index}`}
              type="button"
              className={`flex w-full items-center justify-center p-4 transition-colors ${
                active
                  ? 'bg-[rgba(0,64,255,0.03)] text-[#3e63dd]'
                  : 'text-[#64748b] hover:bg-[rgba(0,0,0,0.03)]'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="size-5" strokeWidth={1.25} aria-hidden />
            </button>
          );
        })}
      </nav>
      <div className="relative flex w-full shrink-0 flex-col items-center gap-1 border-t border-[rgba(0,9,50,0.12)] px-0 py-3">
        <button
          type="button"
          className="flex w-full items-center justify-center p-4 text-[#64748b] transition-colors hover:bg-[rgba(0,0,0,0.03)]"
          aria-label="Notifications"
        >
          <Bell className="size-5" strokeWidth={1.25} aria-hidden />
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center p-4 text-[#64748b] transition-colors hover:bg-[rgba(0,0,0,0.03)]"
          aria-label="Help"
        >
          <HelpCircle className="size-5" strokeWidth={1.25} aria-hidden />
        </button>
      </div>
    </aside>
  );
}
