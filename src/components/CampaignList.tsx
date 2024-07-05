"use client";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { SquarePen } from 'lucide-react';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import CountdownTimer from './CountdownTimer';

import { getNextActivationTime } from '@/lib/scheduleUtils';
import { useRouter } from 'next/navigation';

const CampaignList = () => {
  const campaigns = useSelector((state: RootState) => state.campaign.campaigns);
  const router = useRouter();

  const handleEditCampaign = (campaignId: string) => {
    router.push(`/campaign/${campaignId}`);
  };

  return (
    <Table className="border">
      {campaigns.length > 0 && <TableCaption>A list of your recent campaigns.</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead>Campaign Type</TableHead>
          <TableHead className="w-[100]">Start Date</TableHead>
          <TableHead className="w-[100]">End Date</TableHead>
          <TableHead className="w-[100] text-right">Next Scheduled Activation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.length > 0 ? campaigns.map((campaign) => {
          const nextActivationTime = getNextActivationTime(campaign);
          return (
            <TableRow key={campaign?.id}>
              <TableCell className="font-medium">{campaign?.type}</TableCell>
              <TableCell>{campaign?.startDate}</TableCell>
              <TableCell>{campaign?.endDate}</TableCell>
              <TableCell className="text-right">{nextActivationTime?.nextUpcomingDate} {"|"} {nextActivationTime?.timeDifference}</TableCell>
              <TableCell><SquarePen color="black" size={16} onClick={() => handleEditCampaign(campaign?.id)} /></TableCell>
            </TableRow>
          );
        }) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">No records</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CampaignList;
