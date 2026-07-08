type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: HomeLayoutProps) {
  return <>{children}</>;
}
