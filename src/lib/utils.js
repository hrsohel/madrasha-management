import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function translateToBangla(value) {
  if (!value) return '';
  const map = {
    // Residential Status
    'Residential': 'আবাসিক',
    'Non-Residential': 'অনাবাসিক',
    'Resident': 'আবাসিক',
    'Non-Resident': 'অনাবাসিক',
    'Day Care': 'ডে কেয়ার',

    // Shifts
    'Day': 'দিবা',
    'Morning': 'প্রভাতী',
    'Evening': 'সান্ধ্য',
    'Night': 'রাত',

    // Sections
    'A': 'ক',
    'B': 'খ',
    'C': 'গ',
    'D': 'ঘ',
    'E': 'ঙ',

    // Classes (Common ones)
    'Play': 'প্লে',
    'Nursery': 'নার্সারি',
    'One': 'প্রথম',
    'Two': 'দ্বিতীয়',
    'Three': 'তৃতীয়',
    'Four': 'চতুর্থ',
    'Five': 'পঞ্চম',
    'Six': 'ষষ্ঠ',
    'Seven': 'সপ্তম',
    'Eight': 'অষ্টম',
    'Nine': 'নবম',
    'Ten': 'দশম',
    'Alim': 'আলিম',
    'Fazil': 'ফাজিল',
    'Kamil': 'কামিল',

    // Departments/Groups
    'General': 'সাধারণ',
    'Science': 'বিজ্ঞান',
    'Arts': 'মানবিক',
    'Commerce': 'ব্যবসায় শিক্ষা',
    'Hifz': 'হিফজ',
    'Noorani': 'নূরানী',
    'Kitab': 'কিতাব',
    'Nadia': 'নাদিয়া',

    // Gender
    'Male': 'পুরুষ',
    'Female': 'মহিলা',
    'Boy': 'ছাত্র',
    'Girl': 'ছাত্রী',

    // Blood Groups (Just in case)
    'A+': 'এ+', 'A-': 'এ-',
    'B+': 'বি+', 'B-': 'বি-',
    'O+': 'ও+', 'O-': 'ও-',
    'AB+': 'এবি+', 'AB-': 'এবি-',
  };

  // If exact match found
  if (map[value]) return map[value];

  // Try case-insensitive
  const lowerValue = String(value).toLowerCase();
  const key = Object.keys(map).find(k => k.toLowerCase() === lowerValue);
  if (key) return map[key];

  // Return original if no translation found
  return value;
}

export function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export async function authFetch(url, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  return fetch(url, config);
}
