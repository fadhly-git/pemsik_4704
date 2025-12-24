import { Card } from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useAuthStateContext } from "@/Context/AuthContext";
import { useModulProgress, useProgress } from "@/utils/hooks/useKelas";
import { useChartData } from "@/utils/hooks/useChart";
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();
  const { progress, selesai, total } = useProgress();
  
  // Fetch chart data
  const { data: chartData = {}, isLoading: isChartLoading } = useChartData();
  
  const {
    students = [],
    genderRatio = [],
    registrations = [],
    gradeDistribution = [],
    lecturerRanks = [],
  } = chartData;

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <Heading as="h2" align="left" className="mb-2">
          Selamat Datang, {user?.name || "Mahasiswa"}! 👋
        </Heading>
        <p className="text-gray-600">
          Mari lanjutkan perjalanan belajar Anda hari ini
        </p>
      </Card>

      {/* Progress Card */}
      <Card>
        <Heading as="h3" align="left" className="mb-4">
          Progress Belajar Anda
        </Heading>
        <ProgressBar progress={progress} />
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-4">
            Anda telah menyelesaikan{" "}
            <span className="font-semibold text-blue-600">{progress}%</span>{" "}
            dari total materi
          </p>
          <Button onClick={() => navigate("/admin/kelas")} size="lg">
            Lanjutkan Belajar →
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-4xl font-bold text-blue-600">
            {total}
          </div>
          <p className="text-gray-600 mt-2">Total Materi</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl font-bold text-green-600">
            {selesai}
          </div>
          <p className="text-gray-600 mt-2">Materi Selesai</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl font-bold text-orange-600">
            {total - selesai}
          </div>
          <p className="text-gray-600 mt-2">Tersisa</p>
        </Card>
      </div>

      {/* Charts Section */}
      {isChartLoading ? (
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500">Memuat data chart...</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Bar Chart - Mahasiswa per Fakultas */}
          <Card>
            <Heading as="h3" align="left" className="mb-4">
              📊 Mahasiswa per Fakultas
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={students}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="faculty" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Jumlah Mahasiswa" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Grid untuk 2 chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart - Rasio Gender */}
            <Card>
              <Heading as="h3" align="left" className="mb-4">
                👥 Rasio Gender Mahasiswa
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderRatio}
                    dataKey="count"
                    nameKey="gender"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {genderRatio.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Line Chart - Tren Pendaftaran */}
            <Card>
              <Heading as="h3" align="left" className="mb-4">
                📈 Tren Pendaftaran Mahasiswa
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={registrations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Total Pendaftar"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Grid untuk 2 chart lagi */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart - Distribusi Nilai */}
            <Card>
              <Heading as="h3" align="left" className="mb-4">
                🎯 Distribusi Nilai per Jurusan
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={gradeDistribution}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Nilai A"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Nilai B"
                    dataKey="B"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Nilai C"
                    dataKey="C"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.3}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Area Chart - Pangkat Dosen */}
            <Card>
              <Heading as="h3" align="left" className="mb-4">
                👨‍🏫 Distribusi Pangkat Dosen
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={lecturerRanks}>
                  <defs>
                    <linearGradient id="colorLecturer" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="rank" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorLecturer)"
                    name="Jumlah Dosen"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
