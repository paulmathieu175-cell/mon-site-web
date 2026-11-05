import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" : chemins relatifs, le site fonctionne aussi bien sur
// GitHub Pages (sous-dossier /mon-site-web/) que sur Netlify ou Vercel.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
