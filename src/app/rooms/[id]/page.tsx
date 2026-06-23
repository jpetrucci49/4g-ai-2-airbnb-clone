import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type RoomPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Room ${id}` };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;

  if (!["1", "2", "3"].includes(id)) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <h1 className="text-2xl font-semibold">Room {id}</h1>
      <p className="mt-2 text-text-secondary">
        Listing detail page — coming soon.
      </p>
      <Link
        href="/catalog"
        className="mt-6 inline-block text-sm text-brand hover:underline"
      >
        ← Back to catalog
      </Link>
    </main>
  );
}
