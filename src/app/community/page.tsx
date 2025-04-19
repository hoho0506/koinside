import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import crypto from "crypto"
import querystring from "querystring"

export default async function CommunityPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    // 로그인 안 된 경우: 그냥 Discourse 홈페이지로 이동
    redirect("https://community.koinside.org")
  }

  const discourseSSOUrl = getDiscourseSSOUrl(session.user.email, session.user.name || "")
  redirect(discourseSSOUrl)
}

function getDiscourseSSOUrl(email: string, name: string) {
  const discourseBase = "https://community.koinside.org"
  const ssoSecret = process.env.DISCOURSE_SSO_SECRET || ""
  const nonce = crypto.randomBytes(16).toString("hex")
  const payload = Buffer.from(`nonce=${nonce}&email=${email}&name=${name}`).toString("base64")
  const sig = crypto.createHmac("sha256", ssoSecret).update(payload).digest("hex")

  const query = querystring.stringify({ sso: payload, sig })
  return `${discourseBase}/session/sso_login?${query}`
}