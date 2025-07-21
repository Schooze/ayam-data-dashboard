import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface SensorCardProps {
  title: string
  value: string | number
  unit: string
  icon: LucideIcon
  status?: 'normal' | 'warning' | 'critical'
  description?: string
}

export function SensorCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  status = 'normal',
  description 
}: SensorCardProps) {
  const getStatusColors = () => {
    switch (status) {
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20'
      case 'critical':
        return 'text-destructive bg-destructive/10 border-destructive/20'
      default:
        return 'text-success bg-success/10 border-success/20'
    }
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${getStatusColors()}`}>
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-1">
          <div className="text-2xl font-bold text-foreground">
            {value}
          </div>
          <div className="text-sm text-muted-foreground">
            {unit}
          </div>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}