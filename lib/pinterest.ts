/**
 * Pinterest API v5 utility for creating pins.
 * Uses PINTEREST_ACCESS_TOKEN for authentication.
 */

const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export interface CreatePinParams {
  boardId: string;
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
}

export interface PinterestPinResponse {
  id?: string;
  link?: string;
  title?: string;
  description?: string;
  media?: { images?: Record<string, { url?: string }> };
}

/**
 * Create a pin on a Pinterest board using the API v5.
 * Image URL must be publicly accessible (e.g. your site's Pinterest image API or CDN).
 */
export async function createPin(params: CreatePinParams): Promise<PinterestPinResponse> {
  const { boardId, title, description, imageUrl, articleUrl } = params;
  const accessToken = process.env.PINTEREST_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("PINTEREST_ACCESS_TOKEN is not set");
  }

  const res = await fetch(`${PINTEREST_API_BASE}/pins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      board_id: boardId,
      title: title.slice(0, 100),
      description: description.slice(0, 500) || title,
      link: articleUrl,
      media_source: {
        source_type: "image_url",
        url: imageUrl,
      },
    }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string; code?: number };
    throw new Error(err.message || `Pinterest API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<PinterestPinResponse>;
}

/**
 * Check if Pinterest API is configured (for optional features).
 */
export function isPinterestConfigured(): boolean {
  return Boolean(process.env.PINTEREST_ACCESS_TOKEN && process.env.PINTEREST_APP_ID);
}
