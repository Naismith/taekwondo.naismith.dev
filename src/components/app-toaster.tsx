import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "rounded-sm border border-white/10 bg-white/5 text-white shadow-lg",
          title: "text-sm font-medium text-white",
          description: "text-sm text-white/70",
          actionButton:
            "rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90",
          closeButton:
            "border-white/10 bg-white/5 text-white/50 hover:text-white",
        },
      }}
    />
  );
}
