export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full mx-auto max-w-screen-md p-2 sm:mt-8 lg:mt-12">
      {children}
    </div>
  );
}
