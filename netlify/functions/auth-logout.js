export default async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "lsmg_admin_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict",
    },
  });
};

export const config = {
  path: "/api/auth/logout",
};
