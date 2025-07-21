import { DashboardLayout } from "@/components/DashboardLayout"
import { KandangOverview } from "@/components/KandangOverview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, AlertCircle } from "lucide-react"

// Sample data - in real app this would come from InfluxDB
const mockSensorData = {
  kandang_1: {
    S_T1: 29.98,
    S_H1: 73.60,
    S_T2: 30.15,
    S_H2: 71.45,
    S_T3: 29.85,
    S_H3: 74.20,
    S_A1: 19.44,
    debit: 85.95,
    tinggi_air: 49.08,
    fan_alarm: 0,
    anemo: 61.27,
    umur_ayam: 9.8
  },
  kandang_2: {
    S_T1: 28.75,
    S_H1: 68.30,
    S_T2: 29.10,
    S_H2: 69.85,
    S_T3: 28.95,
    S_H3: 67.90,
    S_A1: 18.22,
    debit: 78.40,
    tinggi_air: 65.15,
    fan_alarm: 0,
    anemo: 55.80,
    umur_ayam: 12.3
  },
  kandang_3: {
    S_T1: 31.20,
    S_H1: 76.15,
    S_T2: 31.45,
    S_H2: 77.60,
    S_T3: 31.10,
    S_H3: 75.85,
    S_A1: 20.15,
    debit: 92.30,
    tinggi_air: 28.75,
    fan_alarm: 1,
    anemo: 68.40,
    umur_ayam: 15.7
  }
}

const Index = () => {
  const totalKandang = Object.keys(mockSensorData).length
  const avgTemp = Object.values(mockSensorData)
    .map(data => (data.S_T1 + data.S_T2 + data.S_T3) / 3)
    .reduce((acc, temp) => acc + temp, 0) / totalKandang

  const alertCount = Object.values(mockSensorData)
    .filter(data => data.fan_alarm > 0 || data.tinggi_air < 30).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Kandang
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalKandang}</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Temperature
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {avgTemp.toFixed(1)}°C
              </div>
              <p className="text-xs text-muted-foreground">
                Across all zones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Alerts
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{alertCount}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Farm Status Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Farm Overview</h2>
            <p className="text-muted-foreground">
              Real-time monitoring for AyamJaya chicken farm
            </p>
          </div>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            Live Data
          </Badge>
        </div>

        {/* Kandang Cards */}
        <div className="space-y-6">
          <KandangOverview
            kandangName="Kandang 1 (Farm Alpha)"
            sensorData={mockSensorData.kandang_1}
            perusahaan="AyamJaya"
          />
          
          <KandangOverview
            kandangName="Kandang 2 (Farm Beta)"
            sensorData={mockSensorData.kandang_2}
            perusahaan="AyamJaya"
          />
          
          <KandangOverview
            kandangName="Kandang 3 (Farm Gamma)"
            sensorData={mockSensorData.kandang_3}
            perusahaan="AyamJaya"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
