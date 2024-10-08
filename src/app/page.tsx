import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
} 
export default async function Home() {
  const session = await getUserDetails();

  if (session?.user) {
    redirect('/views/today');
  }
  {redirect('/login')}
}