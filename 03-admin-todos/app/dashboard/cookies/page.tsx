import { TabBar } from "@/src/components/TabBar";
import { cookies } from "next/headers";



export const metadata = {
  title: "Cookies Page",
  description: "Cookies Page",
};

export default async function CookiesPage() {
  const cookieStore = await cookies();
  const selectedTab = cookieStore.get('selectedTab')?.value ?? '1';



  return (
    <div>

      <h1>Cookies Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white p-2 rounded">
          <h3 className="text-xl font-bold mb-2">Tabs</h3>
          <TabBar currentTab={Number(selectedTab)} />
        </div>
      </div>
    </div>
  );
}
