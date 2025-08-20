// This is a placeholder for authentication logic.
// In a real app, you would protect this route based on user roles.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isFaculty = true; // Replace with actual role check

  if (!isFaculty) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">
          You must be a faculty member to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
