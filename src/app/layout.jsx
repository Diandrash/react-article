// app/layout.tsx
"use client";
import { Providers } from "./providers";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Providers>{children}</Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
