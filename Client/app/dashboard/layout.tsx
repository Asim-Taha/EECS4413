import SideNav from "@/app/componets/dashboard/sidenav";
import TopNav from "../componets/dashboard/topnav";
import { verifySession } from "../auth/session";
import JotformChatbot from "@/app/componets/JotformChatbot";
import ClientSessionProvider from "@/app/componets/auth/ClientSessionProvider";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  return (
    <ClientSessionProvider>
      <TopNav name={session.name} email={session.email} profilePic={session.profilePic} />
      <div className="flex flex-col md:flex-row min-h-screen md:flex-row">
        <SideNav />
        <div className="p-2 md:p-10 text-2xl font-bold flex-1">
          {children}
          <JotformChatbot />
        </div>
      </div>
    </ClientSessionProvider>
  );
}
