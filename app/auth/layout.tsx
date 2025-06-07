export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
      <div className="card w-full shadow-xl bg-base-100">
        {children}
      </div>
    </div>
  );
}
