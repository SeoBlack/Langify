import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch (error) {
    return null;
  }
}

export function withAuth(
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const token = req.headers.get("authorization")?.replace("Bearer ", "");

      if (!token) {
        return NextResponse.json(
          { success: false, error: "No token provided" },
          { status: 401 }
        );
      }

      const decoded = verifyToken(token);

      if (!decoded) {
        return NextResponse.json(
          { success: false, error: "Invalid token" },
          { status: 401 }
        );
      }

      return handler(req, decoded.userId);
    } catch (error) {
      console.error("Auth middleware error:", error);
      return NextResponse.json(
        { success: false, error: "Authentication failed" },
        { status: 401 }
      );
    }
  };
}
