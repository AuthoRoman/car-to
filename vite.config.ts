import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/car-to/",
  plugins: [react()],
  build: {
    outDir: "../build",
    emptyOutDir: true, // also necessary
  },
});
