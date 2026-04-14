import { 
  LayoutGrid, Rocket, Cpu, Wallet, Building2, MapPin, 
  UtensilsCrossed, Sparkles, Dumbbell, Users, Landmark, 
  Milestone, Scale, UserPlus, HeartPulse, Zap, DoorOpen, 
  Plane, Heart, Dog, Rainbow, GraduationCap, Network,
  AlertTriangle, BookOpen, CloudSun, Briefcase, FileText,
  Compass, Music, History, Bike, Globe, MessageSquare
} from 'lucide-react';

export interface Section {
  id: string;
  title: string;
  icon: any;
  category: 'Basics' | 'Economy & Tech' | 'Living' | 'Lifestyle' | 'Practical';
}

export const GUIDE_SECTIONS: Section[] = [
  { id: 'welcome', title: 'Welcome — Why Hyderabad in 2026', icon: LayoutGrid, category: 'Basics' },
  { id: 'by-the-numbers', title: 'By the Numbers: Hyderabad at a Glance', icon: Milestone, category: 'Basics' },
  { id: 'economy', title: 'The Economy & Opportunity', icon: Wallet, category: 'Economy & Tech' },
  { id: 'startup-ecosystem', title: 'The Startup Ecosystem', icon: Rocket, category: 'Economy & Tech' },
  { id: 'ai-deep-tech', title: 'The AI & Deep Tech Scene', icon: Cpu, category: 'Economy & Tech' },
  { id: 'cost-of-living', title: 'Cost of Living — The Real Numbers', icon: Scale, category: 'Living' },
  { id: 'real-estate', title: 'Real Estate Guide: Buy vs Rent', icon: Building2, category: 'Living' },
  { id: 'neighbourhood-guide', title: 'Neighbourhood Guide for Tech People', icon: MapPin, category: 'Living' },
  { id: 'workspace', title: 'Workspace & Co-working', icon: DoorOpen, category: 'Economy & Tech' },
  { id: 'food-bible', title: 'The Food Bible', icon: UtensilsCrossed, category: 'Lifestyle' },
  { id: 'nightlife', title: 'Nightlife & Entertainment', icon: Music, category: 'Lifestyle' },
  { id: 'culture', title: 'Culture, Heritage & Things to Do', icon: History, category: 'Lifestyle' },
  { id: 'fitness', title: 'Fitness, Outdoors & Wellness', icon: Dumbbell, category: 'Lifestyle' },
  { id: 'communities', title: 'Communities & Social Life', icon: MessageSquare, category: 'Lifestyle' },
  { id: 'infrastructure', title: 'Infrastructure & Getting Around', icon: Compass, category: 'Practical' },
  { id: 'mega-projects', title: "What's Coming Next: Mega Projects", icon: Zap, category: 'Economy & Tech' },
  { id: 'hyd-vs-blr', title: 'Hyderabad vs. Bangalore Comparison', icon: Scale, category: 'Basics' },
  { id: 'people', title: 'People to Follow', icon: Users, category: 'Lifestyle' },
  { id: 'media', title: 'Books, Music & Media', icon: BookOpen, category: 'Lifestyle' },
  { id: 'practical', title: 'Practical Essentials', icon: Briefcase, category: 'Practical' },
  { id: 'downsides', title: 'The Honest Downsides', icon: AlertTriangle, category: 'Basics' },
  { id: 'academic', title: 'Academic & Research References', icon: GraduationCap, category: 'Practical' },
  { id: 'weather', title: 'Weather & Climate Guide', icon: CloudSun, category: 'Practical' },
  { id: 'legal', title: 'Startup Registration & Legal', icon: FileText, category: 'Practical' },
  { id: 'hiring', title: 'Hiring & Talent Landscape', icon: UserPlus, category: 'Economy & Tech' },
  { id: 'healthcare', title: 'Healthcare Guide', icon: HeartPulse, category: 'Practical' },
  { id: 'ev-sustainable', title: 'EV & Sustainable Transport', icon: Zap, category: 'Practical' },
  { id: 'co-living', title: 'Co-Living & PG Guide', icon: DoorOpen, category: 'Living' },
  { id: 'weekend-getaways', title: 'Weekend Getaways & Day Trips', icon: Plane, category: 'Lifestyle' },
  { id: 'dating-social', title: 'Dating & Social Scene', icon: Heart, category: 'Lifestyle' },
  { id: 'pet-friendly', title: 'Pet-Friendly Hyderabad', icon: Dog, category: 'Lifestyle' },
  { id: 'lgbtq-scene', title: 'LGBTQ+ Scene', icon: Rainbow, category: 'Lifestyle' },
  { id: 'international-schools', title: 'International Schools & Expat Guide', icon: Globe, category: 'Practical' },
  { id: 'founder-networking', title: 'Founder Networking & Communities', icon: Network, category: 'Economy & Tech' },
];
