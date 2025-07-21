import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { styles } from "./styles";

// código puro gemini (mudar estilo e comportamento em caso de necessidade no momento da implementação)
const { width } = Dimensions.get("window");

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
}

export function ImageCarousel({
  images,
  autoPlay = false,
  autoPlayInterval = 3000,
  showPagination = true,
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToNextImage = (animated: boolean = true) => {
    const nextIndex = (activeIndex + 1) % images.length;
    scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated });
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      intervalRef.current = setInterval(() => {
        scrollToNextImage();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex, autoPlay, autoPlayInterval, images.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleScrollBeginDrag = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleScrollEndDrag = () => {
    if (autoPlay && images.length > 1) {
      intervalRef.current = setInterval(() => {
        scrollToNextImage();
      }, autoPlayInterval);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
      >
        {images.map((imageUri, index) => (
          <Image
            key={index.toString()}
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {showPagination && images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                styles.dot,
                index === activeIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}
