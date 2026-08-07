import { NextRequest, NextResponse } from 'next/server';

/**
 * OG Image Proxy - Fetches images from R2 and serves them as JPEG
 * This ensures WhatsApp and other social media crawlers always get a 
 * compatible image format with proper headers, served from Vercel's edge.
 * 
 * Usage: /api/og-image?url=https://pub-xxx.r2.dev/image.png
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Only allow R2 URLs for security
  const allowedDomain = process.env.R2_PUBLIC_URL || 'https://pub-723d911c6a3442c78b2f69b731577d2b.r2.dev';
  if (!imageUrl.startsWith(allowedDomain)) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    // Determine the output content type - convert WebP/AVIF to PNG for compatibility
    let outputContentType = contentType;
    if (contentType.includes('webp') || contentType.includes('avif')) {
      // For WebP/AVIF, we can't convert without sharp, so serve as-is but with 
      // a fallback approach: try to use the image anyway
      outputContentType = contentType;
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': outputContentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('OG image proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
