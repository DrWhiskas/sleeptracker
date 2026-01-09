import { Calendar } from 'lucide-react';

export default function EntryCard({
	selectedDate,
	setSelectedDate,
	actualBedtime,
	setActualBedtime,
	actualWakeTime,
	setActualWakeTime,
	addSleepEntry,
}: {
	selectedDate: string;
	setSelectedDate: (date: string) => void;
	actualBedtime: string;
	setActualBedtime: (time: string) => void;
	actualWakeTime: string;
	setActualWakeTime: (time: string) => void;
	addSleepEntry: () => void;
}) {
	return (
		<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl">
			<div className="flex items-center gap-3 mb-6">
				<Calendar className="w-8 h-8" />
				<h2 className="text-2xl font-bold">Log Sleep</h2>
			</div>

			<div className="grid md:grid-cols-4 gap-4">
				<div>
					<label className="block text-sm mb-2 opacity-80">Date</label>
					<input
						type="date"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
						className="w-full bg-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
					/>
				</div>

				<div>
					<label className="block text-sm mb-2 opacity-80">
						Actual Bedtime
					</label>
					<input
						type="time"
						value={actualBedtime}
						onChange={(e) => setActualBedtime(e.target.value)}
						className="w-full bg-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
					/>
				</div>

				<div>
					<label className="block text-sm mb-2 opacity-80">
						Actual Wake Time
					</label>
					<input
						type="time"
						value={actualWakeTime}
						onChange={(e) => setActualWakeTime(e.target.value)}
						className="w-full bg-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
					/>
				</div>

				<div className="flex items-end">
					<button
						onClick={addSleepEntry}
						className="w-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl px-6 py-3 font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
					>
						Save Entry
					</button>
				</div>
			</div>
		</div>
	);
}
