import React from "react";
import { Moon, Sun, Target, TrendingUp, Calendar, Clock } from 'lucide-react';


export default function Header({ currentTime }: { currentTime: Date }) {
	return (
		<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Moon className="w-12 h-12" />
					<h1 className="text-4xl font-bold">Sleep Tracker</h1>
				</div>
				<div className="flex items-center gap-3 text-2xl font-mono">
					<Clock className="w-8 h-8" />
					{currentTime.toLocaleTimeString('fr-FR')}
				</div>
			</div>
		</div>
	);
}