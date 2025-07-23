import { Option, RegistrationForm, YesOrNo } from "../../typings.d";
import { RadioOption } from "../Checkboxes";


export const FIELD_OF_FOCUS_OPTIONS: Option[] = [
  // Islamic Sciences
  { value: 'hadith', label: 'Hadith', category: 'Islamic Sciences' },
  { value: 'escatology', label: 'Islamic Escatology', category: 'Islamic Sciences' },
  { value: 'aqeedah', label: 'Aqeedah (Theology)', category: 'Islamic Sciences' },
  { value: 'fiqh', label: 'Fiqh (Jurisprudence)', category: 'Islamic Sciences' },
  { value: 'tasawwuf', label: 'Tasawwuf (Spirituality)', category: 'Islamic Sciences' },

  // History
  { value: 'pre-islamic', label: 'Pre-Islamic History', category: 'History' },
  { value: 'rashidun', label: 'Rashidun Caliphate', category: 'History' },
  { value: 'post-rashidun', label: 'Post-Rashidun Period', category: 'History' },
  { value: 'ummayad', label: 'Ummayad Caliphate', category: 'History' },
  { value: 'abbasid', label: 'Abbasid Caliphate', category: 'History' },
  { value: 'post-abbasid', label: 'Post-Abbasid Period', category: 'History' },
  { value: 'mamluk', label: 'Mamluk Sultanate', category: 'History' },
  { value: 'ottoman', label: 'Ottoman Empire', category: 'History' },
  { value: 'post-ottoman', label: 'Post-Ottoman Era', category: 'History' },
  { value: 'modern-history', label: 'Modern History', category: 'History' },

  // Social Topics
  { value: 'manners-etiquette', label: 'Manners and Etiquette', category: 'Social Topics' },
  { value: 'marriage', label: 'Marriage and Family', category: 'Social Topics' },
  { value: 'parenting', label: 'Parenting', category: 'Social Topics' },
  { value: 'gender-relations', label: 'Gender Relations', category: 'Social Topics' },

  // Philosophy & Science
  { value: 'metaphysics', label: 'Metaphysics', category: 'Philosophy & Science' },
  { value: 'islamic-philosophy', label: 'Islamic Philosophy', category: 'Philosophy & Science' },
  { value: 'science-islam', label: 'Science in Islamic Civilization', category: 'Philosophy & Science' },

  // Medicine
  { value: 'prophetic-medicine', label: 'Prophetic Medicine', category: 'Medicine' },
  { value: 'modern-medicine', label: 'Modern Medical Issues', category: 'Medicine' },
  { value: 'mental-health', label: 'Mental Health', category: 'Medicine' },

  // Other
  { value: 'contemporary-issues', label: 'Contemporary Issues', category: 'Other' },
  { value: 'comparative-religion', label: 'Comparative Religion', category: 'Other' },
  { value: 'other', label: 'Other Topics', category: 'Other' }
];

export const PART_OF_GOVERNMENT_AGENCY_OPTIONS: RadioOption[] = [
  { value: YesOrNo.No, label: "No", desc: "No you have not been part of a government agency" },
  { value: YesOrNo.Yes, label: "Yes", desc: "Yes you have been part of a government agency" },
];

export const DEFAULT_REGISTER_FORM: RegistrationForm = {
  firstName: '',
  familyName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePicture: '',
  nationalId: '',
  nationalIdCountry: undefined,
  nationalIdPicture: '',
  countryOfOrigin: undefined,
  fieldOfFocus: [],
  facebook: undefined,
  linkedin: undefined,
  twitterOrX: undefined,
  tiktok: undefined,
  wasInGovernmentAgency: undefined,
  infoIsCorrect: undefined,
  whyContribute: undefined,
  agreeToTerms: undefined
};

export const DEFAULT_REGISTRATION_SUBMITTED_CONFIG: { submitted: boolean, expires: Date | undefined }  = {
  submitted: false,
  expires: undefined
}

export const EXPIRE_TIME_SUBMITTED_REGISTRATION = (1000 * 60) * 30;
export const EXPIRE_TIME_AUTH_STORE = (1000 * 60) * 60 * 24 * 14;