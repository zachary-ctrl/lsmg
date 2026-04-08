const ALLOWED_DOMAINS = ["lastshotmediagroup.com", "lsmgholdings.com"];

const EXCLUDED = ["/admin/login", "/admin/login.html"];

function getCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"));
  return match ? match[1] : null;
}

function decodeBase64Url(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  return atob(padded);
}

export default async (req, context) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // Exclude login pages and auth API
  if (
    EXCLUDED.includes(path) ||
    path.startsWith("/api/auth")
  ) {
    return context.next();
  }

  const cookieHeader = req.headers.get("cookie");
  const token = getCookie(cookieHeader, "lsmg_admin_token");

  if (!token) {
    return Response.redirect(new URL("/admin/login.html", url.origin), 302);
  }

  try {
    const parts = token.split(".");
    if (parts.length < 3) throw new Error("Invalid token");

    const payload = JSON.parse(decodeBase64Url(parts[1]));
    const email = payload.email || "";
    const exp = payload.exp || 0;
    const domain = email.split("@")[1] || "";

    if (!ALLOWED_DOMAINS.includes(domain)) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/admin/login.html",
          "Set-Cookie": "lsmg_admin_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict",
        },
      });
    }

    if (exp < Math.floor(Date.now() / 1000)) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/admin/login.html",
          "Set-Cookie": "lsmg_admin_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict",
        },
      });
    }

    return context.next();
  } catch {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/admin/login.html",
        "Set-Cookie": "lsmg_admin_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict",
      },
    });
  }
};
