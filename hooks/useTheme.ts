import { useUser } from '@/contexts/UserContext';
import { LightColors, DarkColors } from '@/constants/colors';

export function useTheme() {
  const { settings } = useUser();
  
  const colors = settings.darkMode ? DarkColors : LightColors;
  const isDark = settings.darkMode;
  
  return { colors, isDark };
}
