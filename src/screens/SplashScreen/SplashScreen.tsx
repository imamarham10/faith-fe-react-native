/**
 * Splash Screen with Breathing Animation
 * Animated splash screen with breathing blue shape and dynamic text
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  useDerivedValue,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Animation constants
const ANIMATION_DURATION = 4000; // 4 seconds for full cycle (2s in, 2s out)
const MIN_HEIGHT = SCREEN_HEIGHT * 0.3; // Minimum height (30% of screen)
const MAX_HEIGHT = SCREEN_HEIGHT * 0.7; // Maximum height (70% of screen)
const BACKGROUND_COLOR = '#121212'; // Deep Charcoal
const BREATHING_SHAPE_COLOR = '#2A2A2A'; // Dark Slate
const INFINITY_ICON_COLOR = '#F4E7D3'; // Pale Gold
const TEXT_COLOR = 'rgba(255, 255, 255, 0.8)'; // White with 80% opacity
const CURVE_RADIUS = 50; // Border radius for the curved top

// Infinity symbol component - shadcn-style SVG component for React Native
interface InfinityIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  background?: string;
  opacity?: number;
  rotation?: number;
  shadow?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  padding?: number;
}

const InfinityIcon: React.FC<InfinityIconProps> = ({
  size = 60,
  color = INFINITY_ICON_COLOR, // Pale Gold
  strokeWidth = 1, // Reduced thickness
  background = 'transparent',
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0,
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation})`);
  if (flipHorizontal) transforms.push('scaleX(-1)');
  if (flipVertical) transforms.push('scaleY(-1)');

  const viewBoxSize = 24 + padding * 2;
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  // Scale stroke width based on size (maintains proportion)
  const scaledStrokeWidth = (strokeWidth / 24) * size;

  // Infinity symbol path from shadcn
  const infinityPath =
    'M3.872 9.172a3.72 3.72 0 0 1 5.419 0L12 12l-2.71 2.828a3.72 3.72 0 0 1-5.418 0c-1.496-1.562-1.496-4.094 0-5.656Zm16.256 0a3.72 3.72 0 0 0-5.419 0L12 12l2.71 2.828a3.72 3.72 0 0 0 5.418 0c1.496-1.562 1.496-4.094 0-5.656Z';

  return (
    <Svg
      width={size}
      height={size}
      viewBox={viewBox}
      opacity={opacity}
      style={{
        transform: transforms.length > 0 ? transforms.join(' ') : undefined,
      }}>
      {/* Background if not transparent */}
      {background !== 'transparent' && (
        <Path
          d={`M0 0 L${viewBoxSize} 0 L${viewBoxSize} ${viewBoxSize} L0 ${viewBoxSize} Z`}
          fill={background}
        />
      )}
      {/* Infinity symbol */}
      <Path
        d={infinityPath}
        fill="none"
        stroke={color}
        strokeWidth={scaledStrokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

// Arrow icon component
const ArrowIcon: React.FC = () => {
  return (
    <View style={styles.arrowContainer}>
      <View style={styles.arrowLine} />
      <View style={[styles.arrowHead, styles.arrowHeadTop]} />
      <View style={[styles.arrowHead, styles.arrowHeadBottom]} />
    </View>
  );
};

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
}) => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  
  // Text messages to scroll through
  const textMessages = [
    'The Digital Shrine',
    'Connect with the Divine',
    'Infinite Wisdom. Daily.',
    'Start Your Day Blessed',
    'One Truth. Many Paths.',
  ];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const translateX = useSharedValue(SCREEN_WIDTH); // Start off-screen to the right

  // Shared value for animation height
  const height = useSharedValue(MIN_HEIGHT);
  const isGrowingRef = useSharedValue(true);

  // Update to next text
  const updateTextIndex = () => {
    setCurrentTextIndex((prev) => (prev + 1) % textMessages.length);
  };

  // Text scrolling animation
  useEffect(() => {
    const scrollDuration = 3000; // 3 seconds per text
    const pauseDuration = 2000; // 2 seconds pause before next text
    
    // Initial delay before first text appears
    const initialDelay = setTimeout(() => {
      // Animate text sliding in from right
      translateX.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      });
    }, 500);

    // Cycle through texts
    const textInterval = setInterval(() => {
      // Slide current text out to left
      translateX.value = withTiming(-SCREEN_WIDTH, {
        duration: 800,
        easing: Easing.in(Easing.ease),
      }, () => {
        // After sliding out, update to next text and reset position
        runOnJS(updateTextIndex)();
        translateX.value = SCREEN_WIDTH; // Reset to right side
        // Slide new text in from right
        translateX.value = withTiming(0, {
          duration: 800,
          easing: Easing.out(Easing.ease),
        });
      });
    }, scrollDuration + pauseDuration);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(textInterval);
    };
  }, []);

  // Start animation - grow from bottom once and stop
  useEffect(() => {
    height.value = withTiming(MAX_HEIGHT, {
      duration: ANIMATION_DURATION,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  // Animated style for blue shape
  const animatedBlueShapeStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  // Calculate scale based on height (normalized between 0.9 and 1.1)
  const scale = useDerivedValue(() => {
    const progress = (height.value - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT);
    // Scale from 0.9 (min) to 1.1 (max) as the blue shape grows
    return 0.9 + progress * 0.2;
  });

  // Breathing rhythm for glow - independent animation
  const glowPulse = useSharedValue(0.3);
  
  // Start breathing animation for glow
  useEffect(() => {
    glowPulse.value = withRepeat(
      withSequence(
        // Breathe in - glow increases
        withTiming(0.8, {
          duration: ANIMATION_DURATION / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        // Breathe out - glow decreases
        withTiming(0.3, {
          duration: ANIMATION_DURATION / 2,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1, // Infinite repeat
      false,
    );
  }, []);

  // Calculate glow opacity with breathing rhythm
  const glowOpacity = useDerivedValue(() => {
    return glowPulse.value;
  });

  // Animated style for text scrolling
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  // Animated style for infinity icon (centered in blue shape)
  const animatedInfinityStyle = useAnimatedStyle(() => {
    const iconHeight = 60; // Height of the icon wrapper
    // Center the icon vertically in the blue shape
    const topPosition = (height.value - iconHeight) / 2;
    return {
      top: topPosition, // Center icon vertically in blue shape
      transform: [
        {scale: scale.value}, // Scale with animation
      ],
      shadowColor: INFINITY_ICON_COLOR, // Pale Gold glow
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: glowOpacity.value,
      shadowRadius: 15 * scale.value, // Glow radius scales with icon
    };
  });

  // Animated style for glow background with breathing rhythm
  const animatedGlowStyle = useAnimatedStyle(() => {
    // Combine the breathing pulse with the scale animation
    const breathingScale = 1.2 + (glowOpacity.value - 0.3) * 0.3; // Scale from 1.2 to 1.5
    return {
      opacity: glowOpacity.value * 0.6,
      transform: [{scale: breathingScale * scale.value}],
    };
  });

  // Handle navigation to next screen
  const handleNavigate = () => {
    navigation.navigate('FaithSelection');
    onAnimationComplete?.();
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {/* Top text with scrolling animation */}
      <View style={styles.textContainer}>
        <Animated.View style={[styles.textWrapper, animatedTextStyle]}>
          <Text style={styles.breathText}>
            {textMessages[currentTextIndex]}
          </Text>
        </Animated.View>
      </View>

      {/* Breathing shape with animation */}
      <Animated.View style={[styles.breathingShape, animatedBlueShapeStyle]}>
        {/* Infinity icon positioned on top of blue shape */}
        <Animated.View style={[styles.infinityWrapper, animatedInfinityStyle]}>
          {/* Glow effect - white circular background */}
          <Animated.View style={[styles.glowBackground, animatedGlowStyle]} />
          <InfinityIcon />
        </Animated.View>
      </Animated.View>

      {/* Navigation arrow button - bottom right */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={handleNavigate}
        activeOpacity={0.7}>
        <ArrowIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR, // Deep Charcoal
  },
  textContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.15,
    left: 0,
    right: 0,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    overflow: 'hidden', // Hide text that's off-screen
  },
  textWrapper: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathText: {
    fontSize: 24,
    fontWeight: '600', // Semi-Bold
    color: TEXT_COLOR, // White with 80% opacity
    textAlign: 'center',
  },
  breathingShape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
    backgroundColor: BREATHING_SHAPE_COLOR, // Dark Slate
    borderTopLeftRadius: CURVE_RADIUS,
    borderTopRightRadius: CURVE_RADIUS,
    overflow: 'visible',
  },
  infinityWrapper: {
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 40,
    width: 80,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowBackground: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: INFINITY_ICON_COLOR, // Pale Gold glow
    opacity: 0.4,
  },
  navButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BREATHING_SHAPE_COLOR, // Dark Slate to match breathing shape
    borderWidth: 1.5,
    borderColor: INFINITY_ICON_COLOR, // Pale Gold border
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: INFINITY_ICON_COLOR, // Pale Gold shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLine: {
    width: 12,
    height: 2,
    backgroundColor: INFINITY_ICON_COLOR, // Pale Gold
    position: 'absolute',
    left: 0,
  },
  arrowHead: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: INFINITY_ICON_COLOR, // Pale Gold
    right: 0,
  },
  arrowHeadTop: {
    transform: [{rotate: '45deg'}, {translateY: -3}],
  },
  arrowHeadBottom: {
    transform: [{rotate: '-45deg'}, {translateY: 3}],
  },
});
