"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-primary border-b border-primary-700 fixed top-0 left-0 right-0 z-50">
      <div className="h-full flex items-center justify-between px-4 lg:px-6">
        {/* Left: Menu button + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden text-white hover:bg-primary-700 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <div className="hidden sm:block">
              <h1 className="text-white font-semibold text-lg leading-tight">
                Project Management Framework
              </h1>
              <p className="text-primary-200 text-xs">
                Qatar Institutional Computing Infrastructure
              </p>
            </div>
          </Link>
        </div>

        {/* Right: User menu */}
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="w-8 h-8 bg-primary-700 animate-pulse" />
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-white hover:bg-primary-700 px-3 py-2"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">{session.user.name || session.user.email}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-border shadow-lg py-1">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-primary">{session.user.name}</p>
                    <p className="text-xs text-muted">{session.user.email}</p>
                    <p className="text-xs text-accent mt-1 uppercase">{session.user.role}</p>
                  </div>
                  
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:bg-surface"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  )}
                  
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:bg-surface w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => signIn("google")}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
