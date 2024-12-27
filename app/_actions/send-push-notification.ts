"use server";
import webpush from "web-push";
import { unstable_noStore as noStore } from "next/cache"; //https://nextjs.org/docs/app/api-reference/functions/unstable_noStore

if (process.env.NEXT_PUBLIC_VAPID_KEY && process.env.NEXT_PRIVATE_VAPID_KEY) {
  webpush.setVapidDetails(
    "https://aygm-pwa.vercel.app/",
    process.env.NEXT_PUBLIC_VAPID_KEY,
    process.env.NEXT_PRIVATE_VAPID_KEY
  );
}

export default async function sendPushNotification({
  subscription,
  title,
  body,
}: {
  subscription: webpush.PushSubscription;
  title: string;
  body: string;
}) {
  noStore();
  return await webpush.sendNotification(
    subscription,
    JSON.stringify({
      title,
      body,
    }),
    {
      urgency: "high",
      TTL: 86400,
    }
  );
}
