export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
        <div>Second Layout</div>
        {children}
    </div>
  );
}