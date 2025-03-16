"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  Megaphone,
  Settings,
  LogOut,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="h-16 border-b flex items-center justify-between px-6 bg-white dark:bg-gray-800">
        <div className="flex h-fit">
          <Image src={"/NextGenDevices.png"} width={200} height={200}/>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/admin-avatar.png" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r p-4 bg-white dark:bg-gray-800 overflow-y-auto">
          <nav className="space-y-2">
            <Link href="/dashboard">
              <Button
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Analytics
              </Button>
            </Link>

            <Link href="/dashboard/blogs">
              <Button
                variant={pathname.startsWith("/dashboard/blogs") ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <Newspaper className="h-4 w-4" />
                Manage Blogs
              </Button>
            </Link>

            <Link href="/dashboard/create-blog">
              <Button
                variant={pathname === "/dashboard/create-blog" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Create Blog
              </Button>
            </Link>

            <Link href="/dashboard/ads">
              <Button
                variant={pathname.startsWith("/dashboard/ads") ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <Megaphone className="h-4 w-4" />
                Manage Ads
              </Button>
            </Link>

            <Link href="/dashboard/settings">
              <Button
                variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}