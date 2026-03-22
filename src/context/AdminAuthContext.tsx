"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

interface AdminAuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Protect admin routes (if not on login page)
      const isSubdomain = typeof window !== "undefined" && window.location.hostname.startsWith("admin.");
      const isReservedPath = pathname.startsWith("/admin");
      const isLoginPage = pathname === "/admin/login" || (isSubdomain && pathname === "/login");

      if (!user && (isReservedPath || isSubdomain) && !isLoginPage) {
        if (isSubdomain) {
          router.push("/login"); // Rewrites internally to /admin/login
        } else {
          router.push("/admin/login");
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const logout = async () => {
    await signOut(auth);
    const isSubdomain = typeof window !== "undefined" && window.location.hostname.startsWith("admin.");
    if (isSubdomain) {
      router.push("/login");
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
