// ============================================================
// MESOB Branch Service Management System - Constants
// ============================================================

export const SITE_NAME = 'MESOB';
export const SITE_FULL_NAME = 'MESOB Branch Service Management System';
export const SITE_TAGLINE = 'Serving Citizens with Excellence';
export const SITE_DESCRIPTION =
  'A modern digital government service portal providing efficient, transparent, and accessible public services to citizens of Ethiopia.';

// Statistics
export const STATISTICS = [
  { id: 1, value: '500+', labelKey: 'stats.citizens',  icon: 'FaUsers' },
  { id: 2, value: '180+', labelKey: 'stats.services',  icon: 'FaConciergeBell' },
  { id: 3, value: '28+',  labelKey: 'stats.offices',   icon: 'FaBuilding' },
  { id: 4, value: '350+', labelKey: 'stats.employees', icon: 'FaUserTie' },
];

// Offices operating inside MESOB Sululta Branch
export const ORGANIZATIONS = [
  { id: 1,  name: 'Civil Registration Office',              nameOR: 'Galmeessa Siivilii',               nameAM: 'የሲቪል ምዝገባ ቢሮ',               shortName: 'CRO',   description: 'Handles civil registration, ID issuance, birth, marriage and death certificates.',          services: ['Civil ID', 'Birth Certificate', 'Marriage Certificate'],   icon: 'FaFileContract',  color: 'primary', logo: 'civil services.png' },
  { id: 2,  name: 'Drinking Water Office',                  nameOR: 'Dhaabbata Bishaan dhugaatii',       nameAM: 'የጠጣር ውሃ ቢሮ',                  shortName: 'DWO',   description: 'Manages water supply, new customer registration, and water bill services.',                services: ['Water Connection', 'Water Bill', 'Water Supply'],           icon: 'FaTint',          color: 'blue' },
  { id: 3,  name: 'CHUO',                                   nameOR: 'CHUO',                             nameAM: 'CHUO',                           shortName: 'CHUO',  description: 'Community Health and social welfare services for citizens.',                              services: ['Health Services', 'Social Support'],                        icon: 'FaHospital',      color: 'green', logo: 'CHUO.jpg' },
  { id: 4,  name: 'Social Affairs Office',                  nameOR: 'Hawaasummaa',                      nameAM: 'የማህበራዊ ጉዳዮች ቢሮ',             shortName: 'SAO',   description: 'Handles social welfare, community support, and association legal status services.',        services: ['Social Welfare', 'Community Support', 'Association Status'], icon: 'FaHandsHelping',  color: 'purple', logo: 'social affairs office.jpg' },
  { id: 5,  name: 'Trade Office',                           nameOR: 'Daldala',                          nameAM: 'የንግድ ቢሮ',                       shortName: 'TRD',   description: 'Issues and renews trade licenses, trade name registration and commercial permits.',       services: ['Trade License', 'Trade Name', 'Commercial Permit'],         icon: 'FaStore',         color: 'amber', logo: 'Trade  office.jpg' },
  { id: 6,  name: 'Water, Mining & Energy Office',          nameOR: 'Bishaan Albuudaa fi Inarjii',       nameAM: 'የውሃ፣ ማዕድን እና ኢነርጂ ቢሮ',       shortName: 'WME',   description: 'Manages water production, mining research, production licenses and energy services.',     services: ['Mining License', 'Water License', 'Energy Permit'],         icon: 'FaBolt',          color: 'yellow', logo: 'Energy and water office.png' },
  { id: 7,  name: 'Health Office',                          nameOR: 'Fayyaa',                           nameAM: 'የጤና ቢሮ',                        shortName: 'HLT',   description: 'Issues health professional certificates, clinic licenses and health inspection services.', services: ['Health Certificate', 'Clinic License', 'Health Inspection'], icon: 'FaMedkit',        color: 'red', logo: 'Health office.jpg' },
  { id: 8,  name: 'Administration Office',                  nameOR: 'W/Bulchiinsaa',                    nameAM: 'የአስተዳደር ቢሮ',                   shortName: 'ADM',   description: 'General administrative services, official letters, and government coordination.',         services: ['Admin Services', 'Official Letters', 'Coordination'],       icon: 'FaBuilding',      color: 'indigo', logo: 'Administration.jpg' },
  { id: 9,  name: 'PSMQN',                                  nameOR: 'PSMQN',                            nameAM: 'PSMQN',                          shortName: 'PSMQN', description: 'Public sector management and quality network services.',                                  services: ['Quality Services', 'Public Management'],                    icon: 'FaCog',           color: 'teal', logo: 'PSMQN.png' },
  { id: 10, name: 'Communication Office',                   nameOR: 'Koominikeeshinii',                 nameAM: 'የኮሙኒኬሽን ቢሮ',                  shortName: 'COM',   description: 'Handles audio/visual advertisement permits, billboard licenses and communication.',       services: ['Billboard License', 'Advertisement Permit', 'Media'],       icon: 'FaBroadcastTower',color: 'blue', logo: 'Communication.png' },
  { id: 11, name: 'Transport Office',                       nameOR: 'Geejjibaa',                        nameAM: 'የትራንስፖርት ቢሮ',                 shortName: 'TRP',   description: 'Processes driving licenses, vehicle registration, deployment permits and transfer.',      services: ['Driving License', 'Vehicle Registration', 'Route Permit'],  icon: 'FaCar',           color: 'primary', logo: 'Transportation.jpg' },
  { id: 12, name: 'Agriculture Office',                     nameOR: 'Qonna',                            nameAM: 'የግብርና ቢሮ',                      shortName: 'AGR',   description: 'Issues agricultural input licenses, veterinary permits, and farming licenses.',           services: ['Agri License', 'Veterinary Permit', 'Farming License'],     icon: 'FaSeedling',      color: 'green', logo: 'Agriculture office.png' },
  { id: 13, name: 'Finance Office',                         nameOR: 'M/Qopheessa',                      nameAM: 'የፋይናንስ ቢሮ',                    shortName: 'FIN',   description: 'Handles financial planning, budgeting, compensation payments and project payments.',      services: ['Budget Planning', 'Compensation Payment', 'Project Pay'],   icon: 'FaMoneyBillWave', color: 'amber' },
  { id: 14, name: 'Science & Technology Office',            nameOR: 'Saayinsii fi Teeknooloojii',        nameAM: 'የሳይንስ እና ቴክኖሎጂ ቢሮ',          shortName: 'STO',   description: 'Supports digital services, electronics licensing, network installation permits.',         services: ['Electronics License', 'Network Permit', 'Tech Support'],    icon: 'FaLaptopCode',    color: 'indigo', logo: 'Science and technology.png' },
  { id: 15, name: 'Construction Office',                    nameOR: 'Koonistraakshinii',                nameAM: 'የኮንስትራክሽን ቢሮ',               shortName: 'CON',   description: 'Issues construction competence certificates, building permits, design review services.',   services: ['Building Permit', 'Competence Certificate', 'Design Review'],icon: 'FaHardHat',       color: 'orange', logo: 'constraction.png' },
  { id: 16, name: 'Education Office',                       nameOR: 'Barnoota',                         nameAM: 'የትምህርት ቢሮ',                    shortName: 'EDU',   description: 'Handles school licenses, teacher transfers, and lost certificate replacement.',           services: ['School License', 'Teacher Transfer', 'Certificate Replace'], icon: 'FaGraduationCap', color: 'blue', logo: 'Education office.png' },
  { id: 17, name: 'Housing Office',                         nameOR: 'D/Manneenii',                      nameAM: 'የቤቶች ቢሮ',                      shortName: 'HOU',   description: 'Manages government house rent, repair permits, housing cooperative legal status.',        services: ['House Rent', 'Repair Permit', 'Cooperative Status'],        icon: 'FaHome',          color: 'teal', logo: 'House office.jpg' },
  { id: 18, name: 'Justice / Attorney Office',              nameOR: 'Abbaa Alangaa',                    nameAM: 'የፍትህ ቢሮ',                       shortName: 'JUS',   description: 'Handles legal affairs, dispute resolution, court-related services and notary.',          services: ['Legal Affairs', 'Dispute Resolution', 'Notary Services'],   icon: 'FaBalanceScale',  color: 'red', logo: 'justice attorney office.jpg' },
  { id: 19, name: 'Environmental Protection Authority',     nameOR: 'Abbaa Tayitaa Egumsa nannoo',      nameAM: 'የአካባቢ ጥበቃ ቢሮ',               shortName: 'EPA',   description: 'Approves environmental impact assessments, TOR and environmental audits.',               services: ['EIA Approval', 'TOR Approval', 'Environmental Audit'],      icon: 'FaLeaf',          color: 'green', logo: 'Environmental protection Authority.png' },
  { id: 20, name: 'Land Office',                            nameOR: 'Lafa',                             nameAM: 'የመሬት ቢሮ',                       shortName: 'LND',   description: 'Manages land holding cards, land dispute resolution, name transfer and lease registration.',services: ['Land Card', 'Land Dispute', 'Name Transfer', 'Lease'],    icon: 'FaMapMarked',     color: 'amber', logo: 'land.jpg' },
  { id: 21, name: 'Cadastre Office',                        nameOR: 'Kaadastara',                       nameAM: 'ካዳስትር ቢሮ',                     shortName: 'CAD',   description: 'Handles cadastre name transfer, digital card issuance and property records.',            services: ['Cadastre Transfer', 'Digital Card', 'Property Records'],    icon: 'FaMap',           color: 'purple' },
  { id: 22, name: 'Revenue Office',                         nameOR: 'Galii',                            nameAM: 'የገቢ ቢሮ',                        shortName: 'REV',   description: 'Collects taxes, TIN registration, VAT/TOT assessment and debt clearance certificates.',  services: ['TIN Registration', 'Tax Collection', 'Debt Clearance'],     icon: 'FaCoins',         color: 'primary', logo: 'Galii(revenue).png' },
  { id: 23, name: 'Buusa Gonnofaa (Cooperative) Office',    nameOR: 'Buusaa Gonnofaa',                  nameAM: 'የቡሳ ጎኖፋ ቢሮ',                  shortName: 'BGO',   description: 'Supports cooperative organizations, voluntary contributions and community savings.',       services: ['Cooperative Approval', 'Voluntary Contribution', 'Savings'], icon: 'FaHandshake',     color: 'teal', logo: 'coopeartive office(buusaa gonofaa).png' },
  { id: 24, name: 'Financial Services Office',              nameOR: 'Maallaqa',                         nameAM: 'የፋይናንስ አገልግሎት ቢሮ',           shortName: 'FSO',   description: 'Manages financial services, loans, compensation and procurement payments.',              services: ['Financial Services', 'Loans', 'Procurement Payments'],      icon: 'FaPiggyBank',     color: 'indigo', logo: 'Financial service.png' },
  { id: 25, name: 'Culture & Tourism Office',               nameOR: 'Aadaa fi Tuurizimii',                nameAM: 'የባህል እና ቱሪዝም ቢሮ',            shortName: 'CTR',   description: 'Issues cultural institution licenses, tourism permits and arts/culture services.',        services: ['Cultural License', 'Tourism Permit', 'Arts Services'],      icon: 'FaPaintBrush',    color: 'pink', logo: 'cultural and tourism.png' },
  { id: 26, name: 'Police Office',                          nameOR: 'Poolisii',                         nameAM: 'ፖሊስ',                           shortName: 'POL',   description: 'Handles security-related documentation, loss reports and legal authorization letters.',   services: ['Loss Report', 'Security Documents', 'Authorization'],       icon: 'FaShieldAlt',     color: 'blue', logo: 'police.jpg' },
  { id: 27, name: 'Investment Office',                      nameOR: 'Inveestimantii',                   nameAM: 'የኢንቨስትመንት ቢሮ',               shortName: 'INV',   description: 'Issues investment licenses, incentives, project agreements and expansion permits.',       services: ['Investment License', 'Investment Incentive', 'Project Expansion'], icon: 'FaChartLine', color: 'amber', logo: 'investement.png' },
];

