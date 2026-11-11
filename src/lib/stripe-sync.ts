import type { Course } from "@/lib/types";
import { saveStripeRefs } from "@/lib/courses-store";
import { stripeClient } from "@/lib/stripe";

function publicImage(course: Course) {
  const image = course.images[0];
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!image || !site) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${site}${image}`;
}

export async function syncCourseWithStripe(course: Course) {
  const stripe = stripeClient();
  if (!stripe) return course;

  const description = course.description.replace(/\s+/g, " ").trim().slice(0, 500);
  const image = publicImage(course);
  const details = {
    name: course.title.slice(0, 250),
    description: description || undefined,
    active: course.published,
  };

  try {
    let productId = course.stripeProductId;
    if (!productId) {
      const created = await stripe.products.create({
        ...details,
        images: image ? [image] : undefined,
        metadata: { courseId: course.id },
      });
      productId = created.id;
    } else {
      try {
        await stripe.products.update(productId, {
          ...details,
          images: image ? [image] : undefined,
        });
      } catch {
        await stripe.products.update(productId, details);
      }
    }

    let priceId = course.stripePriceId;
    if (course.priceCents && course.priceCents > 0) {
      let replace = !priceId;
      if (priceId) {
        const current = await stripe.prices.retrieve(priceId);
        replace = current.unit_amount !== course.priceCents || current.currency !== "eur" || !current.active;
      }
      if (replace) {
        const price = await stripe.prices.create({
          product: productId,
          currency: "eur",
          unit_amount: course.priceCents,
        });
        await stripe.products.update(productId, { default_price: price.id });
        if (priceId && priceId !== price.id) {
          await stripe.prices.update(priceId, { active: false });
        }
        priceId = price.id;
      }
    }

    if (productId === course.stripeProductId && priceId === course.stripePriceId) {
      return { ...course, stripeProductId: productId, stripePriceId: priceId };
    }
    return (await saveStripeRefs(course.id, productId, priceId)) ?? course;
  } catch (error) {
    console.error("stripe course sync failed", error);
    return course;
  }
}

export async function archiveCourseInStripe(course: Course) {
  const stripe = stripeClient();
  if (!stripe || !course.stripeProductId) return;
  try {
    await stripe.products.update(course.stripeProductId, { active: false });
  } catch {
    // The course is still removed locally when Stripe cannot be reached.
  }
}
