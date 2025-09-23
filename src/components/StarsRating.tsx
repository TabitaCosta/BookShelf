import { StarIcon } from "@radix-ui/react-icons";

interface StarsRatingProps {
  rating: number;
}

export function StarsRating({ rating }: StarsRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {}
      {Array.from({ length: fullStars }, (_, index) => (
        <StarIcon key={`full-${index}`} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      ))}

      {}
      {hasHalfStar && (
        <div className="relative h-4 w-4">
          <StarIcon className="h-full w-full fill-yellow-500 text-yellow-500 absolute top-0 left-0" />
          <div
            className="h-full w-1/2 bg-white absolute top-0 right-0"
            style={{ clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}
          />
        </div>
      )}

      {}
      {Array.from({ length: emptyStars }, (_, index) => (
        <StarIcon key={`empty-${index}`} className="h-4 w-4 text-gray-400" />
      ))}
    </div>
  );
}