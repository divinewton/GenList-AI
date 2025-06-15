"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"

const VersionText = () => {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVersion() {
      const response = await fetch('https://api.github.com/repos/divinewton/GenList-AI/releases');
      const releases = await response.json();
      
      if (releases.length > 0) {
        const latestRelease = releases[0];
        setVersion(latestRelease.name.slice(1));
      } else {
        setVersion(null);
      }
    }

    fetchVersion();
  }, []);

  if(!version) {
    return (
        <div className="flex gap-1 items-center justify-center pb-1">
            <Skeleton className="h-5 w-[100px]" />
        </div>
    );
  }

return (
    <div className="flex gap-1 items-center justify-center">
        <p>Version {version}</p>
    </div>
);
};
 
export default VersionText;