export const COLOR_MAP = {
  primary: {
    bg: 'bg-primary-50',
    icon: 'text-primary',
    border: 'border-primary-200',
    badge: 'bg-primary-100 text-primary',
    button: 'bg-primary text-white hover:bg-primary-700',
  },
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    button: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    button: 'bg-green-600 text-white hover:bg-green-700',
  },
  yellow: {
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

export const CONTACT_INFO = {
  address:     'Sululta, Oromia, Ethiopia',
  phone:       '+251 11 551 2345',
  phone2:      '+251 11 551 6789',
  email:       'info@mesob.gov.et',
  hours:       'Mon–Fri: 2:00 AM – 11:00 PM',
  hoursSat:    'Saturday: 2:00 AM – 6:00 PM',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.1!2d38.7!3d9.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b1234!2sSululta!5e0!3m2!1sen!2set!4v1234567890',
  social: {
    facebook: 'https://facebook.com',
    twitter:  'https://twitter.com',
    telegram: 'https://t.me',
    youtube:  'https://youtube.com',
  },
};

export const FAQS = [
  {
    id: 1,
    question:   'What services are available at MESOB Sululta Branch?',
    questionAM: 'በMESOB ሱሉልታ ቅርንጫፍ ምን አገልግሎቶች ይገኛሉ?',
    questionOR: 'Tajaajilonni maal MESOB Sululta keessatti argamu?',
    answer:   'MESOB Sululta Branch offers 180+ government services across 11 service windows, including civil registration, trade licenses, land services, tax collection, investment services, and more.',
    answerAM: 'MESOB ሱሉልታ ቅርንጫፍ ከ11 የአገልግሎት ዊንዶዎች በ180+ አገልግሎቶች ያቀርባል። ሲቪል ምዝገባ፣ የንግድ ፈቃዶች፣ የመሬት አገልግሎቶች፣ ግብር፣ ኢንቨስትመንት እና ሌሎች አሉ።',
    answerOR: 'MESOB Sululta foddaalee tajaajilaa 11 irratti tajaajilota mootummaa 180+ ol dhiyeessa. Galmeessa siivil, hayyama daldala, tajaajila lafa, gibiraa, invastimantii fi kkf ni argamu.',
  },
  {
    id: 2,
    question:   'What are the working hours?',
    questionAM: 'የሥራ ሰዓት ስንት ነው?',
    questionOR: 'Sa\'aatiin hojii meeqa dha?',
    answer:   'Monday to Friday: 2:00 AM – 11:00 PM. Saturday: 2:00 AM – 6:00 PM.',
    answerAM: 'ሰኞ እስከ አርብ: 2:00 AM – 11:00 PM። ቅዳሜ: 2:00 AM – 6:00 PM። ',
    answerOR: 'Wiixata hanga Jimaata: 2:00 AM – 11:00 PM. Sanbata: 2:00 AM – 6:00 PM.',
  },
  {
    id: 3,
    question:   'Do I need an appointment?',
    questionAM: 'ቀጠሮ ያስፈልጋል?',
    questionOR: 'Beellama barbaachisaa dha?',
    answer:   'No appointment is needed. You can walk in during working hours. We operate on a first-come, first-served basis with a queue management system.',
    answerAM: 'ቀጠሮ አያስፈልግም። በሥራ ሰዓት ሊመጡ ይችላሉ። አገልግሎቱ በሰልፍ ሥርዓት (ቀደም ብሎ ለሚመጣ ቅድሚያ) ይሰጣል።',
    answerOR: 'Beellami hin barbaachisu. Sa\'aatii hojii keessatti seenuu dandeessa. Kan duraan dhufetu dursee tajaajilama.',
  },
  {
    id: 4,
    question:   'What documents do I need to bring?',
    questionAM: 'ምን ሰነዶች ማምጣት አለብኝ?',
    questionOR: 'Sanadoota maal fida?',
    answer:   'Required documents vary by service. Click on any service in the Services section to see the exact list of documents required for that specific service.',
    answerAM: 'አስፈላጊ ሰነዶች እንደ አገልግሎቱ ይለያያሉ። ለእያንዳንዱ አገልግሎት ምን ሰነዶች እንደሚያስፈልጉ ለማወቅ የአገልግሎቶቹን ክፍል ይጎብኙ።',
    answerOR: 'Sanadoota barbaachisan tajaajila hundaaf adda addaa. Tajaajila kamiyyuu cuqaasii sanadoota siif barbaachisan ilaaluu dandeessa.',
  },
  {
    id: 5,
    question:   'How long does it take to get a service?',
    questionAM: 'አገልግሎቱ ለማግኘት ምን ያህል ጊዜ ይወስዳል?',
    questionOR: 'Tajaajila argachuuf yeroo meeqa fudhata?',
    answer:   'Processing times vary by service type — from same-day to a few business days. Each service shows its estimated processing time when you view its details.',
    answerAM: 'የሂደት ጊዜ እንደ አገልግሎቱ ዓይነት ይለያያል — ከዕለቱ እስከ ጥቂት የሥራ ቀናት። እያንዳንዱ አገልግሎት ዝርዝሩን ሲያዩ ግምታዊ ጊዜ ያሳያል።',
    answerOR: 'Yeroon xumuraa tajaajila hunda adda addaa — guyyaa tokkoo hanga guyyaa hojii muraasaa. Tajaajila hundi yeroo itti dhumatu ni agarsiisa.',
  },
  {
    id: 6,
    question:   'Is there a fee for services?',
    questionAM: 'ለአገልግሎቶቹ ክፍያ አለ?',
    questionOR: 'Tajaajilootaaf kaffaltii ni jira?',
    answer:   'Some services are free while others have a small fee. The fee information is listed under each service in the Services section.',
    answerAM: 'አንዳንድ አገልግሎቶች ነፃ ሲሆኑ ሌሎቹ ደግሞ አነስተኛ ክፍያ አላቸው። የክፍያ መረጃ ለእያንዳንዱ አገልግሎት ዝርዝር ስር ይገኛል።',
    answerOR: 'Tajaajilota tokko tokko kaffaltii hin qaban, kan biroo ammoo kaffaltii xiqqoo qabu. Odeeffannoo kaffaltii tajaajila hunda jalatti argatta.',
  },
  {
    id: 7,
    question:   'How do I file a complaint?',
    questionAM: 'ቅሬታ እንዴት ማቅረብ እችላለሁ?',
    questionOR: 'Komii akkamitti dhiyeessuu danda\'a?',
    answer:   'You can submit a complaint directly through our website using the Complaint section, or visit Window 3 at the branch in person.',
    answerAM: 'ቅሬታዎን በድር ጣቢያው ቅሬታ ክፍል በቀጥታ ማቅረብ ወይም በቅርንጫፍ ዊንዶ 3 ሄደው ማቅረብ ይችላሉ።',
    answerOR: 'Komii kee marsariitii keenya irratti kallattiidhaan galchuu dandeessa, ykn Foddaa 3 damee MESOB Sululta daawwachuu dandeessa.',
  },
  {
    id: 8,
    question:   'Are services available in multiple languages?',
    questionAM: 'አገልግሎቶቹ በብዙ ቋንቋዎች ይሰጣሉ?',
    questionOR: 'Tajaajilonni afaan hedduutiin kennamu?',
    answer:   'Yes. MESOB Sululta Branch provides services in English, Amharic, and Afaan Oromo. Our website also supports all three languages.',
    answerAM: 'አዎ። MESOB ሱሉልታ ቅርንጫፍ አገልግሎቶቹን በእንግሊዝኛ፣ አማርኛ እና አፋን ኦሮሞ ያቀርባል። ድር ጣቢያውም ሦስቱን ቋንቋዎች ይደግፋል።',
    answerOR: 'Eeyyee. MESOB Sululta tajaajila Afaan Inglifaa, Amaariffaa fi Afaan Oromootiin dhiyeessa. Marsariitiin keenyas afaanota sadanuu ni deeggarti.',
  },
];
