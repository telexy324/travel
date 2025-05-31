export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Comment {
  id: string;
  attractionId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  rating: number;
  price: number;
  category: string;
  tags: string[];
}

export interface UserAttractionStatus {
  attractionId: string;
  status: 'visited' | 'wantToVisit';
}

export interface Store {
  user: User | null;
  attractions: Attraction[];
  userAttractionStatuses: UserAttractionStatus[];
  addUserAttractionStatus: (status: UserAttractionStatus) => void;
  setUser: (user: User | null) => void;
  setAttractions: (attractions: Attraction[]) => void;
} 