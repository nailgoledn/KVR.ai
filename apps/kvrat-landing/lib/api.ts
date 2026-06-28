import type {
  CreateFoundingPartnerPayload,
  FoundingPartner,
  FoundingPartnerFilter,
  FoundingPartnerStats,
  FoundingPartnerStatus,
  PaginatedFoundingPartners,
} from '@/lib/types/founding-partner';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: string[],
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ApiErrorBody {
  message?: string | string[];
  error?: string;
}

async function parseErrorResponse(res: Response): Promise<ApiError> {
  let body: ApiErrorBody = {};

  try {
    body = await res.json();
  } catch {
    // ignore parse errors
  }

  const rawMessage = body.message;
  const details = Array.isArray(rawMessage) ? rawMessage : undefined;
  const message = Array.isArray(rawMessage)
    ? rawMessage.join(' — ')
    : rawMessage || body.error || `API error: ${res.status}`;

  return new ApiError(res.status, message, details);
}

function authHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function buildQuery(filter: FoundingPartnerFilter = {}): string {
  const params = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, String(value));
    }
  });

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function generateBlueprint(message: string) {
  const res = await fetch(`${API_BASE}/ai/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ message, input: message }),
  });

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.json();
}

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.json() as Promise<{
    access_token: string;
    user: { id: number; email: string; role: string };
  }>;
}

export async function registerFoundingPartner(
  payload: CreateFoundingPartnerPayload,
): Promise<FoundingPartner> {
  const res = await fetch(`${API_BASE}/api/founding-partners`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.json();
}

export async function getFoundingPartnerStats(
  token: string,
): Promise<FoundingPartnerStats> {
  const res = await fetch(`${API_BASE}/api/founding-partners/stats`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.json();
}

export async function getFoundingPartners(
  token: string,
  filter: FoundingPartnerFilter = {},
): Promise<PaginatedFoundingPartners> {
  const res = await fetch(
    `${API_BASE}/api/founding-partners${buildQuery(filter)}`,
    { headers: authHeaders(token) },
  );

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.json();
}

export async function updateFoundingPartner(
  token: string,
  id: number,
  data: { status?: FoundingPartnerStatus; notes?: string },
): Promise<FoundingPartner> {
  const res = await fetch(`${API_BASE}/api/founding-partners/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.json();
}

export async function deleteFoundingPartner(
  token: string,
  id: number,
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/founding-partners/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }
}

export async function exportFoundingPartnersCsv(
  token: string,
  filter: FoundingPartnerFilter = {},
): Promise<Blob> {
  const res = await fetch(
    `${API_BASE}/api/founding-partners/export${buildQuery(filter)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (!res.ok) {
    throw await parseErrorResponse(res);
  }

  return res.blob();
}
