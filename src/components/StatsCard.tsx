import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  color?: "primary" | "accent" | "success" | "warning";
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = "up",
  color = "primary" 
}: StatsCardProps) {
  const colorClasses = {
    primary: "bg-gradient-primary text-primary-foreground",
    accent: "bg-gradient-accent text-accent-foreground", 
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground"
  };

  return (
    <motion.div
      className="learning-card group cursor-pointer"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]} shadow-medium group-hover:shadow-glow transition-all duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
            {trend === 'up' ? '+' : ''}{change}
          </span>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>
    </motion.div>
  );
}