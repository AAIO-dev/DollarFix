import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

Deno.serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    return new Response("Webhook secret or signature missing", { status: 400 });
  }

  try {
    const body = await req.text();
    // التحقق من أن الطلب قادم فعلاً من Stripe وليس اختراقاً
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    );

    // إذا تمت عملية الدفع بنجاح
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const userId = session.client_reference_id; // هوية المستخدم التي أرسلناها من الموقع
      const amountTotal = session.amount_total; // المبلغ المدفوع بالسنتات (1 دولار = 100)

      if (userId && amountTotal) {
        // تحديد كمية الرصيد بناءً على المبلغ المدفوع
        let creditsToAdd = 0;
        if (amountTotal === 100) creditsToAdd = 100;
        else if (amountTotal === 200) creditsToAdd = 300;
        else if (amountTotal === 300) creditsToAdd = 500;

        if (creditsToAdd > 0) {
          // الاتصال بقاعدة البيانات بصلاحيات المسؤول (تتخطى قواعد الأمان العادية)
          const supabaseAdmin = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
          );

          // جلب الرصيد الحالي للمستخدم
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("ping_credits")
            .eq("id", userId)
            .single();

          const currentCredits = profile?.ping_credits || 0;

          // إضافة الرصيد الجديد فوق الرصيد القديم
          await supabaseAdmin
            .from("profiles")
            .update({ ping_credits: currentCredits + creditsToAdd })
            .eq("id", userId);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }
});