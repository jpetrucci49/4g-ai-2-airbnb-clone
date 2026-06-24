import { notFound } from "next/navigation";
import { RoomPageContent } from "@/components/pages/RoomPageContent";
import { getListingDetailById, listings } from "@/data/listings";

type RoomPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { id } = await params;
  const listing = getListingDetailById(id);
  return { title: listing?.title ?? `Room ${id}` };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;
  const listing = getListingDetailById(id);

  if (!listing) {
    notFound();
  }

  return <RoomPageContent listing={listing} />;
}
