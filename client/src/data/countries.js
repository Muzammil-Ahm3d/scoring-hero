// Comprehensive worldwide phone country code list with strict national digit lengths
export const COUNTRIES = [
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳', digits: 10, placeholder: '98765 43210' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', digits: 10, placeholder: '(555) 234-5678' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', digits: 10, placeholder: '7911 123456' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺', digits: 9, placeholder: '412 345 678' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪', digits: 9, placeholder: '50 123 4567' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬', digits: 8, placeholder: '8123 4567' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿', digits: 9, placeholder: '21 123 4567' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦', digits: 9, placeholder: '82 123 4567' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦', digits: 10, placeholder: '(416) 555-0199' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰', digits: 10, placeholder: '300 1234567' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩', digits: 10, placeholder: '1712 345678' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰', digits: 9, placeholder: '71 234 5678' },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵', digits: 10, placeholder: '984 1234567' },
  { code: 'AF', name: 'Afghanistan', dial: '+93', flag: '🇦🇫', digits: 9, placeholder: '70 123 4567' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦', digits: 9, placeholder: '50 123 4567' },
  { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦', digits: 8, placeholder: '3312 3456' },
  { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼', digits: 8, placeholder: '9123 4567' },
  { code: 'OM', name: 'Oman', dial: '+968', flag: '🇴🇲', digits: 8, placeholder: '9123 4567' },
  { code: 'BH', name: 'Bahrain', dial: '+973', flag: '🇧🇭', digits: 8, placeholder: '3600 1234' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾', digits: 10, placeholder: '12-345 6789' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩', digits: 11, placeholder: '812-3456-7890' },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭', digits: 9, placeholder: '81 234 5678' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭', digits: 10, placeholder: '917 123 4567' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪', digits: 11, placeholder: '151 12345678' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷', digits: 9, placeholder: '6 12 34 56 78' },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪', digits: 9, placeholder: '85 123 4567' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱', digits: 9, placeholder: '6 12345678' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹', digits: 10, placeholder: '320 123 4567' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸', digits: 9, placeholder: '612 34 56 78' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵', digits: 10, placeholder: '90-1234-5678' },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷', digits: 10, placeholder: '10-1234-5678' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪', digits: 9, placeholder: '712 345678' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬', digits: 10, placeholder: '802 123 4567' },
  { code: 'ZW', name: 'Zimbabwe', dial: '+263', flag: '🇿🇼', digits: 9, placeholder: '71 234 5678' },
  { code: 'JM', name: 'Jamaica (West Indies)', dial: '+1-876', flag: '🇯🇲', digits: 7, placeholder: '555-1234' },
  { code: 'TT', name: 'Trinidad & Tobago', dial: '+1-868', flag: '🇹🇹', digits: 7, placeholder: '555-1234' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷', digits: 11, placeholder: '(11) 98765-4321' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽', digits: 10, placeholder: '55 1234 5678' },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷', digits: 10, placeholder: '9 11 1234-5678' },
]

export const DEFAULT_COUNTRY = COUNTRIES[0] // India (+91)

export function getMaxPhoneDigits(dial) {
  const country = COUNTRIES.find((c) => c.dial === dial)
  return country?.digits || 10
}

export function getPhonePlaceholder(dial) {
  const country = COUNTRIES.find((c) => c.dial === dial)
  return country?.placeholder || '98765 43210'
}
