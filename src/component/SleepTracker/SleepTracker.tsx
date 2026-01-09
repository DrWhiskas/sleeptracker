import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import GoalCard from '../GoalCard/GoalCard';
import EntryCard from '../EntryCard/EntryCard';
import StatsCards from '../StatsCards/StatsCard';
import ProgressChart from '../ProgressChart/ProgressChart';
import type { SleepGoal, SleepEntry } from '../../types/type';


export default function SleepTrackerApp() {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [sleepGoal, setSleepGoal] = useState<SleepGoal>({
		bedtime: '22:00',
		wakeTime: '06:00',
	});
	const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split('T')[0]
	);
	const [actualBedtime, setActualBedtime] = useState('');
	const [actualWakeTime, setActualWakeTime] = useState('');

	// Update current time every second
	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	// Calculate hours slept between two times
	const calculateHoursSlept = (bedtime: string, wakeTime: string): number => {
		const [bedHour, bedMin] = bedtime.split(':').map(Number);
		const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);

		let totalMinutes = wakeHour * 60 + wakeMin - (bedHour * 60 + bedMin);
		if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle overnight sleep

		return parseFloat((totalMinutes / 60).toFixed(2));
	};

	// Calculate goal hours
	const goalHours = calculateHoursSlept(sleepGoal.bedtime, sleepGoal.wakeTime);

	// Add new sleep entry
	const addSleepEntry = () => {
		if (!actualBedtime || !actualWakeTime) return;

		const hoursSlept = calculateHoursSlept(actualBedtime, actualWakeTime);
		const newEntry: SleepEntry = {
			id: Date.now().toString(),
			date: selectedDate,
			actualBedtime,
			actualWakeTime,
			hoursSlept,
		};

		setSleepEntries((prev) => {
			const filtered = prev.filter((e) => e.date !== selectedDate);
			return [...filtered, newEntry].sort((a, b) =>
				a.date.localeCompare(b.date)
			);
		});

		setActualBedtime('');
		setActualWakeTime('');
	};

	// Get current week entries
	const getWeekEntries = () => {
		const today = new Date();
		const weekStart = new Date(today);
		weekStart.setDate(today.getDate() - today.getDay());

		return sleepEntries.filter((entry) => {
			const entryDate = new Date(entry.date);
			return entryDate >= weekStart && entryDate <= today;
		});
	};

	const weekEntries = getWeekEntries();
	const totalWeekHours = weekEntries.reduce(
		(sum, entry) => sum + entry.hoursSlept,
		0
	);

	// Get entry for selected date
	const todayEntry = sleepEntries.find((e) => e.date === selectedDate);

	// Calculate difference from goal
	const calculateDifference = (actual: number) => {
		const diff = actual - goalHours;
		return diff >= 0 ? `+${diff.toFixed(1)}h` : `${diff.toFixed(1)}h`;
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
			<div className="max-w-6xl mx-auto space-y-6">
				{/* Header with Clock */}
				<Header currentTime={currentTime} />

				{/* Goal Setting */}
				<GoalCard
					sleepGoal={sleepGoal}
					setSleepGoal={setSleepGoal}
					goalHours={goalHours}
				/>

				{/* Sleep Entry Form */}
				<EntryCard
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					actualBedtime={actualBedtime}
					setActualBedtime={setActualBedtime}
					actualWakeTime={actualWakeTime}
					setActualWakeTime={setActualWakeTime}
					addSleepEntry={addSleepEntry}
				/>

				{/* Stats Cards */}
				<StatsCards
					todayEntry={todayEntry}
					totalWeekHours={totalWeekHours}
					goalHours={goalHours}
					calculateDifference={calculateDifference}
				/>

				{/* Progress Chart */}
				<ProgressChart entries={sleepEntries} goalHours={goalHours} />
			</div>
		</div>
	);
}
