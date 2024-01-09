// pages/api/webhooks/clerk.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export default async function clerkWebhookHandler(req: NextApiRequest, res: NextApiResponse) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing Clerk webhook secret');
    res.status(500).send('Server error: Missing Clerk webhook secret');
    return;
  }

  // Use headers directly from the req object
  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).send('Error: Missing Svix headers');
    return;
  }

  const payload = req.body;
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id.toString(),
      'svix-timestamp': Array.isArray(svix_timestamp) ? svix_timestamp[0] : svix_timestamp,
      'svix-signature': Array.isArray(svix_signature) ? svix_signature[0] : svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    res.status(400).send('Error verifying webhook');
    return;
  }

  const eventType = evt.type;
  console.log(`Received Clerk webhook: ${eventType}`);
  // console.log(body)

  // Handle different event types...
  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username, // Provide a default value if username is missing
        imageUrl: payload.data.image_url,
      },
    });
  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
 
  if (eventType === "user.deleted") {
    // await resetIngresses(payload.data.id);

    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }

  res.status(200).send('Webhook received');
}
