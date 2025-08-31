import React from "react";

export function getMicroServiceUserAgent () {
    try {
      return Liferay.OAuth2Client.FromUserAgentApplication(
        "dwtc-user-agent-application"
      );
    } catch (error) {
      console.error("OAuth client load error:", error);
    }
};