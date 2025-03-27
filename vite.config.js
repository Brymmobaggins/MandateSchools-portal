/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  
  // Server Port is 3000
  server: {
    port: 3000,
  },

  

  
});

// https://vite.dev/config/
