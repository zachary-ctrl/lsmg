const ALLOWED_DOMAINS = ["lastshotmediagroup.com", "lsmgholdings.com"];

const PASS_MAP = {
  "zachary@lastshotmediagroup.com": "ADMIN_PASS_ZACHARY",
  "julien@lastshotmediagroup.com": "ADMIN_PASS_JULIEN",
  "alexandrea@lastshotmediagroup.com": "ADMIN_PASS_ALEX",
  "ashley@lastshotmediagroup.com": "ADMIN_PASS_ASHLEY",
  "nasier@lastshotmediagroup.com": "ADMIN_PASS_NASIER",
};

function toBase64(str) {
  return Buffer.from(str).toString("base64").replace(/=/g, "");
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, password } = body;
  if (!email || !password) {
    return new Response(JSON.stringify({ ok: false, error: "Email and password are required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const domain = email.split("@")[1] || "";
  if (!ALLOWED_DOMAINS.includes(domain)) {
    return new Response(
      JSON.stringify({ ok: false, error: "Unauthorized domain. Must use @lastshotmediagroup.com or @lsmgholdings.com email." }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const envKey = PASS_MAP[email.toLowerCase()];
  if (!envKey) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid credentials." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const expectedPass = process.env[envKey];
  if (!expectedPass || password !== expectedPass) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid credentials." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const now = Math.floor(Date.now() / 1000);
  const header = toBase64(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = toBase64(JSON.stringify({ email, exp: now + 86400, iat: now }));
  const signature = toBase64(email + "_lsmg_" + Date.now());
  const token = `${header}.${payload}.${signature}`;

  return new Response(JSON.stringify({ ok: true, email, token }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `lsmg_admin_token=${token}; Max-Age=86400; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
};

export const config = {
  path: "/api/auth/login",
  method: "POST",
};
