import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { SleepEntry } from '../../types/type';

export default function ProgressChart({
	entries,
	goalHours,
}: {
	entries: SleepEntry[],
	goalHours: number,
}) {
	// Get last 7 days of data
	const last7Days = entries.slice(-7).map((entry) => ({
		date: new Date(entry.date).toLocaleDateString('fr-FR', {
			day: '2-digit',
			month: '2-digit',
		}),
		actual: entry.hoursSlept,
		goal: goalHours,
	}));

	return (
		<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl">
			<div className="flex items-center gap-3 mb-6">
				<TrendingUp className="w-8 h-8" />
				<h2 className="text-2xl font-bold">Sleep Progress</h2>
			</div>

			{last7Days.length > 0 ? (
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={last7Days}>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="rgba(255,255,255,0.1)"
						/>
						<XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
						<YAxis stroke="rgba(255,255,255,0.7)" />
						<Tooltip
							contentStyle={{
								backgroundColor: 'rgba(0,0,0,0.8)',
								border: 'none',
								borderRadius: '12px',
								color: 'white',
							}}
						/>
						<Legend />
						<Line
							type="monotone"
							dataKey="actual"
							stroke="#ec4899"
							strokeWidth={3}
							name="Actual Sleep"
							dot={{ fill: '#ec4899', r: 5 }}
						/>
						<Line
							type="monotone"
							dataKey="goal"
							stroke="#8b5cf6"
							strokeWidth={2}
							strokeDasharray="5 5"
							name="Goal"
							dot={{ fill: '#8b5cf6', r: 4 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			) : (
				<div className="h-64 flex items-center justify-center text-xl opacity-60">
					No data to display yet. Start logging your sleep!
				</div>
			)}
		</div>
	);
}
