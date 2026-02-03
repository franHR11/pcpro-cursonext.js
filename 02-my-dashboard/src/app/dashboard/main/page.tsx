import { SimpleWidget } from "@/src/components";

export default function MainPage() {
    return (
        <div className="flex flex-col items-center justify-center  gap-2">

            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-2xl">Información general de la aplicación</p>

            <div className="flex flex-wrap gap-2 mt-2 items-center justify-center">

                <SimpleWidget />
                <SimpleWidget />
                <SimpleWidget />
                <SimpleWidget />
                <SimpleWidget />
                <SimpleWidget />
                <SimpleWidget />
            </div>

        </div>
    );
}