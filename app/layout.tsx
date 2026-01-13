import { AssetProvider } from '@/contexts/AssetContext';
import './globals.css';

export const metadata = {
  title: 'Mantle Atlas',
  description: 'Institutional-grade RealFi asset deployment platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AssetProvider>
          {children}
        </AssetProvider>
      </body>
    </html>
  );
}