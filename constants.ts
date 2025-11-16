import { Cattle, ChartData, User, Role, Review } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Ali Farms', email: 'ali@farms.com', role: Role.FARMER, isVerified: true, rating: 4.8, ratingCount: 120, location: 'Punjab, PK' },
  { id: 'u2', name: 'Fatima Dairy', email: 'fatima@dairy.com', role: Role.FARMER, isVerified: true, rating: 4.9, ratingCount: 88, location: 'Sindh, PK' },
  { id: 'u3', name: 'Chaudhry Cattle', email: 'chaudhry@cattle.com', role: Role.TRADER, isVerified: false, rating: 4.5, ratingCount: 32, location: 'Bahawalpur, PK' },
  { id: 'u4', name: 'Khan Livestock', email: 'khan@livestock.com', role: Role.FARMER, isVerified: true, rating: 4.7, ratingCount: 150, location: 'Attock, PK' },
  { id: 'u5', name: 'Waraich Farms', email: 'waraich@farms.com', role: Role.FARMER, isVerified: true, rating: 5.0, ratingCount: 45, location: 'Faisalabad, PK' },
  { id: 'u6', name: 'Mountain Traders', email: 'mountain@traders.com', role: Role.TRADER, isVerified: false, rating: 4.2, ratingCount: 15, location: 'KPK, PK' },
  { id: 'u7', name: 'Dr. Ayesha Khan', email: 'drayesha@vet.com', role: Role.VET, isVerified: true, rating: 4.9, ratingCount: 210, location: 'Lahore, PK' },
];


export const MOCK_CATTLE_DATA: Cattle[] = [
  {
    id: 'c1',
    breed: 'Sahiwal Bull',
    age: 3,
    gender: 'Male',
    weight: 450,
    price: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1628038162230-19283f58e612?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    isVerified: true,
    location: 'Punjab, PK',
    sellerId: 'u1',
    dateListed: '2024-07-20T10:00:00Z',
    healthRecords: [
        { date: '2023-01-15', vaccine: 'FMDV', notes: 'Booster shot', vet: 'Dr. Ahmad' },
        { date: '2022-07-20', vaccine: 'HS', notes: 'Annual vaccination', vet: 'Dr. Ahmad' },
    ]
  },
  {
    id: 'c2',
    breed: 'Cholistani Cow',
    age: 4,
    gender: 'Female',
    weight: 380,
    price: 220000,
    imageUrl: 'https://images.unsplash.com/photo-1590211580892-349f280a22f4?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    isVerified: true,
    location: 'Sindh, PK',
    sellerId: 'u2',
    dateListed: '2024-07-18T14:30:00Z',
    healthRecords: [
        { date: '2023-03-10', vaccine: 'FMDV', notes: 'Routine checkup', vet: 'Dr. Sara' },
    ]
  },
  {
    id: 'c3',
    breed: 'Red Sindhi',
    age: 2.5,
    gender: 'Female',
    weight: 350,
    price: 190000,
    imageUrl: 'https://images.unsplash.com/photo-1620251212821-273515436e84?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    isVerified: false,
    location: 'Bahawalpur, PK',
    sellerId: 'u3',
    dateListed: '2024-07-21T09:00:00Z',
    healthRecords: []
  },
  {
    id: 'c4',
    breed: 'Dhanni Bull',
    age: 3.5,
    gender: 'Male',
    weight: 500,
    price: 280000,
    imageUrl: 'https://images.unsplash.com/photo-1629231877461-73a775f0f081?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    isVerified: true,
    location: 'Attock, PK',
    sellerId: 'u4',
    dateListed: '2024-06-30T11:00:00Z',
    healthRecords: [
        { date: '2023-02-01', vaccine: 'FMDV', notes: 'All clear', vet: 'Dr. Khan' },
        { date: '2022-08-11', vaccine: 'BQ', notes: 'Pre-season shot', vet: 'Dr. Khan' },
    ]
  },
   {
    id: 'c5',
    breed: 'Nili-Ravi Buffalo',
    age: 5,
    gender: 'Female',
    weight: 600,
    price: 350000,
    imageUrl: 'https://images.unsplash.com/photo-1598207951439-d379b363a436?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    isVerified: true,
    location: 'Faisalabad, PK',
    sellerId: 'u5',
    dateListed: '2024-07-15T18:00:00Z',
    healthRecords: [
        { date: '2023-05-01', vaccine: 'FMDV', notes: 'Excellent health', vet: 'Dr. Fatima' },
    ]
  },
  {
    id: 'c6',
    breed: 'Siri',
    age: 2,
    gender: 'Male',
    weight: 320,
    price: 180000,
    imageUrl: 'https://images.unsplash.com/photo-1605039207211-394901f4657a?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    isVerified: false,
    location: 'KPK, PK',
    sellerId: 'u6',
    dateListed: '2024-07-22T12:00:00Z',
    healthRecords: []
  },
  {
    id: 'c7',
    breed: 'Cholistani Bull',
    age: 4,
    gender: 'Male',
    weight: 520,
    price: 310000,
    imageUrl: 'https://images.unsplash.com/photo-1629631526938-693255655736?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    isVerified: true,
    location: 'Cholistan, PK',
    sellerId: 'u1',
    dateListed: '2024-07-23T10:00:00Z',
    healthRecords: [
        { date: '2023-04-10', vaccine: 'FMDV', notes: 'Booster shot given', vet: 'Dr. Ahmad' },
    ]
  },
  {
    id: 'c8',
    breed: 'Lohani Cow',
    age: 3,
    gender: 'Female',
    weight: 340,
    price: 185000,
    imageUrl: 'https://images.unsplash.com/photo-1620714392439-7243a5c68991?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3',
    isVerified: false,
    location: 'Loralai, PK',
    sellerId: 'u6',
    dateListed: '2024-07-24T11:30:00Z',
    healthRecords: []
  },
];

