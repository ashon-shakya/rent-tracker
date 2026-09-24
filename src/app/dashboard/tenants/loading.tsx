import { DynamicPageLoader } from "@/components/DynamicPageLoader";

export default function TenantsLoading() {
  return (
    <div className="w-full flex items-center justify-center min-h-[70vh] animate-in fade-in duration-300">
      <DynamicPageLoader fullScreen={false} title="Loading Tenants" />
    </div>
  );
}
