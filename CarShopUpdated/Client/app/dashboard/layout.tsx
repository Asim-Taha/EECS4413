import SideNav from "@/app/componets/dashboard/sidenav";
import TopNav from "../componets/dashboard/topnav";
import { verifySession } from "../auth/session";
import Email from "next-auth/providers/email";
import JotformChatbot from "../componets/JotformChatbot";"../componets/JotformChatbot";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await verifySession();
    console.log(session.profilePic);
    
    
    return (
        <div>
            <TopNav name={session.name} email={session.email} profilePic={session.profilePic}/>
            <div className="flex flex-col md:flex-row min-h-screen md:flex-row">
                <SideNav />
                <div className="p-2 md:p-10 text-2xl font-bold flex-1">
                    {children}
                    <JotformChatbot></JotformChatbot>
                </div>
            </div>
        </div>
    )
}