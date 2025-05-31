export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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
  user: {
    name: string;
    avatar?: string;
  };
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  images: string[];
  location: Location;
  rating: number;
  price: number;
  category: string;
  tags: string[];
  comments: Comment[];
  wantToVisit: boolean;
  visited: boolean;
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