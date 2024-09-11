import "../scss/_base.scss"
import { Roboto_Condensed } from 'next/font/google';

const robotoCondensed = Roboto_Condensed({
  subsets:['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        {children}
      </body>
    </html>
  );
}
