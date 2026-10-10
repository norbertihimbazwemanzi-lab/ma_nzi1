import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { email, password } = await req.json();
    const adminEmail = (
      (typeof Netlify !== "undefined" && Netlify.env ? Netlify.env.get("ADMIN_EMAIL") : null) ||
      process.env.ADMIN_EMAIL ||
      "norbertihimbazwemanzi@gmail.com"
    ).toLowerCase().trim();

    const adminPass =
      (typeof Netlify !== "undefined" && Netlify.env ? Netlify.env.get("ADMIN_PASSWORD") : null) ||
      process.env.ADMIN_PASSWORD ||
      "admin123";

    if (email && email.toLowerCase().trim() === adminEmail && password === adminPass) {
      return Response.json({
        success: true,
        message: "Admin authenticated successfully",
      });
    }

    return Response.json(
      { success: false, error: "Invalid email address or password" },
      { status: 401 }
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: "Authentication error: " + (err?.message || "Unknown error") },
      { status: 500 }
    );
  }
};

export const config: Config = {
  path: "/api/admin/login",
};
