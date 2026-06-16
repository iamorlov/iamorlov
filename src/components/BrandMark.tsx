import Image from "next/image";

/**
 * Orlov Games logo. Uses the light wordmark variant so it stays legible
 * on the dark Act-2 band.
 */
export default function BrandMark({
  className = "",
  width = 220,
  height = 220,
  priority = false,
}: {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/orlov-games-light.svg"
      alt="Orlov Games"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
