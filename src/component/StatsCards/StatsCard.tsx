import React from "react";
import type { SleepEntry } from "../../types/type";
import { Sun, TrendingUp, Target } from 'lucide-react';


export default function StatsCards({
	todayEntry,
	totalWeekHours,
	goalHours,
	calculateDifference,
}: {
	todayEntry?: SleepEntry;
	totalWeekHours: number;
	goalHours: number;
	calculateDifference: (actual: number) => string;
}) {
	return (
		<div className="grid md:grid-cols-3 gap-6">
			{/* Today's Sleep */}
			<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white shadow-2xl">
				<div className="flex items-center gap-3 mb-4">
					<Sun className="w-6 h-6 text-yellow-400" />
					<h3 className="text-lg font-semibold">Today's Sleep</h3>
				</div>
				{todayEntry ? (
					<div>
						<p className="text-4xl font-bold mb-2">
							{todayEntry.hoursSlept.toFixed(1)}h
						</p>
						<p
							className={`text-lg ${
								todayEntry.hoursSlept >= goalHours
									? 'text-green-400'
									: 'text-red-400'
							}`}
						>
							{calculateDifference(todayEntry.hoursSlept)} from goal
						</p>
					</div>
				) : (
					<p className="text-2xl opacity-60">No data</p>
				)}
			</div>

			{/* Week Total */}
			<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white shadow-2xl">
				<div className="flex items-center gap-3 mb-4">
					<TrendingUp className="w-6 h-6 text-blue-400" />
					<h3 className="text-lg font-semibold">This Week</h3>
				</div>
				<p className="text-4xl font-bold mb-2">{totalWeekHours.toFixed(1)}h</p>
				<p className="text-lg opacity-80">Total hours slept</p>
			</div>

			{/* Weekly Goal */}
			<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white shadow-2xl">
				<div className="flex items-center gap-3 mb-4">
					<Target className="w-6 h-6 text-purple-400" />
					<h3 className="text-lg font-semibold">Weekly Goal</h3>
				</div>
				<p className="text-4xl font-bold mb-2">{(goalHours * 7).toFixed(1)}h</p>
				<p
					className={`text-lg ${
						totalWeekHours >= goalHours * 7
							? 'text-green-400'
							: 'text-orange-400'
					}`}
				>
					{calculateDifference(totalWeekHours / 7)} avg/day
				</p>
			</div>
		</div>
	);
}

