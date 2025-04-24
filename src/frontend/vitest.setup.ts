import { vi } from "vitest";

// Mock sessionStorage for Node/Bun environment
const mockSessionStorage = {
  store: {} as Record<string, string>,
  getItem(key: string) {
    return this.store[key] || null;
  },
  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  },
  removeItem(key: string) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

// Apply the mock globally before tests run
vi.stubGlobal("sessionStorage", mockSessionStorage);

// Optional: Add a console log to confirm the setup file runs
console.log("Vitest setup file (src/frontend/vitest.setup.ts) executed.");
