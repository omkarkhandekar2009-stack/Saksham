export interface SpecialSchool {
  institution_name: string;
  institution_type: string;
  disability_focus: string;
  district: string;
  address: string;
  pincode?: string;
  phone?: string;
  email?: string;
  website?: string;
  // Ratings fields
  accessible_infrastructure_out_of_20: number;
  digital_accessibility_out_of_20: number;
  accessible_washrooms_out_of_20: number;
  accessible_laboratory_and_learning_facilities_out_of_20: number;
  emergency_and_support_services_out_of_20: number;
  total_accessibility_rating_out_of_100: number;
  rating_basis: string;
}

export const jharkhandSchoolsData: SpecialSchool[] = [
  {
    institution_name: "JEEVAN",
    institution_type: "Special school / rehabilitation centre",
    disability_focus: "Special education and rehabilitation",
    district: "Dhanbad",
    address: "Bastacola, Gaushala More, opposite Gayatri Mandir, Ambedkar Statue Road, Dhansar, Dhanbad, Jharkhand",
    pincode: "828106",
    phone: "0326-2291537; 9934352294; 9931188165",
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
    institution_name: "UDDHAR Rehabilitation Training & Research Centre for the Handicapped",
    institution_type: "Special school / rehabilitation centre",
    disability_focus: "Special education and rehabilitation",
    district: "Ranchi",
    address: "Quarter B/205/1, Dhurwa, Ranchi, Jharkhand",
    pincode: "834004",
    accessible_infrastructure_out_of_20: 13,
    digital_accessibility_out_of_20: 5,
    accessible_washrooms_out_of_20: 12,
    accessible_laboratory_and_learning_facilities_out_of_20: 13,
    emergency_and_support_services_out_of_20: 15,
    total_accessibility_rating_out_of_100: 58,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Vani Vikas",
    institution_type: "Special school",
    disability_focus: "Special education",
    district: "Ranchi",
    address: "148 H.B. Road, opposite Arya Hostel, Lalpur, Ranchi, Jharkhand",
    pincode: "834001",
    accessible_infrastructure_out_of_20: 12,
    digital_accessibility_out_of_20: 4,
    accessible_washrooms_out_of_20: 11,
    accessible_laboratory_and_learning_facilities_out_of_20: 12,
    emergency_and_support_services_out_of_20: 14,
    total_accessibility_rating_out_of_100: 53,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Samarpan Institute for Mentally Retarded Children",
    institution_type: "Special school",
    disability_focus: "Intellectual disability",
    district: "Dhanbad",
    address: "1 Club Market, Luby Circular Road, Dhanbad, Jharkhand",
    pincode: "826001",
    accessible_infrastructure_out_of_20: 13,
    digital_accessibility_out_of_20: 4,
    accessible_washrooms_out_of_20: 12,
    accessible_laboratory_and_learning_facilities_out_of_20: 13,
    emergency_and_support_services_out_of_20: 15,
    total_accessibility_rating_out_of_100: 57,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Sanjeevni Gram Trust",
    institution_type: "Special school / rehabilitation organisation",
    disability_focus: "Special education and rehabilitation",
    district: "Ranchi",
    address: "21 Ashok Bhawan, Kali Asthan Road, Ranchi, Jharkhand",
    pincode: "834001",
    accessible_infrastructure_out_of_20: 12,
    digital_accessibility_out_of_20: 5,
    accessible_washrooms_out_of_20: 11,
    accessible_laboratory_and_learning_facilities_out_of_20: 12,
    emergency_and_support_services_out_of_20: 14,
    total_accessibility_rating_out_of_100: 54,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Jagat Gyan Sarowar Santhan",
    institution_type: "Special school / rehabilitation organisation",
    disability_focus: "Special education",
    district: "Ranchi",
    address: "Piska Nagri, District Ranchi, Jharkhand",
    accessible_infrastructure_out_of_20: 11,
    digital_accessibility_out_of_20: 3,
    accessible_washrooms_out_of_20: 10,
    accessible_laboratory_and_learning_facilities_out_of_20: 11,
    emergency_and_support_services_out_of_20: 13,
    total_accessibility_rating_out_of_100: 48,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Shreejan",
    institution_type: "Special school / rehabilitation organisation",
    disability_focus: "Special education",
    district: "Ranchi",
    address: "Quarter B-3, 508(T), Dhurwa, Ranchi, Jharkhand",
    accessible_infrastructure_out_of_20: 11,
    digital_accessibility_out_of_20: 3,
    accessible_washrooms_out_of_20: 10,
    accessible_laboratory_and_learning_facilities_out_of_20: 11,
    emergency_and_support_services_out_of_20: 13,
    total_accessibility_rating_out_of_100: 48,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Srijak Samuh",
    institution_type: "Special school / rehabilitation organisation",
    disability_focus: "Special education",
    district: "Deoghar",
    address: "Williams Town, Rani Kothi, Deoghar, Jharkhand",
    pincode: "814112",
    accessible_infrastructure_out_of_20: 12,
    digital_accessibility_out_of_20: 4,
    accessible_washrooms_out_of_20: 11,
    accessible_laboratory_and_learning_facilities_out_of_20: 12,
    emergency_and_support_services_out_of_20: 14,
    total_accessibility_rating_out_of_100: 53,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Jeevan Jyoti",
    institution_type: "Special school",
    disability_focus: "Special education for children with disabilities",
    district: "Dhanbad",
    address: "Zila Parishad Building, Bekarbandh, Dhanbad, Jharkhand",
    pincode: "826001",
    phone: "0326-2313142; 9835142221; 9430755422",
    accessible_infrastructure_out_of_20: 14,
    digital_accessibility_out_of_20: 6,
    accessible_washrooms_out_of_20: 13,
    accessible_laboratory_and_learning_facilities_out_of_20: 14,
    emergency_and_support_services_out_of_20: 16,
    total_accessibility_rating_out_of_100: 63,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Bhawishya Kiran Parivaar",
    institution_type: "Special school / rehabilitation organisation",
    disability_focus: "Special education",
    district: "Ramgarh",
    address: "Bundel Bhawan, Naisarai Chowk, Ramgarh, Jharkhand",
    pincode: "829122",
    phone: "9431535390; 7209773700",
    accessible_infrastructure_out_of_20: 13,
    digital_accessibility_out_of_20: 5,
    accessible_washrooms_out_of_20: 12,
    accessible_laboratory_and_learning_facilities_out_of_20: 13,
    emergency_and_support_services_out_of_20: 15,
    total_accessibility_rating_out_of_100: 58,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "Manav Seva Ashram",
    institution_type: "Special school / rehabilitation organisation",
    disability_focus: "Special education and rehabilitation",
    district: "Bokaro",
    address: "Mahato Nagar, Talidia Road, Chas, Bokaro, Jharkhand",
    pincode: "827013",
    phone: "8987763834",
    email: "ashrammanaveseva@gmail.com",
    accessible_infrastructure_out_of_20: 13,
    digital_accessibility_out_of_20: 6,
    accessible_washrooms_out_of_20: 12,
    accessible_laboratory_and_learning_facilities_out_of_20: 13,
    emergency_and_support_services_out_of_20: 15,
    total_accessibility_rating_out_of_100: 59,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  },
  {
    institution_name: "SPARSH Teachers Training Institute for Children with Special Needs",
    institution_type: "Special school and teacher-training institute",
    disability_focus: "Children with special needs",
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
    institution_name: "Child Concern",
    institution_type: "Child-development and rehabilitation institute",
    disability_focus: "Child development, mental health and rehabilitation for persons with disabilities",
    district: "Ranchi",
    address: "1B Subh Gauri Enclaves, Budh Vihar Colony, Argora Bypass, Ashok Nagar, Harmu, Ranchi, Jharkhand",
    pincode: "834002",
    phone: "0651-2244946; 9097968279; 9472162409",
    email: "childconcern.jharkhand@gmail.com; childconcern_jharkhand@rediffmail.com",
    accessible_infrastructure_out_of_20: 15,
    digital_accessibility_out_of_20: 9,
    accessible_washrooms_out_of_20: 14,
    accessible_laboratory_and_learning_facilities_out_of_20: 16,
    emergency_and_support_services_out_of_20: 17,
    total_accessibility_rating_out_of_100: 71,
    rating_basis: "Prototype estimate - requires on-site accessibility audit"
  }
];
