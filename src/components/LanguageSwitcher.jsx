import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

/**
 * LanguageSwitcher component for changing application language
 * @returns {JSX.Element} LanguageSwitcher component
 */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "tl", name: "Tagalog" },
  ];

  // Get current language, defaulting to "en" if not set
  const currentLanguage = i18n.language?.split("-")[0] || "en";
  const currentLangCode = languages.find(lang => lang.code === currentLanguage)?.code || "en";

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("librosync_language", langCode);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-white" />
      <Select
        value={currentLangCode}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-2 focus:ring-[#E0A526]">
          <SelectValue placeholder="Select language">
            {languages.find(lang => lang.code === currentLangCode)?.name || "English"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="cursor-pointer hover:bg-gray-100"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;

