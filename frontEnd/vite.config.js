import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        product: path.resolve(__dirname, "./pages/product.html"),
        profile: path.resolve(__dirname, "./pages/profile.html"),
        register: path.resolve(__dirname, "./pages/register.html"),
        search: path.resolve(__dirname, "./pages/search.html"),
        seller: path.resolve(__dirname, "./pages/seller.html"),
      },
    },
  },
});
