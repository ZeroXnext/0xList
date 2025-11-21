export default function slugify(str: string): string {
    return str
        .normalize("NFD")                 // decompose accents/diacritics
        .replace(/[\u0300-\u036f]/g, '')  // remove the accents
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')          // spaces/underscores → hyphens
        .replace(/[^\w-]+/g, '')          // remove non-alphanumeric except hyphen
        .replace(/--+/g, '-')             // collapse multiple hyphens
        .replace(/^-+|-+$/g, '');         // remove leading/trailing hyphens
}