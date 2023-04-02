import useOverview from "@/hooks/useOverview";
import React from "react";
import StatusCard from "../Cards/StatusCard";
import { MdDangerous, MdEditCalendar, MdPendingActions } from "react-icons/md";

interface Props {}

const StatusOverviewPanel = (props: Props) => {
  const { data: overview, isLoading, error } = useOverview();
  return (
    <div className="grid lg:grid-cols-3 gap-4 p-4">
      <StatusCard
        label="Pending"
        value={overview?.pending}
        status="pending"
        icon={MdPendingActions}
      />
      <StatusCard
        label="Interview"
        value={overview?.interview}
        status="interview"
        icon={MdEditCalendar}
      />
      <StatusCard
        label="Declined"
        value={overview?.declined}
        status="declined"
        icon={MdDangerous}
      />
    </div>
  );
};

export default StatusOverviewPanel;
