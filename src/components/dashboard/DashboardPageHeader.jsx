const DashboardPageHeader = ({ label, title, subtitle, action }) => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {label && (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
            {label}
          </p>
        )}
        <h1 className="font-serif mt-1 text-3xl text-neutral-900 sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm text-neutral-500 sm:text-base">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default DashboardPageHeader;
