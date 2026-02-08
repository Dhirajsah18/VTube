import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link
      to={`/watch/${video._id}`}
      className="block group"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-neutral-800 rounded-xl overflow-hidden">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-neutral-500">
            No thumbnail
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="text-sm font-medium line-clamp-2">
          {video.title}
        </h3>

        <p className="text-xs text-neutral-400 mt-1">
          {video.owner?.username || "Unknown"}
        </p>

        <p className="text-xs text-neutral-500">
          {video.views} views
        </p>
      </div>
    </Link>
  );
}
