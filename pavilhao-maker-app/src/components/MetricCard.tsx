'use client';

type MetricCardProps = {
  label: string;
  value: string;
  description: string;
  icon: string;
  trend?: string;
  progress?: number;
  variant?: 'default' | 'tertiary';
};

export default function MetricCard({ label, value, description, icon, trend, progress, variant = 'default' }: MetricCardProps) {
  return (
    <div className={`bg-white p-6 border border-zinc-200 shadow-sm flex flex-col justify-between card-animated min-h-[160px] ${variant === 'tertiary' ? 'border-b-4 border-b-tertiary-container' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] font-semibold text-on-surface-variant tracking-widest uppercase font-inter">
          {label}
        </span>
        <span className={`material-symbols-outlined ${variant === 'tertiary' ? 'text-tertiary-container' : 'text-primary'}`}>
          {icon}
        </span>
      </div>
      <div>
        <div className="flex items-baseline">
          <span className="text-[40px] font-bold text-on-surface leading-tight font-space">
            {value}
          </span>
          {trend && (
            <span className="text-green-600 text-sm font-medium ml-2">
              {trend}
            </span>
          )}
        </div>
        {progress !== undefined ? (
          <div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
          </div>
        ) : (
          <p className="text-[12px] font-semibold text-secondary mt-1 uppercase tracking-wider font-inter">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
