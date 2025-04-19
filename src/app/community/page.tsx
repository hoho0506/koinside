// community/page.tsx

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import crypto from "crypto"
import querystring from "querystring"

export default async function CommunityPage() {
  // 🔍 현재 로그인한 사용자의 세션을 불러옴
  const session = await getServerSession(authOptions)

  // ❗️로그인하지 않은 경우: 그냥 Discourse 메인 페이지로 이동
  if (!session || !session.user?.email) {
    redirect("https://community.koinside.org")
  }

  // ✅ 로그인한 경우: SSO 토큰 만들어서 자동 로그인 시도
  const discourseSSOUrl = getDiscourseSSOUrl(session.user.email, session.user.name || "")
  redirect(discourseSSOUrl)
}

// 🔐 Discourse SSO 로그인 URL 생성 함수
function getDiscourseSSOUrl(email: string, name: string) {
  const discourseBase = "https://community.koinside.org" // Discourse 주소
  const ssoSecret = process.env.DISCOURSE_SSO_SECRET || "" // 공유된 시크릿 키

  // 랜덤 nonce (일회용 토큰 같은 역할)
  const nonce = crypto.randomBytes(16).toString("hex")

  // 로그인할 사용자 정보를 URL-safe base64로 인코딩
  const payload = Buffer.from(`nonce=${nonce}&email=${email}&name=${name}`).toString("base64")

  // payload를 시크릿 키로 서명해서 위조 방지
  const sig = crypto.createHmac("sha256", ssoSecret).update(payload).digest("hex")

  // 최종 리디렉션 URL 생성
  const query = querystring.stringify({ sso: payload, sig })
  return `${discourseBase}/session/sso_login?${query}`
}