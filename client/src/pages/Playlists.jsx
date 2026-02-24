import { useEffect, useMemo, useState } from "react";

import MainLayout from "../layout/MainLayout";
import EmptyState from "../components/ui/EmptyState";
import VideoGrid from "../components/video/VideoGrid";

import { useAuth } from "../context/AuthContext";
import {
  createPlaylist,
  deletePlaylist,
  getUserPlaylists,
  updatePlaylist,
} from "../api/playlist.api";

export default function Playlists() {
  const { user } = useAuth();

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
  });
  const [createLoading, setCreateLoading] = useState(false);

  const [editingPlaylistId, setEditingPlaylistId] = useState("");
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
  });
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getUserPlaylists(user._id);
      const nextPlaylists = res?.data?.data || [];

      setPlaylists(nextPlaylists);
      setSelectedPlaylistId((prev) =>
        prev && nextPlaylists.some((p) => p._id === prev)
          ? prev
          : nextPlaylists[0]?._id || ""
      );
    } catch (err) {
      console.error("Failed to load playlists", err);
      setError("Failed to load playlists");
    } finally {
      setLoading(false);
    }
  };

  const selectedPlaylist = useMemo(
    () => playlists.find((playlist) => playlist._id === selectedPlaylistId),
    [playlists, selectedPlaylistId]
  );

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();

    const name = createForm.name.trim();
    const description = createForm.description.trim();

    if (!name || !description) return;

    try {
      setCreateLoading(true);
      await createPlaylist({ name, description });
      setCreateForm({ name: "", description: "" });
      await fetchPlaylists();
    } catch (err) {
      console.error("Failed to create playlist", err);
      setError(
        err?.response?.data?.message || "Failed to create playlist"
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const startEdit = (playlist) => {
    setEditingPlaylistId(playlist._id);
    setEditForm({
      name: playlist.name || "",
      description: playlist.description || "",
    });
  };

  const cancelEdit = () => {
    setEditingPlaylistId("");
    setEditForm({ name: "", description: "" });
  };

  const saveEdit = async (playlistId) => {
    const name = editForm.name.trim();
    const description = editForm.description.trim();

    if (!name || !description) return;

    try {
      setEditLoading(true);
      await updatePlaylist(playlistId, { name, description });
      cancelEdit();
      await fetchPlaylists();
    } catch (err) {
      console.error("Failed to update playlist", err);
      setError(
        err?.response?.data?.message || "Failed to update playlist"
      );
    } finally {
      setEditLoading(false);
    }
  };

  const removePlaylist = async (playlistId) => {
    const accepted = window.confirm(
      "Delete this playlist? This action cannot be undone."
    );
    if (!accepted) return;

    try {
      await deletePlaylist(playlistId);
      await fetchPlaylists();
    } catch (err) {
      console.error("Failed to delete playlist", err);
      setError(
        err?.response?.data?.message || "Failed to delete playlist"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Your Playlists</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Create and manage the playlists on your account.
          </p>
        </div>

        <form
          onSubmit={handleCreatePlaylist}
          className="grid gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-4 md:grid-cols-5"
        >
          <input
            type="text"
            value={createForm.name}
            onChange={(e) =>
              setCreateForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Playlist name"
            className="md:col-span-2 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-orange-500"
          />

          <input
            type="text"
            value={createForm.description}
            onChange={(e) =>
              setCreateForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Description"
            className="md:col-span-2 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            disabled={createLoading}
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 disabled:opacity-60"
          >
            {createLoading ? "Creating..." : "Create playlist"}
          </button>
        </form>

        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-neutral-400">Loading playlists...</div>
        ) : playlists.length === 0 ? (
          <EmptyState
            title="No playlists yet"
            description="Create your first playlist to save videos."
          />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {playlists.map((playlist) => {
                const isEditing = editingPlaylistId === playlist._id;
                const videosCount = playlist.videos?.length || 0;

                return (
                  <div
                    key={playlist._id}
                    className={`rounded-xl border p-4 ${
                      selectedPlaylistId === playlist._id
                        ? "border-orange-500 bg-neutral-900"
                        : "border-neutral-800 bg-neutral-900/60"
                    }`}
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-orange-500"
                        />

                        <textarea
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-orange-500"
                        />

                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(playlist._id)}
                            disabled={editLoading}
                            className="rounded-lg bg-orange-600 px-3 py-2 text-sm text-white hover:bg-orange-500 disabled:opacity-60"
                          >
                            {editLoading ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setSelectedPlaylistId(playlist._id)}
                          className="w-full text-left"
                        >
                          <h2 className="text-lg font-semibold">
                            {playlist.name}
                          </h2>
                          <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                            {playlist.description}
                          </p>
                          <p className="mt-3 text-xs text-neutral-500">
                            {videosCount} video
                            {videosCount === 1 ? "" : "s"}
                          </p>
                        </button>

                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => startEdit(playlist)}
                            className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removePlaylist(playlist._id)}
                            className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-300 hover:bg-red-950/40"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <section className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedPlaylist?.name || "Playlist videos"}
                </h3>
                {selectedPlaylist?.description && (
                  <p className="mt-1 text-sm text-neutral-400">
                    {selectedPlaylist.description}
                  </p>
                )}
              </div>

              {selectedPlaylist?.videos?.length ? (
                <VideoGrid videos={selectedPlaylist.videos} />
              ) : (
                <EmptyState
                  title="No videos in this playlist"
                  description="Add videos from watch pages using your playlist options."
                />
              )}
            </section>
          </>
        )}
      </div>
    </MainLayout>
  );
}
