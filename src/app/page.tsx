"use client";
import CampaignList from '../components/CampaignList';
import { Button } from '@/components/ui/button';

// Router
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const navigateToAddCampaign = () => {
    router.push('/campaign');
  }

  return (
    <div className="container flex flex-col justify-center">
      <div className="flex flex-row justify-between">
        <h3 className="font-bold font-[40] my-3">Campaigns</h3>
        <Button size="sm" onClick={navigateToAddCampaign}>Add Campaign</Button>
      </div>
      <CampaignList />
    </div>
  );
};

export default Home;
