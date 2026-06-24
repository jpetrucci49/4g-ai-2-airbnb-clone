import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { StarIcon } from "@/components/icons";
import type { ListingDetail } from "@/types";

interface HostCardProps {
  host: ListingDetail["host"];
}

export function HostCard({ host }: HostCardProps) {
  return (
    <div className="border-t border-border-light py-8">
      <h2 className="mb-6 text-[22px] font-semibold">Meet your host</h2>
      <div className="rounded-2xl border border-border-default p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex shrink-0 flex-col items-center rounded-2xl border border-border-light p-6 text-center shadow-sm">
            <div className="relative mb-3 size-20 overflow-hidden rounded-full">
              <SafeImage src={host.avatar} alt={host.name} fill sizes="80px" />
            </div>
            <p className="text-lg font-semibold">{host.name}</p>
            {host.isSuperhost && (
              <p className="text-sm text-text-secondary">Superhost</p>
            )}
            <div className="mt-4 grid w-full grid-cols-3 gap-2 border-t border-border-light pt-4 text-center text-xs">
              <div>
                <p className="font-semibold">{host.reviewCount}</p>
                <p className="text-text-secondary">Reviews</p>
              </div>
              <div>
                <p className="flex items-center justify-center gap-0.5 font-semibold">
                  <StarIcon size={10} />
                  {host.rating}
                </p>
                <p className="text-text-secondary">Rating</p>
              </div>
              <div>
                <p className="font-semibold">{host.yearsHosting}</p>
                <p className="text-text-secondary">Years hosting</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="mb-4 text-text-secondary">{host.bio}</p>
            <div className="mb-4 space-y-1 text-sm text-text-secondary">
              <p>Response rate: {host.responseRate}</p>
              <p>Responds {host.responseTime}</p>
            </div>
            <Button variant="outline">Message host</Button>
            <p className="mt-4 text-xs text-text-secondary">
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
