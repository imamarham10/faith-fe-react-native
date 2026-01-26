/**
 * Faith Selection Screen - Simple Option List
 * Clean, reliable faith selection with animated background transitions
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  Platform,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import Svg, {Defs, RadialGradient as SvgRadialGradient, Stop, Rect} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Faith data with radial gradient colors (center -> edge)
const FAITHS = [
  {
    id: 'hinduism',
    name: 'Hinduism',
    color: '#FF9933', // Saffron (for text shadow)
    gradientCenter: '#5E2C04', // Rich Burnt Orange
    gradientEdge: '#1A0C00', // Almost Black
  },
  {
    id: 'islam',
    name: 'Islam',
    color: '#008080', // Emerald (for text shadow)
    gradientCenter: '#064E3B', // Deep Emerald
    gradientEdge: '#001F15', // Dark edge
  },
  {
    id: 'christianity',
    name: 'Christianity',
    color: '#4A90E2', // Sky Blue (for text shadow)
    gradientCenter: '#1E3A8A', // Deep Royal Blue
    gradientEdge: '#0A1025', // Dark edge
  },
  {
    id: 'sikhism',
    name: 'Sikhism',
    color: '#FFC107', // Gold (for text shadow)
    gradientCenter: '#713F12', // Deep Gold/Ochre
    gradientEdge: '#2A1500', // Dark edge
  },
  {
    id: 'jainism',
    name: 'Jainism',
    color: '#F4C2C2', // Soft Pink (for text shadow)
    gradientCenter: '#331010', // Deep Rosewood
    gradientEdge: '#1A0808', // Dark edge
  },
];

const BACKGROUND_COLOR = '#121212'; // Deep Charcoal

// Radial Gradient Background Component
interface RadialGradientBackgroundProps {
  centerColor: string;
  edgeColor: string;
  opacity?: number;
}

const RadialGradientBackground: React.FC<RadialGradientBackgroundProps> = ({
  centerColor,
  edgeColor,
  opacity = 1,
}) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          opacity,
        },
      ]}
      pointerEvents="none">
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
        <Defs>
          <SvgRadialGradient id="radialGradient" cx="50%" cy="50%" r="80%">
            <Stop offset="0%" stopColor={centerColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={edgeColor} stopOpacity="1" />
          </SvgRadialGradient>
        </Defs>
        <Rect
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill="url(#radialGradient)"
        />
      </Svg>
    </View>
  );
};

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return [h * 360, s * 100, l * 100];
};

// Helper function to convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// Helper function to blend colors with high saturation preservation
const blendColorsWithSaturation = (
  baseColor: string,
  faithColor: string,
  ratio: number,
): string => {
  // Parse base color
  const baseHex = baseColor.replace('#', '');
  const baseR = parseInt(baseHex.substring(0, 2), 16);
  const baseG = parseInt(baseHex.substring(2, 4), 16);
  const baseB = parseInt(baseHex.substring(4, 6), 16);
  const [baseH, baseS, baseL] = rgbToHsl(baseR, baseG, baseB);

  // Parse faith color
  const faithHex = faithColor.replace('#', '');
  const faithR = parseInt(faithHex.substring(0, 2), 16);
  const faithG = parseInt(faithHex.substring(2, 4), 16);
  const faithB = parseInt(faithHex.substring(4, 6), 16);
  const [faithH, faithS, faithL] = rgbToHsl(faithR, faithG, faithB);

  // Blend: use faith's hue and saturation, but lower lightness
  // Keep saturation high (at least 60% of original) for vibrant feel
  const blendedS = Math.max(faithS * 0.6, 40); // Keep saturation high
  const blendedL = baseL + (faithL - baseL) * ratio * 0.3; // Subtle lightness increase

  // Use faith's hue for color identity
  const [r, g, b] = hslToRgb(faithH, blendedS, blendedL);

  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

type FaithSelectionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FaithSelection'
>;

export interface FaithSelectionScreenProps {
  onSelectionComplete?: (faithId: string) => void;
}

export const FaithSelectionScreen: React.FC<FaithSelectionScreenProps> = ({
  onSelectionComplete,
}) => {
  const navigation = useNavigation<FaithSelectionNavigationProp>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showContinueButton, setShowContinueButton] = useState(false);

  // Background gradient opacity animation
  const gradientOpacity = useSharedValue(0);

  // Handle haptic feedback
  const triggerHaptic = useCallback(() => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(10);
    } else if (Platform.OS === 'android') {
      Vibration.vibrate(10);
    }
  }, []);

  // Handle faith selection
  const handleSelectFaith = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      triggerHaptic();

      // Smoothly fade in the gradient
      gradientOpacity.value = withTiming(1, {
        duration: 600,
      });

      // Show continue button after selection
      setShowContinueButton(true);
    },
    [triggerHaptic, gradientOpacity],
  );

  // Animated gradient opacity style
  const animatedGradientOpacity = useAnimatedStyle(() => ({
    opacity: gradientOpacity.value,
  }));

  // Continue button animation
  const continueButtonOpacity = useSharedValue(0);
  const continueButtonTranslateY = useSharedValue(50);

  useEffect(() => {
    if (showContinueButton) {
      continueButtonOpacity.value = withTiming(1, {duration: 300});
      continueButtonTranslateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      continueButtonOpacity.value = withTiming(0, {duration: 200});
      continueButtonTranslateY.value = withTiming(50, {duration: 200});
    }
  }, [showContinueButton]);

  const animatedContinueButtonStyle = useAnimatedStyle(() => {
    const selectedFaith =
      selectedIndex !== null ? FAITHS[selectedIndex] : null;
    return {
      opacity: continueButtonOpacity.value,
      transform: [{translateY: continueButtonTranslateY.value}],
      backgroundColor: selectedFaith?.color || BACKGROUND_COLOR,
    };
  });

  // Handle continue
  const handleContinue = useCallback(() => {
    if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < FAITHS.length) {
      const selectedFaith = FAITHS[selectedIndex];
      onSelectionComplete?.(selectedFaith.id);
      navigation.navigate('Home');
    }
  }, [selectedIndex, onSelectionComplete, navigation]);

  const selectedFaith = selectedIndex !== null ? FAITHS[selectedIndex] : null;

  return (
    <View style={styles.container}>
      {/* Radial Gradient Background */}
      {selectedFaith && (
        <Animated.View style={[StyleSheet.absoluteFill, animatedGradientOpacity]}>
          <RadialGradientBackground
            centerColor={selectedFaith.gradientCenter}
            edgeColor={selectedFaith.gradientEdge}
          />
        </Animated.View>
      )}
      
      {/* Default background when nothing selected */}
      {!selectedFaith && (
        <View style={[StyleSheet.absoluteFill, {backgroundColor: BACKGROUND_COLOR}]} />
      )}

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Which path guides you?</Text>
        </View>

        {/* Faith Options List */}
        <View style={styles.optionsContainer}>
          {FAITHS.map((faith, index) => (
            <FaithOptionItem
              key={faith.id}
              faith={faith}
              index={index}
              isSelected={selectedIndex === index}
              selectedIndex={selectedIndex}
              onPress={() => handleSelectFaith(index)}
            />
          ))}
        </View>

        {/* Continue Button */}
        {showContinueButton && (
          <Animated.View
            style={[styles.continueButtonContainer, animatedContinueButtonStyle]}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </SafeAreaView>
    </View>
  );
};