export const MARKET_TRENDS_DATA: ChartData[] = [
    { name: 'Jan', price: 210000, demand: 2400 },
    { name: 'Feb', price: 225000, demand: 2210 },
    { name: 'Mar', price: 215000, demand: 2290 },
    { name: 'Apr', price: 230000, demand: 2000 },
    { name: 'May', price: 245000, demand: 2181 },
    { name: 'Jun', price: 260000, demand: 2500 },
    { name: 'Jul', price: 280000, demand: 2100 },
];

export const MOCK_REVIEWS: Review[] = [
    { id: 'r1', sellerId: 'u1', reviewerName: 'Ibrahim K.', rating: 5, comment: 'Excellent bull, exactly as described. Very healthy and strong. Ali Farms is a trustworthy seller.', date: '2024-07-25' },
    { id: 'r2', sellerId: 'u1', reviewerName: 'Zainab T.', rating: 4, comment: 'Good communication and smooth transaction. The delivery was on time. Would buy again.', date: '2024-07-12' },
    { id: 'r3', sellerId: 'u2', reviewerName: 'Bilal M.', rating: 5, comment: 'Fatima Dairy provides top-quality animals. The cow I bought is a great milker. Highly recommended!', date: '2024-07-20' },
    { id: 'r4', sellerId: 'u4', reviewerName: 'Ayesha J.', rating: 5, comment: 'Khan Livestock is the best! Very professional and honest people. The Dhanni bull is magnificent.', date: '2024-07-05' },
    { id: 'r5', sellerId: 'u4', reviewerName: 'Usman R.', rating: 4, comment: 'The animal was healthy and the records were accurate. The price was fair.', date: '2024-06-28' },
    { id: 'r6', sellerId: 'u5', reviewerName: 'Saad A.', rating: 5, comment: 'Perfect animal, perfect service. Waraich Farms are true professionals.', date: '2024-07-18' },
];