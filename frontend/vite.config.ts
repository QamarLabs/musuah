import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import genezioLocalSDKReload from "@genezio/vite-plugin-genezio";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), genezioLocalSDKReload()],
  define: {
    'import.meta.env.VITE_API_URL_NESTJS': JSON.stringify('<backend server url>'),
    'import.meta.env.BASE_URL': JSON.stringify('http://localhost:5173'),
    'import.meta.env.STRIPE_PUBLISHABLE_KEY': JSON.stringify('<stripe publishable key>')
  }
});
