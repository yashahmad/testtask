const dayOfWeekToName = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
};

export const getNextActivationTime = (schedules: any[]) => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let nextActivation: Date | null = null;
    let minTimeDifference = Infinity;

    schedules.forEach(schedule => {
        const scheduleDay = schedule.dayOfWeek;
        const scheduleStart = parseInt(schedule.startTime.split(':')[0]) * 60 + parseInt(schedule.startTime.split(':')[1]);

        let timeDifference = 0;
        if (scheduleDay === currentDay) {
            if (scheduleStart > currentTime) {
                timeDifference = scheduleStart - currentTime;
            } else {
                timeDifference = 24 * 60 - (currentTime - scheduleStart);
            }
        } else if (scheduleDay > currentDay) {
            timeDifference = (scheduleDay - currentDay) * 24 * 60 - currentTime + scheduleStart;
        } else {
            timeDifference = (7 - currentDay + scheduleDay) * 24 * 60 - currentTime + scheduleStart;
        }

        if (timeDifference < minTimeDifference) {
            minTimeDifference = timeDifference;
            nextActivation = new Date(now.getTime() + timeDifference * 60000);
        }
    });

    return nextActivation;
};
