import ASMRStaticBackground from "@/components/ui/demo";
import ComplianceForm from "@/components/ui/compliance-form";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <ASMRStaticBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <ComplianceForm />
      </div>
    </main>
  );
}
