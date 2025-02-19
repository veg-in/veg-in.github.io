interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='w-[600px] h-[1080px] bg-slate-50 flex flex-col items-center justify-start p-8 overflow-y-auto'>
      {children}
    </div>
  );
}
