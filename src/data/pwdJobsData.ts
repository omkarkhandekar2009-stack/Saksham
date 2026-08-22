export interface PwDJob {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  relevance: string;
  category: string;
  deadline: string;
  source: string;
  applyUrl: string;
}

export function normalizeUrl(url: string): string {
  if (!url || url.trim() === '') return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export const pwdJobsData: PwDJob[] = [
  {
    id: "pwd-job-01",
    title: "Assistant Teacher (Sahayak Acharya) - JTAACCE",
    company: "JSSC (Govt of Jharkhand)",
    location: "Jharkhand (Multiple Districts)",
    workMode: "On-site",
    relevance: "PwD Specific (4% Horizontal Quota)",
    category: "Education",
    deadline: "Rolling",
    source: "JSSC Portal",
    applyUrl: "jssc.jharkhand.gov.in"
  },
  {
    id: "pwd-job-02",
    title: "Health Supervisor - JILCCE",
    company: "JSSC (Govt of Jharkhand)",
    location: "Jharkhand (Multiple Districts)",
    workMode: "On-site",
    relevance: "PwD Specific (4% Horizontal Quota)",
    category: "Healthcare",
    deadline: "Rolling",
    source: "JSSC Portal",
    applyUrl: "jssc.jharkhand.gov.in"
  },
  {
    id: "pwd-job-03",
    title: "Block Statistical Supervisor - JTGLCCE",
    company: "JSSC (Govt of Jharkhand)",
    location: "Jharkhand (Multiple Districts)",
    workMode: "On-site",
    relevance: "PwD Specific (4% Horizontal Quota)",
    category: "Administration",
    deadline: "Rolling",
    source: "JSSC Portal",
    applyUrl: "jssc.jharkhand.gov.in"
  },
  {
    id: "pwd-job-04",
    title: "Auditor - JTGLCCE",
    company: "JSSC (Govt of Jharkhand)",
    location: "Jharkhand (Multiple Districts)",
    workMode: "On-site",
    relevance: "PwD Specific (4% Horizontal Quota)",
    category: "Finance",
    deadline: "Rolling",
    source: "JSSC Portal",
    applyUrl: "jssc.jharkhand.gov.in"
  },
  {
    id: "pwd-job-05",
    title: "Assistant Entomologist - JTGLCCE",
    company: "JSSC (Govt of Jharkhand)",
    location: "Jharkhand (Multiple Districts)",
    workMode: "On-site",
    relevance: "PwD Specific (4% Horizontal Quota)",
    category: "Science",
    deadline: "Rolling",
    source: "JSSC Portal",
    applyUrl: "jssc.jharkhand.gov.in"
  },
  {
    id: "pwd-job-06",
    title: "Block Development Officer - Civil Services",
    company: "JPSC (Govt of Jharkhand)",
    location: "Jharkhand (Multiple Districts)",
    workMode: "On-site",
    relevance: "PwD Specific (4% Horizontal Quota)",
    category: "Civil Services",
    deadline: "Rolling",
    source: "JPSC Portal",
    applyUrl: "jpsc.gov.in"
  },
  {
    id: "pwd-job-07",
    title: "Police Superintendent - Civil Services",
    company: "JPSC (Govt of Jharkhand)",
    location: "Jharkhand (Multiple Districts)",
    workMode: "On-site",
    relevance: "PwD Specific (4% Horizontal Quota)",
    category: "Civil Services",
    deadline: "Rolling",
    source: "JPSC Portal",
    applyUrl: "jpsc.gov.in"
  },
  {
    id: "pwd-job-08",
    title: "Assistant Public Prosecutor (APP)",
    company: "JPSC (Govt of Jharkhand)",
    location: "Jharkhand (Multiple Districts)",
    workMode: "On-site",
    relevance: "PwD Specific (4% Horizontal Quota)",
    category: "Legal",
    deadline: "Rolling",
    source: "JPSC Portal",
    applyUrl: "jpsc.gov.in"
  },
  {
    id: "pwd-job-09",
    title: "Data Entry Operator (Special Recruitment Drive)",
    company: "Central Coalfields Limited (CCL)",
    location: "Ranchi, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific",
    category: "Administration",
    deadline: "Rolling",
    source: "CCL Careers",
    applyUrl: "centralcoalfields.in"
  },
  {
    id: "pwd-job-10",
    title: "Junior Clerk (Backlog Vacancies)",
    company: "Central Coalfields Limited (CCL)",
    location: "Ranchi, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific",
    category: "Administration",
    deadline: "Rolling",
    source: "CCL Careers",
    applyUrl: "centralcoalfields.in"
  },
  {
    id: "pwd-job-11",
    title: "Attendant cum Technician Trainee",
    company: "SAIL Bokaro Steel Plant",
    location: "Bokaro, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific (Quota)",
    category: "Manufacturing",
    deadline: "Rolling",
    source: "SAIL Careers",
    applyUrl: "sailcareers.com"
  },
  {
    id: "pwd-job-12",
    title: "Operator cum Technician Trainee",
    company: "SAIL Bokaro Steel Plant",
    location: "Bokaro, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific (Quota)",
    category: "Manufacturing",
    deadline: "Rolling",
    source: "SAIL Careers",
    applyUrl: "sailcareers.com"
  },
  {
    id: "pwd-job-13",
    title: "Management Trainee",
    company: "MECON Limited",
    location: "Ranchi, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific (Quota)",
    category: "Engineering",
    deadline: "Rolling",
    source: "MECON Careers",
    applyUrl: "meconlimited.co.in"
  },
  {
    id: "pwd-job-14",
    title: "Surveyor",
    company: "CMPDI",
    location: "Ranchi, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific (Quota)",
    category: "Engineering",
    deadline: "Rolling",
    source: "CMPDI Portal",
    applyUrl: "cmpdi.co.in"
  },
  {
    id: "pwd-job-15",
    title: "Skill Coordinator",
    company: "Jharkhand Skill Development Mission",
    location: "Ranchi, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific (Quota)",
    category: "Management",
    deadline: "Rolling",
    source: "JSDM Portal",
    applyUrl: "recruitment.jharkhand.gov.in"
  },
  {
    id: "pwd-job-16",
    title: "Administrative Assistant (Inclusive Hiring)",
    company: "Tata Steel",
    location: "Jamshedpur, Jharkhand",
    workMode: "On-site",
    relevance: "Explicitly Inclusive",
    category: "Administration",
    deadline: "Rolling",
    source: "Tata Steel",
    applyUrl: "tatasteel.com"
  },
  {
    id: "pwd-job-17",
    title: "Technical Trainee (Diversity Drive)",
    company: "Tata Motors",
    location: "Jamshedpur, Jharkhand",
    workMode: "On-site",
    relevance: "Explicitly Inclusive",
    category: "Manufacturing",
    deadline: "Rolling",
    source: "Tata Motors",
    applyUrl: "tatamotors.com"
  },
  {
    id: "pwd-job-18",
    title: "Operations Executive (eDAB Program)",
    company: "Flipkart",
    location: "Ranchi, Jharkhand",
    workMode: "On-site",
    relevance: "Explicitly Inclusive (eDAB is specifically for PwD)",
    category: "Logistics",
    deadline: "Rolling",
    source: "Flipkart Careers",
    applyUrl: "flipkartcareers.com"
  },
  {
    id: "pwd-job-19",
    title: "Banking Assistant (Clerical)",
    company: "State Bank of India (SBI)",
    location: "Jharkhand Branches",
    workMode: "On-site",
    relevance: "PwD Specific (Quota)",
    category: "Banking",
    deadline: "Rolling",
    source: "SBI Careers",
    applyUrl: "sbi.co.in/careers"
  },
  {
    id: "pwd-job-20",
    title: "Probationary Officer (IBPS PO)",
    company: "IBPS (Various Banks)",
    location: "Jharkhand Branches",
    workMode: "On-site",
    relevance: "PwD Specific (Quota)",
    category: "Banking",
    deadline: "Rolling",
    source: "IBPS Portal",
    applyUrl: "ibps.in"
  },
  {
    id: "pwd-job-21",
    title: "Office Assistant",
    company: "NCS Rojgar Mela",
    location: "Ranchi, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific",
    category: "Administration",
    deadline: "Rolling",
    source: "Jharkhandi Jobs",
    applyUrl: "jharkhandijobs.com"
  },
  {
    id: "pwd-job-22",
    title: "Various Vacancies (Differently Abled Drive)",
    company: "NCS Rojgar Mela",
    location: "Khunti, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific",
    category: "Multiple",
    deadline: "Rolling",
    source: "Jharkhandi Jobs",
    applyUrl: "jharkhandijobs.com"
  },
  {
    id: "pwd-job-23",
    title: "Trainer/Mobilizer",
    company: "Youth4Jobs",
    location: "Ranchi, Jharkhand",
    workMode: "Hybrid",
    relevance: "PwD Specific",
    category: "NGO / Training",
    deadline: "Rolling",
    source: "Youth4Jobs",
    applyUrl: "youth4jobs.org"
  },
  {
    id: "pwd-job-24",
    title: "Center Coordinator",
    company: "Sarthak Educational Trust",
    location: "Ranchi, Jharkhand",
    workMode: "On-site",
    relevance: "PwD Specific",
    category: "NGO",
    deadline: "Rolling",
    source: "Sarthak Trust",
    applyUrl: "sarthakindia.org"
  },
  {
    id: "pwd-job-25",
    title: "Field Officer",
    company: "Enable India",
    location: "Ranchi, Jharkhand",
    workMode: "Hybrid",
    relevance: "PwD Specific",
    category: "NGO",
    deadline: "Rolling",
    source: "Enable India",
    applyUrl: "enableindia.org"
  },
  {
    id: "pwd-job-26",
    title: "Customer Service Associate",
    company: "Amazon India",
    location: "Remote (Jharkhand Eligible)",
    workMode: "Remote",
    relevance: "Explicitly Inclusive",
    category: "Customer Support",
    deadline: "Rolling",
    source: "Amazon Jobs",
    applyUrl: "amazon.jobs"
  },
  {
    id: "pwd-job-27",
    title: "Accessibility Tester",
    company: "Microsoft India",
    location: "Remote (Jharkhand Eligible)",
    workMode: "Remote",
    relevance: "Explicitly Inclusive",
    category: "IT / Testing",
    deadline: "Rolling",
    source: "Microsoft Careers",
    applyUrl: "careers.microsoft.com"
  },
  {
    id: "pwd-job-28",
    title: "Accessibility Auditor",
    company: "BarrierBreak",
    location: "Remote (Jharkhand Eligible)",
    workMode: "Remote",
    relevance: "Explicitly Inclusive",
    category: "IT / Testing",
    deadline: "Rolling",
    source: "BarrierBreak",
    applyUrl: "barrierbreak.com"
  },
  {
    id: "pwd-job-29",
    title: "Content Writer",
    company: "Atypical Advantage",
    location: "Remote (Jharkhand Eligible)",
    workMode: "Remote",
    relevance: "PwD Specific",
    category: "Content Creation",
    deadline: "Rolling",
    source: "Atypical Advantage",
    applyUrl: "atypicaladvantage.in"
  },
  {
    id: "pwd-job-30",
    title: "Telecaller",
    company: "v-shesh",
    location: "Remote (Jharkhand Eligible)",
    workMode: "Remote",
    relevance: "PwD Specific",
    category: "Support",
    deadline: "Rolling",
    source: "v-shesh",
    applyUrl: "v-shesh.com"
  }
];
