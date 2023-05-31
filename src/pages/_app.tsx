import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "../utils/api";

import { SiteHeader } from "./../components/site-header";
import { TailwindIndicator } from "./../components/tailwind-indicator";
import { ThemeProvider } from "./../components/theme-provider";
import "../styles/globals.css";
import Script from "next/script";
import { fontSans } from "./../lib/fonts";
import { cn } from "./../lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SubscriptionProvider } from "use-stripe-subscription";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SubscriptionProvider stripePublishableKey="pk_test_51N71fQKU89VNxZdBpoReBHWkH6hP5FKrCdVu59ToHiNGtVqsRZaTILfgOp7ZBrdTbNrI8c1zVlyTsKZZs9kyZt2t00DJ9UYA3J">
      <Script
        defer
        data-domain="demo.pridelabs.gg"
        src="https://plausible.io/js/script.js"
      />
      <ClerkProvider {...pageProps}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <div
              className={cn(
                "bg-background font-sans antialiased",
                fontSans.variable
              )}
            >
              <div className="content-center">
                <SiteHeader />
              </div>
              <div className="flex-1">
                <Script
                  src="https://tally.so/widgets/embed.js"
                  strategy="beforeInteractive"
                />

                <Component {...pageProps} />
                <Analytics />
              </div>
            </div>
          </div>

          <TailwindIndicator />
        </ThemeProvider>
      </ClerkProvider>
    </SubscriptionProvider>
  );
};

export default api.withTRPC(MyApp);
