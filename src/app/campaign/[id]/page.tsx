'use client';

import { useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { RootState } from '../../../store';
import CampaignForm from '../../../components/CampaignForm';
import { MoveLeft } from 'lucide-react';

const EditCampaignPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const campaigns = useSelector((state: RootState) => state.campaign.campaigns);
    const campaign = campaigns.find((c: any) => c.id === id);

    if (!campaign) {
        return <div>Campaign not found</div>;
    }

    const goBack = () => {
        router.push('/');
    }

    return (
        <>
            <div className="container flex flex-col justify-center">
                <div className="flex flex-row justify-between">
                    <h3 className="flex font-bold font-[40] my-3"><MoveLeft size={16} color="#000" className="mx-4" onClick={goBack}/>Edit Campaigns</h3>
                </div>
                <CampaignForm campaign={campaign} />
            </div>
        </>
    );
};

export default EditCampaignPage;