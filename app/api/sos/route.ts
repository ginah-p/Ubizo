import { NextResponse } from 'next/server';
import { getSafetyCircle, logSOSToBlockchain } from '@/lib/sos';
import { SafetyCircle, SOSPayload } from '@/lib/sos-types';

// This would be a more robust notification client
// For now, we just log to the console
async function sendNotifications(circle: SafetyCircle) {
    console.log(`Sending SOS to ${circle.contacts.length} contacts`);
    for (const contact of circle.contacts) {
        console.log(`Notifying ${contact.name}`);
        // Here you would integrate with Twilio for SMS, SendGrid for email, etc.
    }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SOSPayload;

    // 1. Get safety circle
    const safetyCircle = await getSafetyCircle(payload.fid);

    if (!safetyCircle || safetyCircle.contacts.length === 0) {
      return NextResponse.json(
        { error: 'No safety circle found or circle is empty' },
        { status: 404 },
      );
    }

    // 2. Send notifications to contacts
    await sendNotifications(safetyCircle);

    // 3. Log SOS to blockchain
    const tx = await logSOSToBlockchain(payload);

    return NextResponse.json({ success: true, txHash: tx.hash }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}