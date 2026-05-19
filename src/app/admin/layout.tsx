import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  // Allow access to login page
  if (!token && typeof window === "undefined") {
    // We handle the redirect inside the layout to protect all admin pages except login
    // Actually, layout wraps everything. If we are on /admin/login, we don't redirect.
    // It's better to just let the pages handle it, or use middleware.
    // Since this wraps /admin and /admin/login, we shouldn't redirect here.
  }

  return <>{children}</>;
}
