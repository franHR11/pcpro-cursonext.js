import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center p-24 ">
        <span className="text-5xl">Hola mundo</span>
        <Link href="/about">About</Link>
      </main>
    </div>
  );
}
