import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "ForgeOS | Autonomous delivery",
  description: "An autonomous software delivery team controlled from Telegram."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
