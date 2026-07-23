// ============================================================
// MESOB Branch Service Management System - Constants
// ============================================================

export const SITE_NAME = 'MESOB';
export const SITE_FULL_NAME = 'MESOB Branch Service Management System';
export const SITE_TAGLINE = 'Serving Citizens with Excellence';
export const SITE_DESCRIPTION =
  'A modern digital government service portal providing efficient, transparent, and accessible public services to citizens of Ethiopia.';

// Navigation links
export const NAV_LINKS = [
  { label: 'Home',          path: '/' },
  { label: 'About',         path: '/about' },
  { label: 'Services',      path: '/services' },
  { label: 'Organizations', path: '/organizations' },
  { label: 'Contact',       path: '/contact' },
];

// Statistics
export const STATISTICS = [
  { id: 1, value: '500+', label: 'Citizens Served', icon: 'FaUsers' },
  { id: 2, value: '180+',     label: 'Gov\'t Services', icon: 'FaConciergeBell' },
  { id: 3, value: '24+',      label: 'Organizations',   icon: 'FaBuilding' },
  { id: 4, value: '350+',     label: 'Employees',       icon: 'FaUserTie' },
];

// Organizations (federal institutions inside MESOB Sululta Branch)
export const ORGANIZATIONS = [
  { id: 1, name: 'Ethiopian Civil Service Commission', shortName: 'ECSC', description: 'Handles civil service registration, ID issuance, and employee administration for government workers.', services: ['National ID', 'Civil Registration', 'Employee Records'], icon: 'FaFileContract', color: 'primary' },
  { id: 2, name: 'Immigration & Nationality Service', shortName: 'INS', description: 'Processes passport applications, work permits, visas, and citizenship documentation for all citizens.', services: ['Passport', 'Work Permit', 'Visa Services'], icon: 'FaGlobe', color: 'blue' },
  { id: 3, name: 'Ethiopian Revenue & Customs Authority', shortName: 'ERCA', description: 'Manages tax registration, filing, payment, and compliance certificates for individuals and businesses.', services: ['Tax Registration', 'Tax Filing', 'Compliance Certificate'], icon: 'FaCoins', color: 'gold' },
  { id: 4, name: 'Trade & Industry Bureau', shortName: 'TIB', description: 'Handles business registration, trade licenses, investment certificates, and commercial permits.', services: ['Business License', 'Trade Registration', 'Investment Certificate'], icon: 'FaIndustry', color: 'purple' },
  { id: 5, name: 'Land Administration Authority', shortName: 'LAA', description: 'Manages land registration, title deed processing, urban development, and property documentation.', services: ['Land Certificate', 'Title Deed', 'Property Transfer'], icon: 'FaMapMarked', color: 'teal' },
  { id: 6, name: 'Legal & Notary Affairs Office', shortName: 'LNAO', description: 'Provides legal documentation, authentication, notary services, and official document apostille.', services: ['Document Authentication', 'Notary Service', 'Apostille'], icon: 'FaBalanceScale', color: 'red' },
  { id: 7, name: 'Social Security & Welfare Authority', shortName: 'SSWA', description: 'Handles pension registration, social benefit claims, disability services, and community support.', services: ['Pension', 'Social Benefits', 'Disability Services'], icon: 'FaHandsHelping', color: 'indigo' },
  { id: 8, name: 'Ethiopian Investment Commission', shortName: 'EIC', description: 'Supports investors with investment permits, incentives, and business establishment services.', services: ['Investment Permit', 'Business Setup', 'Incentive Registration'], icon: 'FaBriefcase', color: 'amber' },
];

