import "./globals.css";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";


export const metadata = {
  title: "Write with Dr. Shaifali Arora",
  description: "Exploring colonial & postcolonial South Asia",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Fixed Header */}
        <header className="fixed top-0 w-full z-50">
          <Tabs />
        </header>

        {/* Main content */}
        <main className="flex-grow pt-[60px] overflow-y-auto"> {/* padding-top to offset fixed header height */}
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
