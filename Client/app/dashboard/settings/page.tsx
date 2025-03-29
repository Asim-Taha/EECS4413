import SideNav from "@/app/componets/dashboard/sidenav";
import { redirect } from "next/navigation";

export default function SettingsPage() {
  
  redirect("/dashboard/settings/profile"); // Instantly redirects
  return null;
}
