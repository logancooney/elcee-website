import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://shop.elceethealchemist.com/products.json?limit=8', {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return NextResponse.json({ products: [] }, { status: 200 });
  }

  const data = await res.json();
  return NextResponse.json({ products: data.products ?? [] });
}
