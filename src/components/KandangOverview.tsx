import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SensorCard } from "./SensorCard"
import { Thermometer, Droplets, Wind, Gauge, AlertTriangle } from "lucide-react"

interface SensorData {
  S_T1: number
  S_H1: number
  S_T2: number
  S_H2: number
  S_T3: number
  S_H3: number
  S_A1: number
  debit: number
  tinggi_air: number
  fan_alarm: number
  anemo: number
  umur_ayam: number
}

interface KandangOverviewProps {
  kandangName: string
  sensorData: SensorData
  perusahaan: string
}

export function KandangOverview({ kandangName, sensorData, perusahaan }: KandangOverviewProps) {
  // Calculate average temperature and humidity
  const avgTemp = ((sensorData.S_T1 + sensorData.S_T2 + sensorData.S_T3) / 3).toFixed(1)
  const avgHumidity = ((sensorData.S_H1 + sensorData.S_H2 + sensorData.S_H3) / 3).toFixed(1)

  // Determine status based on values
  const getTempStatus = (temp: number) => {
    if (temp < 25 || temp > 35) return 'critical'
    if (temp < 28 || temp > 32) return 'warning'
    return 'normal'
  }

  const getHumidityStatus = (humidity: number) => {
    if (humidity < 50 || humidity > 80) return 'critical'
    if (humidity < 60 || humidity > 75) return 'warning'
    return 'normal'
  }

  const getWaterStatus = (level: number) => {
    if (level < 20) return 'critical'
    if (level < 40) return 'warning'
    return 'normal'
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">
              {kandangName}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{perusahaan}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Chicken Age</p>
            <p className="text-lg font-semibold text-foreground">
              {sensorData.umur_ayam} days
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SensorCard
            title="Average Temperature"
            value={avgTemp}
            unit="°C"
            icon={Thermometer}
            status={getTempStatus(parseFloat(avgTemp))}
            description="Zones 1-3 average"
          />
          
          <SensorCard
            title="Average Humidity"
            value={avgHumidity}
            unit="%"
            icon={Droplets}
            status={getHumidityStatus(parseFloat(avgHumidity))}
            description="Zones 1-3 average"
          />
          
          <SensorCard
            title="Air Speed"
            value={sensorData.anemo.toFixed(1)}
            unit="m/s"
            icon={Wind}
            status="normal"
            description="Wind flow measurement"
          />
          
          <SensorCard
            title="Water Level"
            value={sensorData.tinggi_air.toFixed(0)}
            unit="%"
            icon={Gauge}
            status={getWaterStatus(sensorData.tinggi_air)}
            description="Tank capacity"
          />
        </div>

        {/* Detailed sensor readings */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Zone 1 Sensors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Temperature:</span>
                <span className="font-medium">{sensorData.S_T1.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Humidity:</span>
                <span className="font-medium">{sensorData.S_H1.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Zone 2 Sensors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Temperature:</span>
                <span className="font-medium">{sensorData.S_T2.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Humidity:</span>
                <span className="font-medium">{sensorData.S_H2.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Zone 3 Sensors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Temperature:</span>
                <span className="font-medium">{sensorData.S_T3.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Humidity:</span>
                <span className="font-medium">{sensorData.S_H3.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {sensorData.fan_alarm > 0 && (
          <Card className="mt-4 border-warning bg-warning/5">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="font-medium text-warning">Fan Alarm Active</span>
                <span className="text-sm text-muted-foreground ml-auto">
                  Status: {sensorData.fan_alarm}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}