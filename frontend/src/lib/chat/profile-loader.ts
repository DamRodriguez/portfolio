// src/lib/chat/profile-loader.ts
import { promises as fs } from "fs";
import path from "path";

let cachedProfile: string | null = null;
let cachePromise: Promise<string | null> | null = null;

export async function loadRepresentativeProfile(): Promise<string | null> {
  if (cachedProfile) return cachedProfile;
  if (cachePromise) return cachePromise;

  cachePromise = (async () => {
    const profilePath = path.join(process.cwd(), "src", "data", "representative-profile.txt");
    try {
      cachedProfile = await fs.readFile(profilePath, "utf-8");
      return cachedProfile;
    } catch {
      return null;
    }
  })();

  return cachePromise;
}
