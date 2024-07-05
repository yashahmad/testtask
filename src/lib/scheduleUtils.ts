import { Campaign, Schedule } from "@/store/slices/campaignSlice";

// Utility function to add days to a date
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const getDayOfWeekIndex = (dayOfWeek: number) => {
    return (dayOfWeek + 6) % 7; // Adjusting to make 1 (Monday) = 0 index
}

export const getNextActivationTime = (campaign: Campaign) => {
    const { startDate, endDate, schedules } = campaign;
    const start = new Date(startDate);
    const end = new Date(endDate);

    let nextUpcomingDate = null;

    for (let date = start; date <= end; date = addDays(date, 1)) {
        const dayOfWeek = date.getDay();

        for (const schedule of schedules) {
            if (getDayOfWeekIndex(schedule.dayOfWeek) === dayOfWeek) {
                const scheduleStart = new Date(date);
                const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
                scheduleStart.setHours(startHour, startMinute, 0, 0);

                if (scheduleStart >= start && scheduleStart <= end) {
                    if (!nextUpcomingDate || scheduleStart < nextUpcomingDate) {
                        nextUpcomingDate = scheduleStart;
                    }
                }
            }
        }
    }

    return nextUpcomingDate ? nextUpcomingDate.toDateString() : null;
};
