import { House, BookText, UserRound, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

const NavItems: { path: string; icon: LucideIcon; label: string }[] = [
  {
    path: "/",
    icon: House,
    label: "Home",
  },
  {
    path: "/blog",
    icon: BookText,
    label: "Blog",
  },
  {
    path: "/about",
    icon: UserRound,
    label: "About",
  },
];

export default function TopBar() {
    return (
      <div className="flex items-center justify-center p-4 pt-8">
        <nav className="flex items-center gap-10 ">
          {NavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-1 transition-transform duration-300 ease-in-out hover:-translate-y-1"
              >
                <Icon className="text-text-col" />
                <span className="font-medium text-text-col">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    );
}