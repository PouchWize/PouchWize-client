import React from "react";
import Image from "next/image";

interface OverviewCardProps {
  title: string;
  value: string | number;
  iconSrc: string;
}

const UserOverviewCard: React.FC<OverviewCardProps> = ({ title, value, iconSrc }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{title}</h2>
        <Image src={iconSrc} alt={title} width={30} height={30} />
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default UserOverviewCard;
