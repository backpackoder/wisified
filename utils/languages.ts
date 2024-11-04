export const appLanguages = {
  // Languages available for the app
  en: {
    title: "English",
    englishTitle: "English",
    nativeTitle: "English",
    code: "en",
    flag: "/flags/en.jpg",
  },
  fr: {
    title: "Français",
    englishTitle: "French",
    nativeTitle: "Français",
    code: "fr",
    flag: "/flags/fr.jpg",
  },
  es: {
    title: "Español",
    englishTitle: "Spanish",
    nativeTitle: "Español",
    code: "es",
    flag: "/flags/es.jpg",
  },
  // de: {
  //   title: "Deutsch",
  //   englishTitle: "German",
  //   nativeTitle: "Deutsch",
  //   code: "de",
  //   flag: "/flags/de.jpg",
  // },
  // it: {
  //   title: "Italiano",
  //   englishTitle: "Italian",
  //   nativeTitle: "Italiano",
  //   code: "it",
  //   flag: "/flags/it.jpg",
  // },
};

export type Iso = keyof typeof appLanguages;

export const defaultAppLanguage = appLanguages.en;

//   Languages available for the quotes, authors and tags
//   translations: {
//     en: {
//       title: "English",
//       englishTitle: "English",
//       code: "en",
//     },
//     ar: {
//       title: "العربية",
//       englishTitle: "Arabic",
//       code: "ar",
//     },
//     cn: {
//       title: "中文",
//       englishTitle: "Chinese",
//       code: "cn",
//     },
//     de: {
//       title: "Deutsch",
//       englishTitle: "German",
//       code: "de",
//     },
//     es: {
//       title: "Español",
//       englishTitle: "Spanish",
//       code: "es",
//     },
//     fr: {
//       title: "Français",
//       englishTitle: "French",
//       code: "fr",
//     },
//     gc: {
//       title: "Ελληνικά",
//       englishTitle: "Greek",
//       code: "gc",
//     },
//     hi: {
//       title: "हिन्दी",
//       englishTitle: "Hindi",
//       code: "hi",
//     },
//     it: {
//       title: "Italiano",
//       englishTitle: "Italian",
//       code: "it",
//     },
//     pt: {
//       title: "Português",
//       englishTitle: "Portuguese",
//       code: "pt",
//     },
//     ru: {
//       title: "Русский",
//       englishTitle: "Russian",
//       code: "ru",
//     },
//   },
