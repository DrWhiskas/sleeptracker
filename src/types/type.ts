interface SleepGoal {
	bedtime: string;
	wakeTime: string;
}

interface SleepEntry {
	id: string;
	date: string;
	actualBedtime: string;
	actualWakeTime: string;
	hoursSlept: number;
}

export type { SleepGoal, SleepEntry };