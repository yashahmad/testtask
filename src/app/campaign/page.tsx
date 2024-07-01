import React from "react";
import CampaignForm from "@/components/CampaignForm";

const AddCampaign = () => {
    return (
        <>
            <div className="container flex flex-col justify-center">
                <div className="flex flex-row justify-between">
                    <h3 className="font-bold font-[40] my-3">Campaigns</h3>
                    {/* <Button size="sm" onClick={navigateToAddCampaign}>Add Campaign</Button> */}
                </div>
                <CampaignForm />
            </div>
        </>
    )
}
export default AddCampaign;