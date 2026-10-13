import TanstackQueryProvider from "@/providers/tanstack-query-provider";

type Props = {
  children: React.ReactNode;
};

export default function MainLayoutProvider({ children }: Readonly<Props>) {
  return (
    <TanstackQueryProvider>
      <div className="flex min-h-screen flex-col">{children}</div>;
    </TanstackQueryProvider>
  );
}
