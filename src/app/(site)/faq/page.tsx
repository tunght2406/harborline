import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Location, freight we can take, vehicles, timing, container unloads, and restacks at Harborline in Tampa.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        kicker="FAQ"
        title="Straight answers before you send a truck."
        lede="If your freight sits outside these notes, ask anyway. We would rather decline a bad fit than discover it at the door."
      />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <FaqList />
      </div>
      <CtaBand />
    </>
  );
}
