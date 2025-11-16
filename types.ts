export enum Page {
  HOME = 'HOME',
  MARKETPLACE = 'MARKETPLACE',
  DASHBOARD = 'DASHBOARD',
  LOGIN = 'LOGIN',
  SELLER_PROFILE = 'SELLER_PROFILE',
}

export enum Role {
    FARMER = 'Farmer',
    BUYER = 'Buyer',
    TRADER = 'Trader',
    VET = 'Vet',
    ADMIN = 'Admin',
}

export enum VerificationStatus {
    VERIFIED = 'Verified',
    PENDING = 'Pending',
    REJECTED = 'Rejected',
    NOT_SUBMITTED = 'Not Submitted',
}

export interface VerificationItem {
    id: string;
    title: string;
    status: VerificationStatus;
    description: string;
    actionText: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    isVerified: boolean; // Overall verification status
    rating: number;
    ratingCount: number;
    location: string;
}

export interface Cattle {
  id: string;
  breed: string;
  age: number;
  gender: 'Male' | 'Female';
  weight: number;
  price: number;
  imageUrl: string;
  isVerified: boolean;
  location: string;
  sellerId: string;
  healthRecords: HealthRecord[];
  videos?: string[];
  certificates?: string[];
  dateListed: string;
}

export interface HealthRecord {
    date: string;
    vaccine: string;
    notes: string;
    vet: string;
}

export interface ChartData {
  name: string;
  price: number;
  demand: number;
}

export interface Review {
  id: string;
  sellerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}