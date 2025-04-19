import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth" // 경로 주의!

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }