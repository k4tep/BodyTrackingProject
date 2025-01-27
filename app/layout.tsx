import type { Metadata } from 'next';
import './global.scss';
import RegisterServiceWorker from '../components/RegisterServiceWorker';

export const metadata: Metadata = {
    title: 'Body Tracking',
    description: 'Track your body changing',
    manifest: '/manifest.json',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    icons: {
        icon: '/body-tracking.png',
        shortcut: '/body-tracking.png',
        other: [
            {
                rel: 'manifest',
                url: '/manifest.json',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <RegisterServiceWorker />
            <body>{children}</body>
        </html>
    );
}
