"use client";

import { useEffect } from "react";
import { getAllFormsFalse } from "@/lib/services/supabaseServices";

export default function DashboardPage() {

  async function fetchForms() {
    try {
      const forms = await getAllFormsFalse();
      console.log("FORMS:", forms);
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div>
      Dashboard
    </div>
  );
}