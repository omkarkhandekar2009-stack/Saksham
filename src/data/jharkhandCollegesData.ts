export interface SpecialEducationInstitute {
  institution_name: string;
  institution_type: string;
  rci_code: string;
  disability_focus: string;
  courses_or_services: string;
  district: string;
  address: string;
  pincode?: string;
  phone?: string;
  email?: string;
  website?: string;
  // Ratings fields (optional, populated only if exact match exists)
  accessible_infrastructure_out_of_20?: number;
  digital_accessibility_out_of_20?: number;
  accessible_washrooms_out_of_20?: number;
  accessible_laboratory_and_learning_facilities_out_of_20?: number;
  emergency_and_support_services_out_of_20?: number;
  total_accessibility_rating_out_of_100?: number;
  rating_basis?: string;
}

export function normalizeWebsiteUrl(url?: string): string {
  if (!url || url.trim() === '') return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export const jharkhandCollegesData: SpecialEducationInstitute[] = [
  {
    institution_name: "Deepshikha Institute for Child Development & Mental Health",
    institution_type: "Special education and rehabilitation institute",
    rci_code: "JKH001",
    disability_focus: "Intellectual disability",
    courses_or_services: "D.Ed. Special Education (ID); other RCI-approved programmes",
    district: "Ranchi",
    address: "Ara Gate near Flyover, Mahilong, Tatisilway, Ranchi, Jharkhand",
    pincode: "835103",
    phone: "0651-2911480; 6203837172; 9304544256; 9334423789",
    email: "deepshikhainfo@gmail.com; lhila.sudha@gmail.com",
    website: "https://www.deepshikhaindia.org"
  },
  {
    institution_name: "Ranchi Institute of Neuro-Psychiatry & Allied Sciences (RINPAS)",
    institution_type: "Government rehabilitation and mental-health institute",
    rci_code: "JKH002",
    disability_focus: "Clinical psychology and mental health",
    courses_or_services: "M.Phil. Clinical Psychology",
    district: "Ranchi",
    address: "Kanke, Ranchi, Jharkhand",
    pincode: "834006",
    phone: "0651-2450303",
    website: "https://rinpas.nic.in"
  },
  {
    institution_name: "Central Institute of Psychiatry (CIP)",
    institution_type: "Government mental-health institute",
    rci_code: "JKH003",
    disability_focus: "Clinical psychology and mental health",
    courses_or_services: "M.Phil. Clinical Psychology",
    district: "Ranchi",
    address: "Kanke, Ranchi, Jharkhand",
    pincode: "834006",
    phone: "0651-2451113; 0651-2450704",
    email: "director@cipranchi.nic.in; dram_cip@rediffmail.com",
    website: "https://cipranchi.nic.in"
  },
  {
    institution_name: "JEEVAN",
    institution_type: "Special education institute",
    rci_code: "JKH004",
    disability_focus: "Intellectual and developmental disabilities",
    courses_or_services: "D.Ed. Special Education (IDD)",
    district: "Dhanbad",
    address: "Bastacolla, Dhansar, Dhanbad, Jharkhand",
    pincode: "828106",
    phone: "9934352294; 8825385077",
    email: "jeevan_ak@yahoo.co.in",
    website: "http://www.jeevan.jhar.in",
    accessible_infrastructure_out_of_20: 15,
    digital_accessibility_out_of_20: 8,
    accessible_washrooms_out_of_20: 14,
    accessible_laboratory_and_learning_facilities_out_of_20: 14,
    emergency_and_support_services_out_of_20: 16,
    total_accessibility_rating_out_of_100: 67,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "J.M. Institute of Speech & Hearing",
    institution_type: "Special education institute",
    rci_code: "JKH005",
    disability_focus: "Hearing impairment and intellectual disability",
    courses_or_services: "D.Ed. Special Education (HI/ID/IDD)",
    district: "Deoghar",
    address: "V.I.P. Chowk, Court Road, Deoghar, Jharkhand",
    phone: "0612-2264805; 9334112221",
    email: "jminstitute1@rediffmail.com; infor@jminstitute.com",
    website: "http://www.jminstitute.com"
  },
  {
    institution_name: "Dr. Rajendra Institute of Medical Sciences (RIMS)",
    institution_type: "Government medical institute / RCI study centre",
    rci_code: "JKH007",
    disability_focus: "Hearing and language services",
    courses_or_services: "Diploma in Hearing Language and Speech",
    district: "Ranchi",
    address: "Bariyatu, Ranchi, Jharkhand",
    pincode: "834009",
    phone: "0651-2542700; 0651-2541533",
    email: "santoshaslp@gmail.com",
    website: "https://www.rimsranchi.ac.in"
  },
  {
    institution_name: "Buddha Shaikshanik Vikas Parishad - Viklang Vikas Vidyalaya",
    institution_type: "Special education institute",
    rci_code: "JKH008",
    disability_focus: "Hearing impairment; autism; intellectual/developmental disability; visual impairment",
    courses_or_services: "D.Ed. Special Education (HI/ASD/IDD/VI)",
    district: "Jamtara",
    address: "Rajbari, P.O. Jamtara, District Jamtara, Jharkhand",
    pincode: "815351",
    phone: "0326-2311473; 7250792877; 8434722967; 7739958666",
    email: "jharkhand.bsvp@gmail.com; bsvp.jharkhand@yahoo.com"
  },
  {
    institution_name: "Institute of Special Education & Training (Gyan Jyoti School for Deaf & Dumb)",
    institution_type: "Special education institute",
    rci_code: "JKH009",
    disability_focus: "Hearing impairment and visual impairment",
    courses_or_services: "D.Ed. Special Education (HI/VI)",
    district: "Dhanbad",
    address: "Behind Town Hall, near Golf Ground, Dhanbad, Jharkhand",
    pincode: "826001",
    phone: "0326-2311473; 7739958666",
    email: "isetjharkhand@gmail.com"
  },
  {
    institution_name: "Deaf Dumb & M.R. Residential School Cum Resource Centre",
    institution_type: "Residential special school and training institute",
    rci_code: "JKH010",
    disability_focus: "Hearing impairment and intellectual/developmental disability",
    courses_or_services: "D.Ed. Special Education (HI/IDD)",
    district: "Godda",
    address: "Parsoti, P.O. Kathon, Poraiyahat, Godda, Jharkhand",
    pincode: "814133",
    phone: "06422-223800; 9431370676",
    email: "lvssgodda@yahoo.com",
    website: "http://www.lvss.org.in"
  },
  {
    institution_name: "Radhika Institute of Special Education (RISE)",
    institution_type: "Special education institute",
    rci_code: "JKH012",
    disability_focus: "Intellectual/developmental disability; hearing impairment; visual impairment",
    courses_or_services: "D.Ed./B.Ed. Special Education programmes",
    district: "Dhanbad",
    address: "Kharni More, Panchrukhi, G.T. Road, P.O. Bagdaha, P.S. Rajganj, Dhanbad, Jharkhand",
    pincode: "828113",
    phone: "0326-2311473; 9386369267",
    email: "risedhn@gmail.com"
  },
  {
    institution_name: "Prerna Trust",
    institution_type: "Special education institute",
    rci_code: "JKH013",
    disability_focus: "Intellectual and developmental disabilities",
    courses_or_services: "D.Ed. Special Education (IDD)",
    district: "Hazaribagh",
    address: "Co-operative Colony, near Old Check Post, Ranchi-Patna Road, Hazaribagh, Jharkhand",
    pincode: "825301",
    phone: "06546-251200; 9931579515"
  },
  {
    institution_name: "SPARSH Teachers Training Institute for Children with Special Needs",
    institution_type: "Special education institute",
    rci_code: "JKH016",
    disability_focus: "Intellectual and developmental disabilities",
    courses_or_services: "D.Ed. Special Education (IDD)",
    district: "Deoghar",
    address: "Shivganga, Matri Mandir, Bam Bam Baba Path, Deoghar, Jharkhand",
    pincode: "814112",
    phone: "9472162409; 9097968279",
    email: "sparsh.childconcern@gmail.com",
    accessible_infrastructure_out_of_20: 14,
    digital_accessibility_out_of_20: 8,
    accessible_washrooms_out_of_20: 13,
    accessible_laboratory_and_learning_facilities_out_of_20: 14,
    emergency_and_support_services_out_of_20: 16,
    total_accessibility_rating_out_of_100: 65,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "AASTHA Institute of Special Education (under IARSA)",
    institution_type: "Special education institute",
    rci_code: "JKH019",
    disability_focus: "Intellectual/developmental disability; hearing impairment; visual impairment",
    courses_or_services: "D.Ed. Special Education (IDD/HI/VI)",
    district: "Bokaro",
    address: "C/o Aastha Rehabilitation Centre, Dhori, near G.M. Office, P.O. Dhori, Bokaro, Jharkhand",
    pincode: "825102",
    phone: "9472180697",
    email: "aasthadmn2017@gmail.com"
  },
  {
    institution_name: "Composite Regional Centre for Skill Development Rehabilitation and Empowerment of Persons with Disabilities Ranchi",
    institution_type: "Government rehabilitation and special-education institute",
    rci_code: "JKH020",
    disability_focus: "Intellectual/developmental disability; Indian Sign Language; hearing and language services",
    courses_or_services: "D.Ed. Special Education (IDD); DISLI; DHLS",
    district: "Ranchi",
    address: "Near Namkum Block Office, Khijri, Nayatoli, Namkum, Ranchi, Jharkhand",
    phone: "0651-2260080; 8987632707",
    email: "crcranchi2020@gmail.com"
  },
  {
    institution_name: "J.M. Institute of Speech & Hearing Ranchi",
    institution_type: "Special education institute",
    rci_code: "JKH021",
    disability_focus: "Intellectual/developmental disability; hearing impairment",
    courses_or_services: "D.Ed. Special Education (IDD/HI)",
    district: "Ranchi",
    address: "Om Apartment, Flat 3B, opposite Hill Tank, Booty Road, Bariyatu, Ranchi, Jharkhand",
    pincode: "834009",
    phone: "9835484615; 9334112221",
    email: "jminstitute1@rediffmail.com; jminstitute.ranchi@gmail.com"
  }
];
