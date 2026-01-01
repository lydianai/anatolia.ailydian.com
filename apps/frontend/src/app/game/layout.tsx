import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oyun - Türk Dijital Metropol',
  description: 'Türk Dijital Metropol oyun arayüzü',
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
