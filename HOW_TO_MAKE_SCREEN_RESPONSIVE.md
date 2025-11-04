# How to Make Any Screen Responsive

## Quick Start

### Step 1: Import the hook
```tsx
import { useResponsive } from '@/hooks/useResponsive';
```

### Step 2: Use in your component
```tsx
export default function MyScreen() {
  const { fontSize, spacing, isSmallDevice, isTablet } = useResponsive();
  
  // Then use fontSize() and spacing() in your styles!
}
```

### Step 3: Update StyleSheet
Replace fixed numbers with responsive functions:

**BEFORE:**
```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  button: {
    padding: 16,
  },
});
```

**AFTER:**
```tsx
const { fontSize, spacing, isSmallDevice } = useResponsive();

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize(isSmallDevice ? 24 : 28), // Smaller on small screens
    marginBottom: spacing(24), // Auto-adjusts
    paddingHorizontal: spacing(20),
  },
  button: {
    padding: spacing(isSmallDevice ? 12 : 16), // Less padding on small screens
  },
});
```

---

## Common Patterns

### Pattern 1: Responsive Font Sizes
```tsx
const { fontSize, isSmallDevice } = useResponsive();

fontSize(isSmallDevice ? 20 : 24)  // Smaller text on small phones
fontSize(16)                        // Auto-scales proportionally
```

### Pattern 2: Responsive Spacing
```tsx
const { spacing, isSmallDevice } = useResponsive();

spacing(24)                         // Auto-adjusts for all screens
spacing(isSmallDevice ? 16 : 24)   // Conditional spacing
```

### Pattern 3: Responsive Sizes (Icons, Images, etc.)
```tsx
const { spacing, isSmallDevice, isTablet } = useResponsive();

// Icon size
<Camera size={spacing(isSmallDevice ? 40 : isTablet ? 64 : 48)} />

// Image dimensions
width: spacing(isSmallDevice ? 140 : 180)
height: spacing(isSmallDevice ? 140 : 180)
```

### Pattern 4: Device-Specific Layouts
```tsx
const { isTablet, isSmallDevice } = useResponsive();

// Different layouts for tablets
flexDirection: isTablet ? 'row' : 'column'

// Hide elements on small screens
display: isSmallDevice ? 'none' : 'flex'

// More columns on tablets
numColumns: isTablet ? 3 : 2
```

---

## Complete Example

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';

export default function MyScreen() {
  const { fontSize, spacing, isSmallDevice, isTablet } = useResponsive();
  
  const styles = StyleSheet.create({
    container: {
      padding: spacing(isSmallDevice ? 16 : 24),
    },
    title: {
      fontSize: fontSize(isSmallDevice ? 24 : 28),
      marginBottom: spacing(16),
    },
    subtitle: {
      fontSize: fontSize(16),
      marginBottom: spacing(24),
    },
    button: {
      padding: spacing(isSmallDevice ? 12 : 16),
      borderRadius: spacing(12),
    },
    buttonText: {
      fontSize: fontSize(17),
    },
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.subtitle}>This is responsive!</Text>
    </View>
  );
}
```

---

## Screen Priorities

### ✅ Apply to these screens first:
1. `app/onboarding.tsx` - First impression matters
2. `app/profile-setup.tsx` - Form inputs need proper sizing
3. `app/(tabs)/scan.tsx` - Camera button needs to be reachable
4. `app/(tabs)/dashboard.tsx` - Cards should fit properly

### Then:
5. `app/(tabs)/history.tsx`
6. `app/result.tsx`  
7. Any other screens with fixed sizes

---

## What Gets Auto-Fixed

When you use `fontSize()` and `spacing()`:

✅ **Small phones (< 375px):**
- Font sizes scale down 5-10%
- Spacing reduces by 15%
- More comfortable on iPhone SE, small Android

✅ **Normal phones (375-428px):**
- Proportional scaling
- Balanced sizing

✅ **Large phones (428-768px):**
- Slightly larger for easier reading
- Better use of space

✅ **Tablets (> 768px):**
- Font sizes scale up 10-15%
- Spacing increases by 20%
- Better use of large screens

---

## Testing

Test on different screen sizes:
```bash
npx expo start
```

Then test on:
- iPhone SE simulator (small)
- iPhone 14 simulator (medium)
- iPhone 14 Pro Max simulator (large)
- iPad simulator (tablet)

---

## Tips

1. **Start with spacing()** - Biggest visual impact
2. **Then do fontSize()** - Text legibility is critical
3. **Use isSmallDevice conditionals** - For critical sizing decisions
4. **Don't overdo it** - Not every pixel needs to be responsive
5. **Test on real device** - Simulators don't show everything

---

## Common Mistakes to Avoid

❌ **DON'T:**
```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: fontSize(fontSize(24)), // DOUBLE WRAPPING!
  },
});
```

✅ **DO:**
```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: fontSize(24), // Just once
  },
});
```

❌ **DON'T:** Use responsive functions outside StyleSheet.create()
✅ **DO:** Define all styles inside the component where you have access to the hook

---

## Need Help?

The `useResponsive()` hook provides:
- `screenWidth` - Current screen width
- `screenHeight` - Current screen height
- `isSmallDevice` - true if width < 375px
- `isMediumDevice` - true if 375px ≤ width < 428px
- `isLargeDevice` - true if 428px ≤ width < 768px
- `isTablet` - true if width ≥ 768px
- `fontSize(size)` - Responsive font size
- `spacing(size)` - Responsive spacing
- `scale(size)` - Linear horizontal scaling
- `verticalScale(size)` - Linear vertical scaling
- `moderateScale(size, factor)` - Balanced scaling

Happy coding! 🚀
