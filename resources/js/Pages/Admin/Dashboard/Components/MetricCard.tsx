import React from 'react';
import { LucideIcon } from 'lucide-react';

type MetricCardProps = {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: LucideIcon;
    color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    color
}) => {
    const changeColor = {
        positive: 'text-green-600',
        negative: 'text-red-600',
        neutral: 'text-gray-600'
    }[changeType];

    const changeSymbol = {
        positive: '+',
        negative: '',
        neutral: ''
    }[changeType];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${changeColor}`}>
                            {changeSymbol}{change}
                        </span>
                        <span className="text-sm text-gray-500">vs last month</span>
                    </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
