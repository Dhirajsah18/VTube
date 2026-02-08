import VideoCard from "./VideoCard";

export default function VideoGrid({ videos = [] }) {
  if (!videos.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
        />
      ))}
    </div>
  );
}
