import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <head>
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body>
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}
