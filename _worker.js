export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/setlists") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed." }, 405);
      }
      return handleSetlists(url, env);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleSetlists(url, env) {
  const artistName = (url.searchParams.get("artist") || "").trim();

  if (!artistName) {
    return json({ error: "Artist name is required." }, 400);
  }

  const apiKey = env.SETLIST_FM_API_KEY;
  if (!apiKey) {
    return json({
      error: "setlist.fm is not configured yet. Add SETLIST_FM_API_KEY as an encrypted Cloudflare secret, then redeploy."
    }, 503);
  }

  const headers = {
    "Accept": "application/json",
    "X-Api-Key": apiKey,
    "User-Agent": "OutLate/0.1"
  };

  try {
    const searchUrl = new URL("https://api.setlist.fm/rest/1.0/search/artists");
    searchUrl.searchParams.set("artistName", artistName);
    searchUrl.searchParams.set("sort", "relevance");
    searchUrl.searchParams.set("p", "1");

    const artistResponse = await fetch(searchUrl.toString(), { headers });
    if (!artistResponse.ok) {
      return json({ error: `setlist.fm artist search failed (${artistResponse.status}).` }, 502);
    }

    const artistData = await artistResponse.json();
    const artists = artistData.artist || [];

    if (!artists.length) {
      return json({ error: `No setlist.fm artist found for “${artistName}”.` }, 404);
    }

    const exact = artists.find(a => (a.name || "").toLowerCase() === artistName.toLowerCase());
    const artist = exact || artists[0];

    const setlistsUrl = `https://api.setlist.fm/rest/1.0/artist/${encodeURIComponent(artist.mbid)}/setlists?p=1`;
    const setlistsResponse = await fetch(setlistsUrl, { headers });

    if (!setlistsResponse.ok) {
      return json({ error: `setlist.fm setlist lookup failed (${setlistsResponse.status}).` }, 502);
    }

    const raw = await setlistsResponse.json();

    // No persistent storage: send a compact version of the recent API response
    // straight to the browser for live analysis.
    const recent = (raw.setlist || []).slice(0, 20).map(show => ({
      eventDate: show.eventDate || "",
      tour: show.tour?.name || "",
      venue: show.venue?.name || "",
      city: show.venue?.city?.name || "",
      url: show.url || "",
      sets: (show.sets?.set || []).map(set => ({
        encore: Boolean(set.encore),
        encoreNumber: set.encore || null,
        songs: (set.song || []).map(song => song.name).filter(Boolean)
      }))
    }));

    return json({
      artist: artist.name,
      artistUrl: artist.url,
      setlists: recent
    }, 200, {
      "Cache-Control": "public, max-age=900"
    });
  } catch (error) {
    return json({ error: "The setlist.fm lookup could not be completed." }, 500);
  }
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    }
  });
}
