import { social } from '../data/portfolio';

// Profiles to link, in this order: LinkedIn, GitHub, LeetCode
const ORDER = ['LinkedIn', 'GitHub', 'LeetCode'];

export const PROFILES = [...social].sort((a, b) => ORDER.indexOf(a.site) - ORDER.indexOf(b.site));
