import Dashboard from "@/components/Dashboard/Dashboard"
import { getDashboardStats } from "@/data/books"

export default async function Home() {
  const stats = await getDashboardStats()

  return <Dashboard stats={stats} />
}
