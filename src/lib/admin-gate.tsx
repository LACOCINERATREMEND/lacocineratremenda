import { isAdmin, isPasswordConfigured } from "@/lib/admin-auth";
import { AdminLocked, AdminLogin } from "@/components/admin-login";

export async function adminBlock() {
  if (!isPasswordConfigured()) return <AdminLocked />;
  if (!(await isAdmin())) return <AdminLogin />;
  return null;
}
