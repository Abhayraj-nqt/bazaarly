type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Readonly<Props>) {
  return <div className="">{children}</div>;
}
