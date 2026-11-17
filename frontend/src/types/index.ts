export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyFocusAreas: string[];
  benefits: string[];
  imageUrl: string;
  iconName: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Therapy Sessions' | 'Classrooms' | 'Sensory & Play' | 'Events & Activities';
  mediaType: 'image' | 'video';
  imageUrl: string;
  caption?: string;
}

export interface TestimonialItem {
  id: string;
  displayName: string;
  parentOf: string; // e.g. "Parent of 5-year-old in Speech Therapy"
  message: string;
  rating?: number;
  therapyType?: string;
}

export interface EnquiryFormData {
  parentName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  consent: boolean;
}

export interface AppointmentFormData {
  parentName: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  additionalMessage?: string;
}

