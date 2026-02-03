import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Title",
  description: "SEO descripcion",
  keywords: ["keyword1", "keyword2", "keyword3"],
};

export default function AboutPage() {
  return <span className="text-5xl">about page</span>;
}
