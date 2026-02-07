import Sidebar from "@/src/components/Sidebar";
import { Topmenu } from "@/src/components/Topmenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* TODO: src/components <Sidebar /> */}
      <Sidebar />

      {/*TODO: Fin del <Sidebar /> */}

      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen bg-gray-200">
        {/* TODO: src/components <TopMenu /> */}
        <Topmenu />
        {/* TODO: Fin del <TopMenu /> */}

        {/* TODO: Contenido en el Layout.tsx */}
        <div className="px-6 pt-6 bg-white p-2 m-2 rounded-md pb-5">
          {/* TODO: dashboard/page.tsx  */}

          {/* Este contenido va dentro de page.tsx */}
          {children}
          {/* TODO: fin del dashboard/page.tsx  */}

          {/* TODO: Fin del contenido en el Layout.tsx */}
        </div>
      </div>
    </>
  );
}
