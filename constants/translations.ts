// Translation system for NutriScan
// Supports: English, French, Arabic

export type Language = 'en' | 'fr' | 'ar';

export const translations = {
  en: {
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    confirm: 'Confirm',
    success: 'Success',
    error: 'Error',
    loading: 'Loading...',
    
    // Tabs
    dashboard: 'Dashboard',
    scan: 'Scan',
    history: 'History',
    settings: 'Settings',
    
    // Dashboard
    todayNutrition: "Today's Nutrition",
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    dailyGoal: 'Daily Goal',
    remaining: 'remaining',
    weeklyStats: 'Weekly Statistics',
    avgCalories: 'Avg Calories',
    totalMeals: 'Total Meals',
    insights: 'Insights',
    noMealsYet: 'No meals tracked yet',
    startScanning: 'Start scanning your meals to see your nutrition data!',
    
    // Scan
    scanFood: 'Scan Your Food',
    takePhoto: 'Take Photo',
    chooseGallery: 'Choose from Gallery',
    analyzeFood: 'Analyze Food',
    analyzing: 'Analyzing...',
    
    // History
    mealHistory: 'Meal History',
    search: 'Search meals...',
    sortBy: 'Sort by',
    filterBy: 'Filter by',
    filterByStatus: 'Filter by Status',
    newest: 'Newest First',
    oldest: 'Oldest First',
    highestCal: 'Highest Calories',
    lowestCal: 'Lowest Calories',
    allStatus: 'All Status',
    all: 'All',
    excellent: 'Excellent',
    good: 'Good',
    moderate: 'Moderate',
    poor: 'Poor',
    meal: 'meal',
    meals: 'meals',
    noHistory: 'No meal history',
    noMealsFound: 'No meals found',
    
    // Settings
    profile: 'Profile',
    name: 'Name',
    activityLevel: 'Activity Level',
    dailyGoals: 'Daily Goals',
    preferences: 'Preferences',
    notifications: 'Notifications',
    darkMode: 'Dark Mode',
    language: 'Language',
    measurementSystem: 'Measurement System',
    metric: 'Metric',
    imperial: 'Imperial',
    about: 'About',
    version: 'Version',
    clearHistory: 'Clear All History',
    clearHistoryConfirm: 'Are you sure you want to delete all your meal scans? This action cannot be undone.',
    clearAll: 'Clear All',
    historyCleared: 'All meal history has been cleared.',
    
    // Activity Levels
    sedentary: 'Sedentary',
    sedentaryDesc: 'Little or no exercise',
    lightActive: 'Lightly Active',
    lightActiveDesc: 'Exercise 1-3 days/week',
    moderateActive: 'Moderately Active',
    moderateActiveDesc: 'Exercise 3-5 days/week',
    veryActive: 'Very Active',
    veryActiveDesc: 'Exercise 6-7 days/week',
    extraActive: 'Extra Active',
    extraActiveDesc: 'Physical job or training',
    
    // Result Screen
    nutritionFacts: 'Nutrition Facts',
    healthScore: 'Health Score',
    foodItems: 'Food Items',
    fiber: 'Fiber',
    sugar: 'Sugar',
    feedback: 'Feedback',
    allergens: 'Allergens',
    warnings: 'Warnings',
    recommendations: 'Recommendations',
    noAllergens: 'No common allergens detected',
    goBack: 'Go Back',
    
    // Languages
    english: 'English',
    french: 'Français',
    arabic: 'العربية',
  },
  
  fr: {
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    confirm: 'Confirmer',
    success: 'Succès',
    error: 'Erreur',
    loading: 'Chargement...',
    
    // Tabs
    dashboard: 'Tableau de bord',
    scan: 'Scanner',
    history: 'Historique',
    settings: 'Paramètres',
    
    // Dashboard
    todayNutrition: "Nutrition d'aujourd'hui",
    calories: 'Calories',
    protein: 'Protéines',
    carbs: 'Glucides',
    fat: 'Lipides',
    dailyGoal: 'Objectif quotidien',
    remaining: 'restant',
    weeklyStats: 'Statistiques hebdomadaires',
    avgCalories: 'Calories moyennes',
    totalMeals: 'Repas totaux',
    insights: 'Aperçus',
    noMealsYet: 'Aucun repas suivi',
    startScanning: 'Commencez à scanner vos repas pour voir vos données nutritionnelles!',
    
    // Scan
    scanFood: 'Scanner votre nourriture',
    takePhoto: 'Prendre une photo',
    chooseGallery: 'Choisir dans la galerie',
    analyzeFood: 'Analyser la nourriture',
    analyzing: 'Analyse en cours...',
    
    // History
    mealHistory: 'Historique des repas',
    search: 'Rechercher des repas...',
    sortBy: 'Trier par',
    filterBy: 'Filtrer par',
    filterByStatus: 'Filtrer par statut',
    newest: 'Plus récent',
    oldest: 'Plus ancien',
    highestCal: 'Calories élevées',
    lowestCal: 'Calories faibles',
    allStatus: 'Tous les statuts',
    all: 'Tout',
    excellent: 'Excellent',
    good: 'Bon',
    moderate: 'Modéré',
    poor: 'Pauvre',
    meal: 'repas',
    meals: 'repas',
    noHistory: 'Aucun historique de repas',
    noMealsFound: 'Aucun repas trouvé',
    
    // Settings
    profile: 'Profil',
    name: 'Nom',
    activityLevel: "Niveau d'activité",
    dailyGoals: 'Objectifs quotidiens',
    preferences: 'Préférences',
    notifications: 'Notifications',
    darkMode: 'Mode sombre',
    language: 'Langue',
    measurementSystem: 'Système de mesure',
    metric: 'Métrique',
    imperial: 'Impérial',
    about: 'À propos',
    version: 'Version',
    clearHistory: 'Effacer tout l\'historique',
    clearHistoryConfirm: 'Êtes-vous sûr de vouloir supprimer tous vos scans de repas? Cette action ne peut pas être annulée.',
    clearAll: 'Tout effacer',
    historyCleared: 'Tout l\'historique des repas a été effacé.',
    
    // Activity Levels
    sedentary: 'Sédentaire',
    sedentaryDesc: 'Peu ou pas d\'exercice',
    lightActive: 'Légèrement actif',
    lightActiveDesc: 'Exercice 1-3 jours/semaine',
    moderateActive: 'Modérément actif',
    moderateActiveDesc: 'Exercice 3-5 jours/semaine',
    veryActive: 'Très actif',
    veryActiveDesc: 'Exercice 6-7 jours/semaine',
    extraActive: 'Extra actif',
    extraActiveDesc: 'Travail physique ou entraînement',
    
    // Result Screen
    nutritionFacts: 'Valeurs nutritionnelles',
    healthScore: 'Score santé',
    foodItems: 'Aliments',
    fiber: 'Fibres',
    sugar: 'Sucre',
    feedback: 'Commentaires',
    allergens: 'Allergènes',
    warnings: 'Avertissements',
    recommendations: 'Recommandations',
    noAllergens: 'Aucun allergène commun détecté',
    goBack: 'Retour',
    
    // Languages
    english: 'English',
    french: 'Français',
    arabic: 'العربية',
  },
  
  ar: {
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    confirm: 'تأكيد',
    success: 'نجح',
    error: 'خطأ',
    loading: 'جاري التحميل...',
    
    // Tabs
    dashboard: 'لوحة التحكم',
    scan: 'مسح',
    history: 'السجل',
    settings: 'الإعدادات',
    
    // Dashboard
    todayNutrition: 'التغذية اليوم',
    calories: 'سعرات حرارية',
    protein: 'بروتين',
    carbs: 'كربوهيدرات',
    fat: 'دهون',
    dailyGoal: 'الهدف اليومي',
    remaining: 'متبقي',
    weeklyStats: 'إحصائيات أسبوعية',
    avgCalories: 'متوسط السعرات',
    totalMeals: 'إجمالي الوجبات',
    insights: 'رؤى',
    noMealsYet: 'لا توجد وجبات مسجلة بعد',
    startScanning: 'ابدأ بمسح وجباتك لرؤية بيانات التغذية!',
    
    // Scan
    scanFood: 'امسح طعامك',
    takePhoto: 'التقط صورة',
    chooseGallery: 'اختر من المعرض',
    analyzeFood: 'تحليل الطعام',
    analyzing: 'جاري التحليل...',
    
    // History
    mealHistory: 'سجل الوجبات',
    search: 'بحث عن الوجبات...',
    sortBy: 'ترتيب حسب',
    filterBy: 'تصفية حسب',
    filterByStatus: 'تصفية حسب الحالة',
    newest: 'الأحدث أولاً',
    oldest: 'الأقدم أولاً',
    highestCal: 'أعلى سعرات',
    lowestCal: 'أقل سعرات',
    allStatus: 'كل الحالات',
    all: 'الكل',
    excellent: 'ممتاز',
    good: 'جيد',
    moderate: 'معتدل',
    poor: 'ضعيف',
    meal: 'وجبة',
    meals: 'وجبات',
    noHistory: 'لا يوجد سجل وجبات',
    noMealsFound: 'لا توجد وجبات',
    
    // Settings
    profile: 'الملف الشخصي',
    name: 'الاسم',
    activityLevel: 'مستوى النشاط',
    dailyGoals: 'الأهداف اليومية',
    preferences: 'التفضيلات',
    notifications: 'الإشعارات',
    darkMode: 'الوضع الداكن',
    language: 'اللغة',
    measurementSystem: 'نظام القياس',
    metric: 'متري',
    imperial: 'إمبراطوري',
    about: 'حول',
    version: 'الإصدار',
    clearHistory: 'مسح كل السجل',
    clearHistoryConfirm: 'هل أنت متأكد من حذف جميع سجلات الوجبات؟ لا يمكن التراجع عن هذا الإجراء.',
    clearAll: 'مسح الكل',
    historyCleared: 'تم مسح جميع سجلات الوجبات.',
    
    // Activity Levels
    sedentary: 'خامل',
    sedentaryDesc: 'قليل أو بدون تمرين',
    lightActive: 'نشط قليلاً',
    lightActiveDesc: 'تمرين 1-3 أيام/أسبوع',
    moderateActive: 'نشط معتدل',
    moderateActiveDesc: 'تمرين 3-5 أيام/أسبوع',
    veryActive: 'نشط جداً',
    veryActiveDesc: 'تمرين 6-7 أيام/أسبوع',
    extraActive: 'نشط للغاية',
    extraActiveDesc: 'عمل بدني أو تدريب',
    
    // Result Screen
    nutritionFacts: 'حقائق غذائية',
    healthScore: 'نقاط الصحة',
    foodItems: 'عناصر الطعام',
    fiber: 'ألياف',
    sugar: 'سكر',
    feedback: 'ملاحظات',
    allergens: 'مسببات الحساسية',
    warnings: 'تحذيرات',
    recommendations: 'توصيات',
    noAllergens: 'لم يتم اكتشاف مسببات حساسية شائعة',
    goBack: 'رجوع',
    
    // Languages
    english: 'English',
    french: 'Français',
    arabic: 'العربية',
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
