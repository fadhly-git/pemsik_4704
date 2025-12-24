import axios from "@/utils/AxiosInstance";

// Ambil semua data chart
export const getAllChartData = () => axios.get("/chart");