// Services data (with window mapping)
export const SERVICES = [
  {
    id: 1,
    title: 'National ID',
    description: 'Apply for or renew your national identification card quickly and securely through our digital portal.',
    icon: 'FaIdCard',
    processingTime: '3–5 Business Days',
    department: 'Civil Registration',
    category: 'Identity',
    color: 'primary',
    window: 1,
    windowName: 'Fooddaa 1ffaa',
  },
  {
    id: 2,
    title: 'Passport Services',
    description: 'New passport applications, renewals, and emergency travel documents processed efficiently.',
    icon: 'FaPassport',
    processingTime: '7–10 Business Days',
    department: 'Immigration',
    category: 'Travel',
    color: 'blue',
    window: 7,
    windowName: 'Fooddaa 7ffaa',
  },
  {
    id: 3,
    title: 'Business License',
    description: 'Register your business and obtain necessary licenses to operate legally in Ethiopia.',
    icon: 'FaBriefcase',
    processingTime: '5–7 Business Days',
    department: 'Trade & Industry',
    category: 'Business',
    color: 'gold',
    window: 6,
    windowName: 'Fooddaa 6ffaa',
  },
  {
    id: 4,
    title: 'Civil Registration',
    description: 'Birth certificates, marriage certificates, death certificates, and vital records management.',
    icon: 'FaFileAlt',
    processingTime: '1–3 Business Days',
    department: 'Civil Registration',
    category: 'Registration',
    color: 'purple',
    window: 7,
    windowName: 'Fooddaa 7ffaa',
  },
  {
    id: 5,
    title: 'Tax Services',
    description: 'Tax registration, filing, payment, and compliance certificates for individuals and businesses.',
    icon: 'FaCalculator',
    processingTime: '2–4 Business Days',
    department: 'Revenue Authority',
    category: 'Finance',
    color: 'red',
    window: 10,
    windowName: 'Fooddaa 10ffaa',
  },
  {
    id: 6,
    title: 'Document Authentication',
    description: 'Official authentication and apostille services for public and private documents.',
    icon: 'FaStamp',
    processingTime: '1–2 Business Days',
    department: 'Legal Affairs',
    category: 'Legal',
    color: 'teal',
    window: 7,
    windowName: 'Fooddaa 7ffaa',
  },
  {
    id: 7,
    title: 'Land Certificate',
    description: 'Land ownership registration, title deed processing, and land-related documentation.',
    icon: 'FaMapMarkedAlt',
    processingTime: '10–15 Business Days',
    department: 'Land Administration',
    category: 'Property',
    color: 'amber',
    window: 9,
    windowName: 'Fooddaa 9ffaa',
  },
  {
    id: 8,
    title: 'Social Security',
    description: 'Pension registration, contribution tracking, and social benefit claim processing.',
    icon: 'FaShieldAlt',
    processingTime: '3–5 Business Days',
    department: 'Social Affairs',
    category: 'Welfare',
    color: 'indigo',
    window: 2,
    windowName: 'Fooddaa 2ffaa',
  },
];

// Departments data
export const DEPARTMENTS = [
  {
    id: 1,
    name: 'Civil Registration',
    description: 'Handles birth, marriage, death certificates, and national ID services for all citizens.',
    head: 'Ato Tesfaye Bekele',
    employees: 45,
    services: 6,
    icon: 'FaFileContract',
    color: 'primary',
  },
  {
    id: 2,
    name: 'Immigration & Nationality',
    description: 'Processes passport applications, work permits, visas, and citizenship documentation.',
    head: 'W/ro Selamawit Girma',
    employees: 38,
    services: 5,
    icon: 'FaGlobe',
    color: 'blue',
  },
  {
    id: 3,
    name: 'Trade & Industry',
    description: 'Business registration, trade licenses, investment certificates, and commercial permits.',
    head: 'Ato Dawit Hailu',
    employees: 52,
    services: 4,
    icon: 'FaIndustry',
    color: 'gold',
  },
  {
    id: 4,
    name: 'Revenue Authority',
    description: 'Tax collection, revenue management, and financial compliance services.',
    head: 'W/ro Hiwot Alemu',
    employees: 60,
    services: 5,
    icon: 'FaCoins',
    color: 'amber',
  },
  {
    id: 5,
    name: 'Land Administration',
    description: 'Land registration, title deeds, urban development, and property management.',
    head: 'Ato Mulugeta Tadesse',
    employees: 41,
    services: 4,
    icon: 'FaMapMarked',
    color: 'teal',
  },
  {
    id: 6,
    name: 'Legal Affairs',
    description: 'Legal documentation, authentication, notary services, and dispute resolution.',
    head: 'Ato Biniam Yohannes',
    employees: 29,
    services: 3,
    icon: 'FaBalanceScale',
    color: 'purple',
  },
  {
    id: 7,
    name: 'Social Affairs',
    description: 'Social welfare, pension administration, disability services, and community support.',
    head: 'W/ro Meron Assefa',
    employees: 35,
    services: 4,
    icon: 'FaHandsHelping',
    color: 'pink',
  },
  {
    id: 8,
    name: 'IT & Digital Services',
    description: 'Digital infrastructure, e-services management, and technology support for all departments.',
    head: 'Ato Natnael Kebede',
    employees: 22,
    services: 3,
    icon: 'FaLaptopCode',
    color: 'indigo',
  },
];