// Faith Option Item Component
interface FaithOptionItemProps {
  faith: (typeof FAITHS)[0];
  index: number;
  isSelected: boolean;
  selectedIndex: number | null;
  onPress: () => void;
}

const FaithOptionItem: React.FC<FaithOptionItemProps> = ({
  faith,
  index,
  isSelected,
  selectedIndex,
  onPress,
}) => {
  const scale = useSharedValue(1);

  // Calculate distance from selected item
  const getDistance = () => {
    if (selectedIndex === null) return 999;
    return Math.abs(index - selectedIndex);
  };

  const distance = getDistance();

  // Calculate scale and opacity based on distance
  const getScale = () => {
    if (distance === 0) return 1.0; // Active item
    if (distance === 1) return 0.7; // Immediate neighbor (±1) - smoother transition
    return 0.5; // Far neighbor (±2+)
  };

  const getOpacity = () => {
    if (distance === 0) return 1.0; // Active item
    if (distance === 1) return 0.5; // Immediate neighbor (±1)
    return 0.2; // Far neighbor (±2+)
  };

  useEffect(() => {
    const targetScale = getScale();

    scale.value = withSpring(targetScale, {
      damping: 15,
      stiffness: 200,
    });
  }, [isSelected, distance, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={onPress}
      activeOpacity={0.7}>
      {/* Horizontal lines above and below active item */}
      {isSelected && (
        <>
          <View style={[styles.focusLine, styles.focusLineTop]} />
          <View style={[styles.focusLine, styles.focusLineBottom]} />
        </>
      )}

      <Animated.View
        style={[
          styles.optionContent,
          animatedStyle,
        ]}>
        <Text
          style={[
            styles.optionText,
            {
              fontSize: isSelected ? 32 : 24,
              fontWeight: isSelected ? 'bold' : '400',
              color: isSelected
                ? '#FFFFFF'
                : `rgba(255, 255, 255, ${getOpacity()})`,
              fontFamily: 'Georgia', // Premium serif font - consistent across all items
              // Text shadow for active item only - creates ethereal glow
              ...(isSelected && {
                textShadowColor: faith.color,
                textShadowRadius: 15,
                textShadowOffset: {width: 0, height: 0},
              }),
            },
          ]}>
          {faith.name}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    opacity: 0.9,
    fontFamily: 'Georgia', // Premium serif font for unified feel
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  optionItem: {
    width: '100%',
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  focusLine: {
    position: 'absolute',
    width: '60%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Hairline width, 0.3 opacity
    left: '20%',
    zIndex: 1,
  },
  focusLineTop: {
    top: -8,
  },
  focusLineBottom: {
    bottom: -8,
  },
  optionContent: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Remove visible background box
  },
  optionText: {
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  continueButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  continueButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
