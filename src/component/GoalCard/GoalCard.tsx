import React from "react";
import { Target } from 'lucide-react';
import type { SleepGoal } from "../../types/type";

export default function GoalCard({
	sleepGoal,
	setSleepGoal,
	goalHours,
}: {
	sleepGoal: SleepGoal;
	setSleepGoal: React.Dispatch<React.SetStateAction<SleepGoal>>;
	goalHours: number;
}) {
	return (
		<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl">
			<div className="flex items-center gap-3 mb-6">
				<Target className="w-8 h-8" />
				<h2 className="text-2xl font-bold">Sleep Goal</h2>
			</div>

			<div className="grid md:grid-cols-3 gap-6">
				<div>
					<label className="block text-sm mb-2 opacity-80">Bedtime</label>
					<input
						type="time"
						value={sleepGoal.bedtime}
						onChange={(e) =>
							setSleepGoal((prev) => ({ ...prev, bedtime: e.target.value }))
						}
						className="w-full bg-white/20 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
					/>
				</div>

				<div>
					<label className="block text-sm mb-2 opacity-80">Wake Time</label>
					<input
						type="time"
						value={sleepGoal.wakeTime}
						onChange={(e) =>
							setSleepGoal((prev) => ({ ...prev, wakeTime: e.target.value }))
						}
						className="w-full bg-white/20 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
					/>
				</div>

				<div className="flex items-end">
					<div className="w-full bg-pink-500/30 rounded-xl p-4">
						<p className="text-sm opacity-80">Target Hours</p>
						<p className="text-3xl font-bold">{goalHours.toFixed(1)}h</p>
					</div>
				</div>
			</div>
		</div>
	);
}
