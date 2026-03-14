export default function LoadingSpinner({ size = 'large', text = 'Loading...' }) {
  const sizes = { small: 'w-5 h-5', medium: 'w-8 h-8', large: 'w-12 h-12' };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <div className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
      {text && <p className="mt-3 text-slate-500 text-sm">{text}</p>}
    </div>
  );
}

export function InlineSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-slate-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
    </div>
  );
}