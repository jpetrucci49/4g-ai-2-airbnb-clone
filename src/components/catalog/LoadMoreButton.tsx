"use client";

import { Button } from "@/components/ui/Button";

interface LoadMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
  isLoading?: boolean;
}

export function LoadMoreButton({ onClick, hasMore, isLoading }: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="mt-8 flex justify-center">
      <Button variant="outline" onClick={onClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
}
