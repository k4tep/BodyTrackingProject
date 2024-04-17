import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Body Tracking',
    description: 'Track your body changing',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
