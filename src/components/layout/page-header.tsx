interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-h1 text-primary mb-2">{title}</h1>
      {description && (
        <p className="text-body text-secondary max-w-3xl">{description}</p>
      )}
    </div>
  );
}
