export async function GET() {
  return Response.json({
    "frame": {
      "name": "Ubizo",
      "version": "1",
      "iconUrl": "https://ubizo-ur79.vercel.app/icon.png",
      "homeUrl": "https://ubizo-ur79.vercel.app",
      "imageUrl": "https://ubizo-ur79.vercel.app/image.png",
      "splashImageUrl": "https://ubizo-ur79.vercel.app/splash.png",
      "splashBackgroundColor": "#ffffff",
      "webhookUrl": "https://ubizo-ur79.vercel.app/api/webhook",
      "subtitle": "Safety circle & SOS app",
      "description": "Ubizo is a decentralized application that allows users to create a safety circle of trusted contacts and send SOS alerts in case of an emergency.",
      "primaryCategory": "education"
    },
    "accountAssociation": {
      "header": "eyJmaWQiOjEzMjY0NTYsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg5YjY5QzdDQTVlMDM0QjJFMjc4MzE1MWI1MmQzOUE1MWUwZDRBNEFEIn0",
      "payload": "eyJkb21haW4iOiJ1Yml6by11cjc5LnZlcmNlbC5hcHAifQ",
      "signature": "MHhlZDQ0OGFhMjUzNmJhYTIxOGE4OGFiOTAzMTU2Y2Y3OTI4NDRkYmY4ODk1Y2Q5ODk1NWMxYjlhMjY5M2ZkMmI0NjBiYzUxNjNjOTY5Y2U3ZTNiMmE3N2ZhZmFhMmUzZDdlMzBlNzVlOWI3MTY5Mzk3Y2RlMzA3NmM2ZmRjMWJmOTFj"
    }
  });
}