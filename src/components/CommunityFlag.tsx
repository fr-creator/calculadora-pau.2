import type { Community } from "@/data/pau";

/** Bandera oficial de la comunidad autónoma. */
export function CommunityFlag({
  community,
  className = "h-8 w-12",
}: {
  community: Community;
  className?: string;
}) {
  return (
    <img
      src={community.flag}
      alt={`Bandera de ${community.name}`}
      width={48}
      height={32}
      loading="lazy"
      decoding="async"
      className={`rounded-md border border-border/60 bg-card object-contain shadow-sm ${className}`}
    />
  );
}
