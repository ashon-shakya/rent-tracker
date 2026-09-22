import { getRentAgreementById } from "@/actions/rentActions";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

export default async function EditRentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const rent = await getRentAgreementById(resolvedParams.id);
  if (!rent) notFound();

  return (
    <EditForm
      id={rent._id}
      address={rent.address}
      icon={rent.icon}
      startDate={new Date(rent.startDate).toISOString().split('T')[0]}
      endDate={rent.endDate ? new Date(rent.endDate).toISOString().split('T')[0] : ""}
      rentAmount={rent.rentAmount}
      bondAmount={rent.bondAmount}
      rentDueDays={rent.rentDueDays}
    />
  );
}