// Announcements data
export const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Online Appointment System Now Available',
    excerpt: 'Citizens can now book appointments online for all major services, reducing waiting times significantly.',
    date: '2026-06-28',
    category: 'Digital Services',
    image: null,
    isNew: true,
  },
  {
    id: 2,
    title: 'Extended Working Hours During Ramadan',
    excerpt: 'MESOB offices will operate extended hours to accommodate citizens during the holy month.',
    date: '2026-06-20',
    category: 'Office Hours',
    image: null,
    isNew: false,
  },
  {
    id: 3,
    title: 'New National ID System Rollout',
    excerpt: 'The upgraded biometric national ID system featuring enhanced security features is now operational.',
    date: '2026-06-15',
    category: 'National ID',
    image: null,
    isNew: false,
  },
  {
    id: 4,
    title: 'Mobile Service Units Deployed to Rural Areas',
    excerpt: 'MESOB has deployed 12 mobile service units to provide civil registration services in remote areas.',
    date: '2026-06-10',
    category: 'Outreach',
    image: null,
    isNew: false,
  },
  {
    id: 5,
    title: 'Partnership with Commercial Bank for Payment Services',
    excerpt: 'Citizens can now pay for government services at any Commercial Bank of Ethiopia branch.',
    date: '2026-06-05',
    category: 'Payments',
    image: null,
    isNew: false,
  },
  {
    id: 6,
    title: 'Free Legal Aid Clinics Every Friday',
    excerpt: 'Our Legal Affairs department offers free consultation sessions every Friday from 9 AM to 12 PM.',
    date: '2026-05-30',
    category: 'Legal',
    image: null,
    isNew: false,
  },
];

// Testimonials data
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Abebe Girma',
    role: 'Small Business Owner',
    location: 'Addis Ababa',
    comment:
      'Getting my business license used to take weeks. With MESOB\'s online system, I completed the entire process in 3 days. Remarkable improvement!',
    rating: 5,
    avatar: null,
  },
  {
    id: 2,
    name: 'Tigist Bekele',
    role: 'Teacher',
    location: 'Dire Dawa',
    comment:
      'The appointment booking system is a game changer. No more long queues. I booked my time slot and was served exactly when I arrived.',
    rating: 5,
    avatar: null,
  },
  {
    id: 3,
    name: 'Solomon Tadesse',
    role: 'Engineer',
    location: 'Bahir Dar',
    comment:
      'The staff are professional and the facilities are clean and modern. I renewed my passport without any hassle. Highly recommend.',
    rating: 4,
    avatar: null,
  },
  {
    id: 4,
    name: 'Hiwot Alemu',
    role: 'Nurse',
    location: 'Hawassa',
    comment:
      'MESOB has truly transformed how citizens interact with government services. The digital portal is easy to use even for those less familiar with technology.',
    rating: 5,
    avatar: null,
  },
];

