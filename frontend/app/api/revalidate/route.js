import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const POST = async (request) => {
  try {
    const { tags } = await request.json();
    
    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: "Invalid tags provided" },
        { status: 400 }
      );
    }

    tags.forEach(tag => revalidateTag(tag));
    return NextResponse.json({ 
      revalidated: true, 
      message: `Revalidated tags: ${tags.join(', ')}`
    });
    
  } catch (err) {
    return NextResponse.json(
      { error: "Error revalidating", details: err.message },
      { status: 500 }
    );
  }
};