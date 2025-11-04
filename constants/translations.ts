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
    hello: 'Hello',
    nutritionOverview: "Here's your nutrition overview",
    mealsToday: 'Meals Today',
    progress: 'Progress',
    avgScore: 'Avg. Score',
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
    
    // Insight Messages
    startFirstMeal: "🍽️ Start your day by scanning your first meal!",
    greatStart: "💪 Great start! Keep tracking your meals.",
    onARoll: "🔥 You're on a roll! Keep it up.",
    excellentTracking: "⭐ Excellent tracking today!",
    calorieGoalLow: "💡 You're at {progress}% of your calorie goal. Consider adding another meal or snack.",
    proteinIntakeLow: "🥩 Your protein intake is low. Add some lean protein to your next meal.",
    
    // Onboarding
    scanYourFood: 'Scan Your Food',
    scanYourFoodDesc: 'Take a photo of any meal and get instant nutrition analysis powered by AI',
    trackYourProgress: 'Track Your Progress',
    trackYourProgressDesc: 'Monitor your daily calories, macros, and achieve your health goals effortlessly',
    getSmartInsights: 'Get Smart Insights',
    getSmartInsightsDesc: 'Receive personalized health scores and recommendations for every meal',
    reachYourGoals: 'Reach Your Goals',
    reachYourGoalsDesc: 'Set custom nutrition targets and watch yourself achieve them day by day',
    getStarted: 'Get Started',
    next: 'Next',
    skip: 'Skip',
    
    // Scan
    scanFood: 'Scan Your Food',
    scanInstruction: 'Take a photo or upload an image to get instant nutrition analysis',
    takePhoto: 'Take Photo',
    chooseGallery: 'Choose from Gallery',
    analyzeFood: 'Analyze Food',
    analyzing: 'Analyzing...',
    noScanData: 'No scan data available',
    
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
    deleteMealConfirm: 'Are you sure you want to delete "{name}"? This action cannot be undone.',
    mealDeleted: 'Meal deleted successfully.',
    thisMeal: 'this meal',
    
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
    addToJournal: 'Add to Journal',
    saveMeal: 'Save Meal',
    
    // Food Details
    mixedFoodItem: 'Mixed Food Item',
    serving: 'serving',
    servings: 'servings',
    grams: 'g',
    kcal: 'kcal',
    nutritionInfo: 'Nutrition Information',
    
    // Health Status
    nutritionAnalysis: 'Nutrition Analysis',
    balancedMeal: 'Balanced Meal',
    healthyChoice: 'Healthy Choice',
    
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
    hello: 'Bonjour',
    nutritionOverview: 'Voici votre aperçu nutritionnel',
    mealsToday: "Repas aujourd'hui",
    progress: 'Progrès',
    avgScore: 'Score moy.',
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
    
    // Insight Messages
    startFirstMeal: "🍽️ Commencez votre journée en scannant votre premier repas!",
    greatStart: "💪 Excellent début! Continuez à suivre vos repas.",
    onARoll: "🔥 Vous êtes sur une lancée! Continuez comme ça.",
    excellentTracking: "⭐ Excellent suivi aujourd'hui!",
    calorieGoalLow: "💡 Vous êtes à {progress}% de votre objectif calorique. Envisagez d'ajouter un autre repas ou collation.",
    proteinIntakeLow: "🥩 Votre apport en protéines est faible. Ajoutez des protéines maigres à votre prochain repas.",
    
    // Onboarding
    scanYourFood: 'Scannez votre nourriture',
    scanYourFoodDesc: 'Prenez une photo de n\'importe quel repas et obtenez une analyse nutritionnelle instantanée alimentée par l\'IA',
    trackYourProgress: 'Suivez votre progression',
    trackYourProgressDesc: 'Surveillez vos calories quotidiennes, macros, et atteignez vos objectifs de santé sans effort',
    getSmartInsights: 'Obtenez des informations intelligentes',
    getSmartInsightsDesc: 'Recevez des scores de santé personnalisés et des recommandations pour chaque repas',
    reachYourGoals: 'Atteignez vos objectifs',
    reachYourGoalsDesc: 'Fixez des objectifs nutritionnels personnalisés et regardez-vous les atteindre jour après jour',
    getStarted: 'Commencer',
    next: 'Suivant',
    skip: 'Passer',
    
    // Scan
    scanFood: 'Scanner votre nourriture',
    scanInstruction: 'Prenez une photo ou téléchargez une image pour obtenir une analyse nutritionnelle instantanée',
    takePhoto: 'Prendre une photo',
    chooseGallery: 'Choisir dans la galerie',
    analyzeFood: 'Analyser la nourriture',
    analyzing: 'Analyse en cours...',
    noScanData: 'Aucune donnée de scan disponible',
    
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
    deleteMealConfirm: 'Êtes-vous sûr de vouloir supprimer "{name}"? Cette action ne peut pas être annulée.',
    mealDeleted: 'Repas supprimé avec succès.',
    thisMeal: 'ce repas',
    
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
    addToJournal: 'Ajouter au journal',
    saveMeal: 'Enregistrer le repas',
    
    // Food Details
    mixedFoodItem: 'Aliment mixte',
    serving: 'portion',
    servings: 'portions',
    grams: 'g',
    kcal: 'kcal',
    nutritionInfo: 'Informations nutritionnelles',
    
    // Health Status
    nutritionAnalysis: 'Analyse nutritionnelle',
    balancedMeal: 'Repas équilibré',
    healthyChoice: 'Choix sain',
    
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
    hello: 'مرحباً',
    nutritionOverview: 'إليك نظرة عامة على التغذية',
    mealsToday: 'وجبات اليوم',
    progress: 'التقدم',
    avgScore: 'متوسط النقاط',
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
    
    // Insight Messages
    startFirstMeal: "🍽️ ابدأ يومك بمسح وجبتك الأولى!",
    greatStart: "💪 بداية رائعة! استمر في تتبع وجباتك.",
    onARoll: "🔥 أنت في حالة جيدة! استمر على هذا النحو.",
    excellentTracking: "⭐ تتبع ممتاز اليوم!",
    calorieGoalLow: "💡 أنت عند {progress}% من هدف السعرات الحرارية. فكر في إضافة وجبة أخرى أو وجبة خفيفة.",
    proteinIntakeLow: "🥩 تناول البروتين منخفض. أضف بعض البروتين الخالي من الدهون إلى وجبتك القادمة.",
    
    // Onboarding
    scanYourFood: 'امسح طعامك',
    scanYourFoodDesc: 'التقط صورة لأي وجبة واحصل على تحليل غذائي فوري بواسطة الذكاء الاصطناعي',
    trackYourProgress: 'تتبع تقدمك',
    trackYourProgressDesc: 'راقب السعرات الحرارية اليومية والماكروز وحقق أهدافك الصحية بسهولة',
    getSmartInsights: 'احصل على رؤى ذكية',
    getSmartInsightsDesc: 'احصل على درجات صحية مخصصة وتوصيات لكل وجبة',
    reachYourGoals: 'حقق أهدافك',
    reachYourGoalsDesc: 'حدد أهداف غذائية مخصصة وشاهد نفسك تحققها يوماً بعد يوم',
    getStarted: 'ابدأ الآن',
    next: 'التالي',
    skip: 'تخطي',
    
    // Scan
    scanFood: 'امسح طعامك',
    scanInstruction: 'التقط صورة أو قم بتحميل صورة للحصول على تحليل غذائي فوري',
    takePhoto: 'التقط صورة',
    chooseGallery: 'اختر من المعرض',
    analyzeFood: 'تحليل الطعام',
    analyzing: 'جاري التحليل...',
    noScanData: 'لا توجد بيانات مسح متاحة',
    
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
    deleteMealConfirm: 'هل أنت متأكد من حذف "{name}"؟ لا يمكن التراجع عن هذا الإجراء.',
    mealDeleted: 'تم حذف الوجبة بنجاح.',
    thisMeal: 'هذه الوجبة',
    
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
    addToJournal: 'إضافة إلى اليوميات',
    saveMeal: 'حفظ الوجبة',
    
    // Food Details
    mixedFoodItem: 'عنصر طعام مختلط',
    serving: 'حصة',
    servings: 'حصص',
    grams: 'جم',
    kcal: 'سعرة',
    nutritionInfo: 'معلومات الطعام',
    
    // Health Status
    nutritionAnalysis: 'تحليل التغذية',
    balancedMeal: 'وجبة متوازنة',
    healthyChoice: 'اختيار صحي',
    
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
