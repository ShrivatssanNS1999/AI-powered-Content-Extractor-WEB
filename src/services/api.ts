import { ApiResponse } from "../types";

const API_URL = `${import.meta.env.VITE_API_URL}/extract`;

export class ContentExtractionService {
  static async extractContent(url: string): Promise<ApiResponse> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Content extraction failed:", error);
      throw new Error(
        "Failed to extract content. Please check the URL and try again."
      );
    }
  }

  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  }

  static getDomainFromUrl(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return "unknown";
    }
  }
}
