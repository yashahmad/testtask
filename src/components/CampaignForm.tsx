'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addCampaign, updateCampaign } from '../store/slices/campaignSlice';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CampaignForm = ({ campaign }: { campaign?: any }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [type, setType] = useState(campaign?.type || '');
  const [startDate, setStartDate] = useState(campaign?.startDate || '');
  const [endDate, setEndDate] = useState(campaign?.endDate || '');
  const [schedules, setSchedules] = useState(campaign?.schedules || []);

  const handleAddSchedule = () => {
    setSchedules([...schedules, { dayOfWeek: 0, startTime: '', endTime: '' }]);
  };

  const handleScheduleChange = (index: number, key: string, value: any) => {
    const newSchedules = schedules.map((schedule: any, idx: any) => 
      idx === index ? { ...schedule, [key]: value } : schedule
    );
    setSchedules(newSchedules);
  };

  const handleSubmit = () => {
    const newCampaign = {
      id: campaign?.id || Math.random().toString(36).substring(2, 15),
      type,
      startDate,
      endDate,
      schedules,
    };

    if (campaign) {
      dispatch(updateCampaign(newCampaign));
    } else {
      dispatch(addCampaign(newCampaign));
    }
    goBack();
  };

  const goBack = () => {
    router.push('/');
  };

  return (
    <Card className="w-md-1/2">
      <CardHeader>
        <CardTitle>{campaign ? 'Edit Campaign' : 'New Campaign'}</CardTitle>
        <CardDescription>Schedule your new campaign in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Campaign Type</Label>
              <Input id="type" placeholder="Type of your campaign" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 gap-2">
              <Label htmlFor="schedules">Schedules</Label>
              {schedules.map((schedule: any, index: any) => (
                <div key={index} className="flex gap-5 w-2/3">
                  <Select value={String(schedule.dayOfWeek)} onValueChange={(value) => handleScheduleChange(index, 'dayOfWeek', value)}>
                    <SelectTrigger id="schedules">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Sunday</SelectItem>
                      <SelectItem value="1">Monday</SelectItem>
                      <SelectItem value="2">Tuesday</SelectItem>
                      <SelectItem value="3">Wednesday</SelectItem>
                      <SelectItem value="4">Thursday</SelectItem>
                      <SelectItem value="5">Friday</SelectItem>
                      <SelectItem value="6">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-5">
                    <Input type="time" value={schedule.startTime} onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)} />
                    <Input type="time" value={schedule.endTime} onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)} />
                  </div>
                </div>
              ))}
              <Button type="button" className="" onClick={handleAddSchedule}>Add Schedule</Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={goBack}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>{campaign ? 'Update Campaign' : 'Create Campaign'}</Button>
      </CardFooter>
    </Card>
  );
};

export default CampaignForm;
