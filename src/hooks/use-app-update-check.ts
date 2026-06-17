import { useEffect, useRef } from "react";
import { toast } from "sonner";

const POLL_INTERVAL_MS = 5 * 60 * 1000;

function showUpdateToast() {
  toast("New version available", {
    description: "Refresh to get the latest changes.",
    duration: Infinity,
    action: {
      label: "Refresh",
      onClick: () => window.location.reload(),
    },
  });
}

async function fetchRemoteBuildId(): Promise<string | null> {
  try {
    const response = await fetch(`/version.json?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (
      typeof data === "object" &&
      data !== null &&
      "buildId" in data &&
      typeof data.buildId === "string"
    ) {
      return data.buildId;
    }
    return null;
  } catch {
    return null;
  }
}

export function useAppUpdateCheck() {
  const notifiedRef = useRef(false);

  useEffect(() => {
    if (import.meta.env.DEV) {
      window.__dev = {
        ...window.__dev,
        showAppUpdateToast: showUpdateToast,
      };
      console.info(
        "[dev] Preview update toast: window.__dev.showAppUpdateToast()"
      );

      return () => {
        delete window.__dev?.showAppUpdateToast;
      };
    }

    const currentBuildId = __APP_BUILD_ID__;

    const checkForUpdate = async () => {
      if (notifiedRef.current) return;

      const remoteBuildId = await fetchRemoteBuildId();
      if (remoteBuildId === null || remoteBuildId === currentBuildId) return;

      notifiedRef.current = true;
      showUpdateToast();
    };

    void checkForUpdate();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void checkForUpdate();
      }
    };

    const onFocus = () => {
      void checkForUpdate();
    };

    const intervalId = window.setInterval(checkForUpdate, POLL_INTERVAL_MS);

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", onFocus);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", onFocus);
    };
  }, []);
}
