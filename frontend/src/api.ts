import { auth } from "./firebase";

// ── Types: mirror the Django serializers in backend/api/serializers.py ──

export interface Hub {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  stats: Record<string, number>;
}

export interface Volunteer {
  id: string;
  name: string;
  email?: string; // admin-only
  phone?: string; // admin-only
  hub: string;
  role: string;
  skills: string[];
  hours_contributed: number;
  join_date: string;
  status: string;
  avatar_color: string;
  bio: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  center: string;
  subjects: string[];
  enrollment_date: string;
  attendance_rate: number;
  performance: string;
  mentor_id: string | null;
  guardian: string;
  notes: string;
}

export interface Donation {
  id: string;
  donor_name: string;
  type: "monetary" | "in_kind";
  amount: number | null;
  currency: string | null;
  hub: string;
  date: string;
  purpose: string;
  status: string;
  receipt_number: string | null;
  recurring: boolean;
  items_count: number | null;
  item_category: string;
}

export interface ImpactMetrics {
  total_beneficiaries: number;
  total_funds_raised: number;
  total_volunteer_hours: number;
  total_items_donated: number;
  communities_served: number;
  active_programs: number;
  monthly_growth_rate: number;
  donor_retention_rate: number;
}

// ── Fetch helper: attaches the Firebase ID token when a user is signed in ──

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = await auth.currentUser?.getIdToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const res = await fetch(`/api${path}`, { ...init, headers });
  if (!res.ok) throw new ApiError(res.status, `${init.method ?? "GET"} /api${path} failed: ${res.status}`);
  return res.status === 204 ? (undefined as T) : res.json();
}

export const api = {
  getHubs: () => apiFetch<Hub[]>("/hubs"),
  getVolunteers: () => apiFetch<Volunteer[]>("/volunteers"),
  getStudents: () => apiFetch<Student[]>("/students"), // admin-only
  getDonations: () => apiFetch<Donation[]>("/donations"),
  getImpact: () => apiFetch<ImpactMetrics>("/impact"),
};
