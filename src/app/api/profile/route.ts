import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes (in production, use a database)
let userProfile: UserProfile | null = null;

export interface UserProfile {
  id: string;
  courses: string[];
  availability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
  studyStyle: string;
  updatedAt: string;
}

export async function GET() {
  try {
    if (!userProfile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courses, availability, studyStyle } = body;

    // Validation
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      return NextResponse.json(
        { error: 'At least one course is required' },
        { status: 400 }
      );
    }

    if (!availability || typeof availability !== 'object') {
      return NextResponse.json(
        { error: 'Availability is required' },
        { status: 400 }
      );
    }

    if (!studyStyle || typeof studyStyle !== 'string') {
      return NextResponse.json(
        { error: 'Study style is required' },
        { status: 400 }
      );
    }

    // Save profile
    userProfile = {
      id: 'user-1', // In production, use actual user ID
      courses: courses.filter(course => course.trim() !== ''),
      availability,
      studyStyle,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(userProfile, { status: 201 });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { courses, availability, studyStyle } = body;

    if (!userProfile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Validation (same as POST)
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      return NextResponse.json(
        { error: 'At least one course is required' },
        { status: 400 }
      );
    }

    if (!availability || typeof availability !== 'object') {
      return NextResponse.json(
        { error: 'Availability is required' },
        { status: 400 }
      );
    }

    if (!studyStyle || typeof studyStyle !== 'string') {
      return NextResponse.json(
        { error: 'Study style is required' },
        { status: 400 }
      );
    }

    // Update profile
    userProfile = {
      ...userProfile,
      courses: courses.filter(course => course.trim() !== ''),
      availability,
      studyStyle,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}