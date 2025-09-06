function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  return Response.json({
    "accountAssociation": {
      "header": "eyJmaWQiOjEzMjY0NTYsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg5YjY5QzdDQTVlMDM0QjJFMjc4MzE1MWI1MmQzOUE1MWUwZDRBNEFEIn0",
      "payload": "eyJkb21haW4iOiJ1Yml6by11cjc5LnZlcmNlbC5hcHAifQ",
      "signature": "MHhlZDQ0OGFhMjUzNmJhYTIxOGE4OGFiOTAzMTU2Y2Y3OTI4NDRkYmY4ODk1Y2Q5ODk1NWMxYjlhMjY5M2ZkMmI0NjBiYzUxNjNjOTY5Y2U3ZTNiMmE3N2ZhZmFhMmUzZDdlMzBlNzVlOWI3MTY5Mzk3Y2RlMzA3NmM2ZmRjMWJmOTFj"
    },
    frames: withValidProperties({
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE,
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
      screenshotUrls: [],
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON,
      splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY,
      tags: [],
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE,
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE,
    }),
  });
}