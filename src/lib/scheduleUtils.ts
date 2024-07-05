import { Campaign } from "@/store/slices/campaignSlice";

export function getNextActivationTime(campaign: Campaign) {
    const { startDate, endDate, schedules } = campaign;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    // Utility function to add days to a date (returns a new ISO string)
    function addDays(date: string, days: number): string {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString();
    }

    let nextUpcomingDate: string | null = null;

    // Iterate through each date within the range
    for (let date = startDate; new Date(date) <= end; date = addDays(date, 1)) {
        const dayOfWeek = new Date(date).getDay();

        for (const schedule of schedules) {
            if (schedule.dayOfWeek == dayOfWeek) {
                const scheduleStart = new Date(date);
                const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
                scheduleStart.setHours(startHour, startMinute, 0, 0);

                const scheduleStartISO = scheduleStart.toISOString();
                if (scheduleStart >= now && scheduleStart <= end) {
                    if (!nextUpcomingDate || new Date(scheduleStartISO) < new Date(nextUpcomingDate)) {
                        nextUpcomingDate = scheduleStartISO;
                    }
                }
            }
        }
    }

    if (nextUpcomingDate) {
        const nextUpcomingDateString = new Date(nextUpcomingDate).toDateString();
        const timeDifference = new Date(nextUpcomingDate).getTime() - now.getTime();
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return {
            nextUpcomingDate: nextUpcomingDateString,
            timeDifference: `${days} days, ${hours} hours, ${minutes} minutes`
        };
    }
    return null;
}