// FAQ data
export const FAQS = [
  {
    id: 1,
    question: 'How do I book an appointment at MESOB?',
    answer:
      'You can book an appointment through our online Appointment Booking page. Select your desired service, choose an available date and time slot, provide your contact details, and confirm your booking. You will receive a confirmation SMS and email with your appointment details.',
  },
  {
    id: 2,
    question: 'What documents do I need to apply for a National ID?',
    answer:
      'To apply for a National ID, you need: your birth certificate or official baptism certificate, two recent passport-size photographs, proof of residence (utility bill or letter from kebele), and your Kebele ID card. For minors, a parent or guardian must accompany them with their own ID.',
  },
  {
    id: 3,
    question: 'How long does passport renewal take?',
    answer:
      'Standard passport renewal takes 7–10 business days. If you have urgent travel needs, express processing is available for an additional fee, typically completing in 2–3 business days. Emergency travel documents for urgent situations can sometimes be issued the same day.',
  },
  {
    id: 4,
    question: 'How can I check my queue status?',
    answer:
      'You can check your queue status in real time using our Queue Status page. Enter your queue number or appointment reference number to see your current position, estimated waiting time, and service window number.',
  },
  {
    id: 5,
    question: 'What are the working hours of MESOB offices?',
    answer:
      'MESOB offices are open Monday through Friday from 8:00 AM to 5:00 PM, and Saturday from 8:00 AM to 12:00 PM. Offices are closed on Sundays and public holidays. Some services are available 24/7 through our online portal.',
  },
  {
    id: 6,
    question: 'Can I pay service fees online?',
    answer:
      'Yes, we accept online payments through CBE Birr, Telebirr, and major debit/credit cards via our secure payment gateway. You can also pay in person at any MESOB office or at designated Commercial Bank of Ethiopia branches.',
  },
  {
    id: 7,
    question: 'How do I register a business in Ethiopia?',
    answer:
      'Business registration involves: completing the business registration form (online or in person), providing the required documents (ID, proposed business name, business plan summary, initial capital declaration), paying the registration fee, and collecting your business license. The process typically takes 5–7 business days.',
  },
];

// Contact information — defaults (overridden by admin panel via API)
export const CONTACT_INFO = {
  address: 'Sululta, Oromia, Ethiopia',
  phone: '+251 11 551 2345',
  phone2: '+251 11 551 6789',
  email: 'info@mesob.gov.et',
  emailSupport: 'support@mesob.gov.et',
  hours: 'Mon–Fri: 8:00 AM – 5:00 PM',
  hoursSat: 'Saturday: 8:00 AM – 12:00 PM',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.2!2d38.7744!3d9.1741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8!2sSululta!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set',
  social: {
    facebook: 'https://facebook.com/mesob',
    twitter:  'https://twitter.com/mesob',
    telegram: 'https://t.me/mesob',
    youtube:  'https://youtube.com/mesob',
  },
};

// Color map for dynamic color classes
export const COLOR_MAP = {
  primary: {
    bg: 'bg-primary-50',
    icon: 'text-primary',
    border: 'border-primary-200',
    badge: 'bg-primary-100 text-primary-700',
    button: 'bg-primary text-white hover:bg-primary-600',
  },
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    button: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  gold: {
    bg: 'bg-yellow-50',
    icon: 'text-yellow-600',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    button: 'bg-yellow-500 text-white hover:bg-yellow-600',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    button: 'bg-purple-600 text-white hover:bg-purple-700',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    button: 'bg-red-600 text-white hover:bg-red-700',
  },
  teal: {
    bg: 'bg-teal-50',
    icon: 'text-teal-600',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-700',
    button: 'bg-teal-600 text-white hover:bg-teal-700',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    button: 'bg-amber-500 text-white hover:bg-amber-600',
  },
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    border: 'border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-700',
    button: 'bg-indigo-600 text-white hover:bg-indigo-700',
  },
  pink: {
    bg: 'bg-pink-50',
    icon: 'text-pink-600',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
    button: 'bg-pink-600 text-white hover:bg-pink-700',
  },
};
