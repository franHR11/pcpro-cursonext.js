import { TabBar } from "@/src/components";

export const metadata = {
  title: "Cookies Page",
  description: "Cookies Page",
};

export default function CookiesPage() {
  return (
    <div className="flex flex-col bg-white p-2 m-2 rounded-md">
      <div>
        <span className="text-2xl font-bold">Tabs</span>

        <TabBar />
      </div>
    </div>
  );
}
