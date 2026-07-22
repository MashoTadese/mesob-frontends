// ============================================================
// MESOB Sululta Branch - Service Requirements Data
// Each service has: requirements, processingTime, fee, steps
// ============================================================

export const SERVICE_REQUIREMENTS = {

  // ── WINDOW 1 ──
  'Resident ID Issuance': {
    requirements: [
      'Kebele ID card (original)',
      'Birth certificate or official baptism certificate',
      '2 recent passport-size photographs (white background)',
      'Proof of residence (utility bill or kebele letter)',
      'For minors: parent/guardian must be present with their own ID',
    ],
    processingTime: '1–3 business days',
    fee: 'Free',
    steps: ['Submit application at Window 1', 'Document verification', 'Photo capture', 'ID printing', 'Collection'],
    window: 'Fooddaa 1ffaa — Window 1',
  },
  'Job Seeker Registration & Card Issuance': {
    requirements: [
      'Original Kebele ID card',
      'Educational certificates (original + photocopy)',
      '2 passport-size photographs',
      'Completed registration form (available at window)',
    ],
    processingTime: 'Same day',
    fee: 'Free',
    steps: ['Fill registration form', 'Submit documents at Window 1', 'Verification', 'Card issuance'],
    window: 'Fooddaa 1ffaa — Window 1',
  },
  'Job Seeker Card Renewal': {
    requirements: [
      'Existing job seeker card (original)',
      'Valid Kebele ID',
      '1 recent passport-size photograph',
    ],
    processingTime: 'Same day',
    fee: 'Free',
    steps: ['Present existing card at Window 1', 'Verification', 'Card renewal'],
    window: 'Fooddaa 1ffaa — Window 1',
  },
  'New Customer Reception & Water Bill': {
    requirements: [
      'Valid government-issued ID',
      'Proof of property ownership or rental agreement',
      'Completed application form',
    ],
    processingTime: '1–2 business days',
    fee: 'As per tariff',
    steps: ['Submit application', 'Site verification', 'Connection approval', 'Bill issuance'],
    window: 'Fooddaa 1ffaa — Window 1',
  },
  'IMX Association Legal Status': {
    requirements: [
      'Association founding document',
      'List of founding members (minimum 5)',
      'Minutes of founding meeting',
      'Proposed bylaws/constitution',
      'IDs of all founding members',
    ],
    processingTime: '5–7 business days',
    fee: 'Service fee applies',
    steps: ['Submit documents at Window 1', 'Review by legal team', 'Approval', 'Certificate issuance'],
    window: 'Fooddaa 1ffaa — Window 1',
  },

  // ── WINDOW 2 ──
  'Community Health Insurance Issuance': {
    requirements: [
      'Family registration document',
      'Kebele ID for head of household',
      'List of all family members to be covered',
      '2 passport-size photographs of head of household',
      'Completed health insurance application form',
    ],
    processingTime: '1–2 business days',
    fee: 'Annual premium applies (by family size)',
    steps: ['Fill form at Window 2', 'Submit family documents', 'Premium payment', 'Card issuance'],
    window: 'Fooddaa 2ffaa — Window 2',
  },
  'Community Health Insurance Renewal': {
    requirements: [
      'Existing health insurance card',
      'Valid Kebele ID',
      'Updated family member list (if changed)',
    ],
    processingTime: 'Same day',
    fee: 'Annual premium applies',
    steps: ['Present card at Window 2', 'Verify membership', 'Pay renewal premium', 'Card update'],
    window: 'Fooddaa 2ffaa — Window 2',
  },
  'Support Letter for Traders - Market Linkage': {
    requirements: [
      'Valid trade license (photocopy)',
      'Business ID or Kebele ID',
      'Description of goods/services for market linkage',
      'Application letter addressed to the bureau',
    ],
    processingTime: '1–2 business days',
    fee: 'Free',
    steps: ['Submit application at Window 2', 'Review', 'Letter issuance'],
    window: 'Fooddaa 2ffaa — Window 2',
  },

  // ── WINDOW 3 ──
  'Various Complaints Handling': {
    requirements: [
      'Valid government-issued ID',
      'Written complaint letter (or fill form at window)',
      'Supporting evidence/documents (if any)',
      'Contact information for follow-up',
    ],
    processingTime: '3–7 business days',
    fee: 'Free',
    steps: ['Submit complaint at Window 3', 'Registration', 'Investigation', 'Response/resolution'],
    window: 'Fooddaa 3ffaa — Window 3',
  },
  'Infrastructure Support - Electricity, Road, Water': {
    requirements: [
      'Community/association representative ID',
      'Written request letter',
      'Location description or map sketch',
      'Support from local kebele (letter)',
    ],
    processingTime: '7–14 business days',
    fee: 'Free',
    steps: ['Submit request at Window 3', 'Site assessment', 'Approval', 'Project implementation'],
    window: 'Fooddaa 3ffaa — Window 3',
  },

  // ── WINDOW 4 ──
  'Teacher/School Manager Transfer': {
    requirements: [
      'Employment ID card',
      'Transfer request letter (personal)',
      'Letter of support from current school director',
      'Latest performance evaluation',
      'Completed transfer form',
    ],
    processingTime: '5–10 business days',
    fee: 'Free',
    steps: ['Submit application at Window 4', 'Review by education bureau', 'Approval', 'Transfer letter issuance'],
    window: 'Fooddaa 4ffaa — Window 4',
  },
  'Private Clinic License Issuance': {
    requirements: [
      'Professional medical license (original + copy)',
      'TIN certificate',
      'Premises ownership/rental agreement',
      'Health facility standard compliance certificate',
      '2 passport-size photographs',
      'Equipment list and specification',
    ],
    processingTime: '7–14 business days',
    fee: 'License fee applies',
    steps: ['Submit at Window 4', 'Site inspection', 'Standards verification', 'License issuance'],
    window: 'Fooddaa 4ffaa — Window 4',
  },
  'Private/NGO School License': {
    requirements: [
      'Company registration document or NGO certificate',
      'TIN certificate',
      'Building ownership/rental agreement',
      'Educational curriculum plan',
      'List of qualified teachers',
      'Facilities inspection report',
    ],
    processingTime: '10–15 business days',
    fee: 'License fee applies',
    steps: ['Submit at Window 4', 'Document review', 'Site inspection', 'Approval', 'License issuance'],
    window: 'Fooddaa 4ffaa — Window 4',
  },

  // ── WINDOW 5 ──
  'Health Professional Competence Certificate': {
    requirements: [
      'Professional degree/diploma (original + copy)',
      'Valid ID card',
      '2 recent passport-size photographs',
      'Previous competence certificate (for renewal)',
      'Professional license from Ministry of Health',
    ],
    processingTime: '3–5 business days',
    fee: 'Certificate fee applies',
    steps: ['Submit at Window 5', 'Document verification', 'Certificate issuance'],
    window: 'Fooddaa 5ffaa — Window 5',
  },
  'Construction Industry Competence Registration': {
    requirements: [
      'Professional degree/diploma in civil engineering or related field',
      'Valid employment ID or contractor registration',
      'Work experience certificate',
      '2 passport-size photographs',
    ],
    processingTime: '5–7 business days',
    fee: 'Registration fee applies',
    steps: ['Submit at Window 5', 'Qualification review', 'Registration', 'Certificate issuance'],
    window: 'Fooddaa 5ffaa — Window 5',
  },

  // ── WINDOW 6 ──
  'Trade License — New, Renewal, Amendment, Cancellation': {
    requirements: [
      'Valid ID card (Kebele or national ID)',
      'TIN (Tax Identification Number) certificate',
      'Premises ownership document or rental agreement',
      'Completed trade license application form',
      'For amendment: existing license original',
      'For renewal: previous license + tax clearance certificate',
      '2 recent passport-size photographs',
    ],
    processingTime: '3–5 business days',
    fee: 'License fee based on business type',
    steps: ['Submit application at Window 6', 'Document verification', 'Site inspection (if new)', 'Fee payment', 'License issuance'],
    window: 'Fooddaa 6ffaa — Window 6',
  },
  'Trade Name Registration': {
    requirements: [
      'Valid ID card',
      'TIN certificate',
      'Proposed business name (3 alternatives)',
      'Completed registration form',
    ],
    processingTime: '1–2 business days',
    fee: 'Registration fee applies',
    steps: ['Submit form at Window 6', 'Name availability check', 'Registration', 'Certificate issuance'],
    window: 'Fooddaa 6ffaa — Window 6',
  },
  'New Driving License': {
    requirements: [
      'Valid Kebele ID or national ID',
      'Medical fitness certificate (from approved health center)',
      'Completed driving school training certificate',
      '4 recent passport-size photographs (white background)',
      'Written exam pass certificate',
      'Practical driving test pass certificate',
    ],
    processingTime: '3–5 business days',
    fee: 'License fee applies',
    steps: ['Pass written exam', 'Pass practical test', 'Medical check', 'Submit documents at Window 6', 'License issuance'],
    window: 'Fooddaa 6ffaa — Window 6',
  },
  'Driving License Renewal': {
    requirements: [
      'Existing driving license (original)',
      'Valid ID card',
      'Medical fitness certificate (renewed)',
      '2 recent passport-size photographs',
    ],
    processingTime: '1–2 business days',
    fee: 'Renewal fee applies',
    steps: ['Submit at Window 6', 'Medical verification', 'Fee payment', 'License renewal'],
    window: 'Fooddaa 6ffaa — Window 6',
  },
  'Vehicle Deployment Permit': {
    requirements: [
      'Vehicle registration certificate (original)',
      'Valid insurance certificate',
      'Driver\'s valid driving license',
      'Route permit application form',
    ],
    processingTime: '1–3 business days',
    fee: 'Permit fee applies',
    steps: ['Submit at Window 6', 'Vehicle inspection', 'Permit issuance'],
    window: 'Fooddaa 6ffaa — Window 6',
  },

  // ── WINDOW 7 ──
  'Civil Document Registration': {
    requirements: [
      'Birth certificate or hospital delivery record',
      'Parents\' marriage certificate',
      'Parents\' valid IDs',
      'Completed registration form',
      'Witness/kebele confirmation letter',
    ],
    processingTime: '1–3 business days',
    fee: 'Free (first registration) / Small fee for late registration',
    steps: ['Submit at Window 7', 'Document verification', 'Registration', 'Certificate issuance'],
    window: 'Fooddaa 7ffaa — Window 7',
  },
  'Civil Document Authentication': {
    requirements: [
      'Original document to be authenticated',
      'Photocopy of the document',
      'Valid ID of the applicant',
      'Application form',
    ],
    processingTime: '1–2 business days',
    fee: 'Authentication fee applies',
    steps: ['Submit original + copy at Window 7', 'Verification', 'Authentication stamp', 'Document return'],
    window: 'Fooddaa 7ffaa — Window 7',
  },
  'Private Limited Company Establishment': {
    requirements: [
      'Memorandum and Articles of Association (notarized)',
      'List of shareholders with IDs',
      'TIN certificates of all shareholders',
      'Bank deposit evidence (initial capital)',
      'Proposed company name (3 alternatives)',
      'Business plan summary',
    ],
    processingTime: '5–7 business days',
    fee: 'Registration fee based on capital',
    steps: ['Submit at Window 7', 'Name reservation', 'Document review', 'Registration', 'Certificate issuance'],
    window: 'Fooddaa 7ffaa — Window 7',
  },
  'Small & Micro Enterprise Registration': {
    requirements: [
      'Valid ID cards of all members',
      'Signed membership agreement',
      'Business sector description',
      'List of founding members (minimum 5)',
      '2 passport-size photographs per member',
    ],
    processingTime: '3–5 business days',
    fee: 'Free',
    steps: ['Submit at Window 7', 'Review', 'Registration', 'Certificate issuance'],
    window: 'Fooddaa 7ffaa — Window 7',
  },
  'Loan Agreement Registration': {
    requirements: [
      'Both parties\' valid IDs',
      'Signed loan agreement document',
      'Collateral documentation (if applicable)',
      'Witness IDs (2 witnesses required)',
    ],
    processingTime: '1–2 business days',
    fee: 'Registration fee applies (% of loan amount)',
    steps: ['Both parties present at Window 7', 'Document review', 'Registration stamp', 'Copy to both parties'],
    window: 'Fooddaa 7ffaa — Window 7',
  },

  // ── WINDOW 8 ──
  'Investment License — New, Renewal, Replacement': {
    requirements: [
      'Valid ID card or company registration certificate',
      'TIN certificate',
      'Completed investment application form',
      'Business plan (for new license)',
      'Environmental impact assessment (for large projects)',
      'Land lease agreement (for applicable projects)',
      'For renewal: existing license + progress report',
    ],
    processingTime: '7–14 business days',
    fee: 'License fee based on investment category',
    steps: ['Submit at Window 8', 'Application review', 'Site/project assessment', 'Approval', 'License issuance'],
    window: 'Fooddaa 8ffaa — Window 8',
  },
  'Investment Incentive License': {
    requirements: [
      'Valid investment license',
      'TIN certificate',
      'Investment amount verification documents',
      'Employment plan showing local job creation',
      'Completed incentive application form',
    ],
    processingTime: '5–10 business days',
    fee: 'Free',
    steps: ['Submit at Window 8', 'Eligibility assessment', 'Incentive determination', 'Certificate issuance'],
    window: 'Fooddaa 8ffaa — Window 8',
  },
  'Environmental Impact Assessment': {
    requirements: [
      'Project description document',
      'Location/site map',
      'TOR (Terms of Reference) for the assessment',
      'Environmental consultant accreditation',
      'Community consultation records',
    ],
    processingTime: '14–30 business days',
    fee: 'Assessment fee applies',
    steps: ['Submit TOR at Window 8', 'TOR approval', 'Assessment conduct', 'Report review', 'Certificate issuance'],
    window: 'Fooddaa 8ffaa — Window 8',
  },

  // ── WINDOW 9 ──
  'Land Holding Card Registration & Issuance': {
    requirements: [
      'Valid ID card',
      'Previous land certificate or allocation document',
      'Kebele confirmation letter',
      'Land measurement/survey document',
      '2 passport-size photographs',
    ],
    processingTime: '5–10 business days',
    fee: 'Registration fee applies',
    steps: ['Submit at Window 9', 'Document verification', 'Site survey confirmation', 'Card issuance'],
    window: 'Fooddaa 9ffaa — Window 9',
  },
  'Name Transfer — Purchase/Sale, Gift, Inheritance': {
    requirements: [
      'Current land certificate (original)',
      'Both parties\' valid IDs (buyer and seller)',
      'Sales agreement or gift/inheritance documentation',
      'Tax clearance certificate',
      'Court order (for inheritance cases)',
      'Witness IDs (2 witnesses)',
    ],
    processingTime: '5–7 business days',
    fee: 'Transfer fee applies (% of property value)',
    steps: ['Both parties at Window 9', 'Document review', 'Tax clearance verification', 'Transfer processing', 'New certificate issuance'],
    window: 'Fooddaa 9ffaa — Window 9',
  },
  'Lease Agreement Registration / Renewal': {
    requirements: [
      'Valid land certificate',
      'Both parties\' valid IDs',
      'Signed lease agreement',
      'Site measurement document',
      'Lease fee payment receipt',
    ],
    processingTime: '3–5 business days',
    fee: 'Lease registration fee applies',
    steps: ['Submit at Window 9', 'Agreement verification', 'Registration', 'Certificate issuance'],
    window: 'Fooddaa 9ffaa — Window 9',
  },
  'Land Dispute Complaint Resolution': {
    requirements: [
      'Valid ID card',
      'Land certificate or claim documents',
      'Written dispute complaint',
      'Supporting evidence (photos, maps, witnesses)',
    ],
    processingTime: '10–30 business days',
    fee: 'Free',
    steps: ['File complaint at Window 9', 'Both parties notified', 'Investigation', 'Mediation/resolution', 'Decision issuance'],
    window: 'Fooddaa 9ffaa — Window 9',
  },
  'Digital Card Registration & Issuance': {
    requirements: [
      'Original land certificate',
      'Valid ID card',
      '2 passport-size photographs',
      'Completed digital registration form',
    ],
    processingTime: '3–5 business days',
    fee: 'Digitization fee applies',
    steps: ['Submit at Window 9', 'Document scanning', 'Digital verification', 'Digital card issuance'],
    window: 'Fooddaa 9ffaa — Window 9',
  },

  // ── WINDOW 10 ──
  'Tax Identification Number (TIN)': {
    requirements: [
      'Valid ID card (Kebele or national ID)',
      'Trade license or business registration certificate',
      'Completed TIN application form',
      '2 passport-size photographs',
      'Business premises address',
    ],
    processingTime: '1–2 business days',
    fee: 'Free',
    steps: ['Fill form at Window 10', 'Submit documents', 'TIN number issuance', 'TIN certificate printing'],
    window: 'Fooddaa 10ffaa — Window 10',
  },
  'Regular Revenue Collection': {
    requirements: [
      'TIN certificate',
      'Previous tax assessment notice',
      'Business records/receipts',
      'Bank statements (if applicable)',
    ],
    processingTime: 'Same day',
    fee: 'As assessed',
    steps: ['Present TIN and documents at Window 10', 'Tax calculation', 'Payment', 'Receipt issuance'],
    window: 'Fooddaa 10ffaa — Window 10',
  },
  'Debt Clearance Certificate': {
    requirements: [
      'Valid ID card',
      'TIN certificate',
      'All previous tax payment receipts',
      'Completed clearance application form',
    ],
    processingTime: '2–3 business days',
    fee: 'Certificate fee applies',
    steps: ['Submit at Window 10', 'Tax account review', 'Clearance verification', 'Certificate issuance'],
    window: 'Fooddaa 10ffaa — Window 10',
  },
  'Tax Assessment — VAT, TOT, Withholding': {
    requirements: [
      'TIN certificate',
      'Business financial records (monthly/annual)',
      'Sales invoices and receipts',
      'Import/export documents (if applicable)',
      'Previous assessment notice',
    ],
    processingTime: '3–5 business days',
    fee: 'As assessed',
    steps: ['Submit records at Window 10', 'Financial review', 'Tax computation', 'Assessment notice issuance', 'Payment'],
    window: 'Fooddaa 10ffaa — Window 10',
  },

  // ── WINDOW 11 ──
  'Compensation Payment Expert': {
    requirements: [
      'Valid ID card',
      'Court or government compensation order document',
      'Land/property valuation certificate',
      'Bank account details for transfer',
    ],
    processingTime: '5–10 business days',
    fee: 'Free (government-funded compensation)',
    steps: ['Submit order at Window 11', 'Verification', 'Payment processing', 'Payment receipt'],
    window: 'Fooddaa 11ffaa — Window 11',
  },
  'Procurement & Service Expert': {
    requirements: [
      'Valid ID or company registration',
      'Business license',
      'Tax clearance certificate',
      'Bid/quotation documents (as required)',
    ],
    processingTime: 'Per procurement timeline',
    fee: 'As per contract',
    steps: ['Submit at Window 11', 'Eligibility verification', 'Processing', 'Payment/service completion'],
    window: 'Fooddaa 11ffaa — Window 11',
  },
};

// Helper: get requirements by English service name
export const getRequirements = (serviceName) => {
  // Try direct match
  if (SERVICE_REQUIREMENTS[serviceName]) return SERVICE_REQUIREMENTS[serviceName];
  // Try partial match (extract English name from "Oromo (English)" format)
  const keys = Object.keys(SERVICE_REQUIREMENTS);
  for (const key of keys) {
    if (serviceName.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(serviceName.toLowerCase())) {
      return SERVICE_REQUIREMENTS[key];
    }
  }
  return null;
};
