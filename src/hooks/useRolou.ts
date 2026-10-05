"use client";

import { useEffect, useState } from "react";

/** true quando a página passou de `limite` px de rolagem. */
export function useRolou(limite = 10) {
  const [rolou, setRolou] = useState(false);
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > limite);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [limite]);
  return rolou;
}
