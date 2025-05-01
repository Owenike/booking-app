import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
  Linking,
  Dimensions,
  FlatList,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import { Asset } from 'expo-asset';


const { width: screenWidth } = Dimensions.get('window');

// 引入圖片
import aboutBg from './assets/buttons/about_bg.png';
import courseBg from './assets/buttons/course_button_bg.png';
import igBg from './assets/buttons/ig_button_bg.png';
import coopBg from './assets/buttons/cooperation_button_bg.png';
import contactBg from './assets/buttons/contact_button_bg.png';
import lecturerBg from './assets/buttons/lecturers_team_button_bg.png';
import logoImg from './assets/logo.png';
import healthBg from './assets/health_bg.png';  
import teamIntroPhoto from './assets/team_intro_photo.png'; 
import cooperationImage from './assets/cooperation_image.png';  
import asiaFitnessEducationBg from './assets/buttons/asia_fitness_education_association_bg.png'; 
import slide1 from './assets/slider/slide1.png';
import slide2 from './assets/slider/slide2.png';
import slide3 from './assets/slider/slide3.png';
import slide4 from './assets/slider/slide4.png';
import internationalCoachBg from './assets/buttons/international_full_range_movement_coach_association_bg.png';
import WebViewPage from './WebViewPage';
Asset.loadAsync([
  healthBg, cooperationImage, asiaFitnessEducationBg,
  slide1, slide2, slide3, slide4
]);

function MainLayout({ children, hideBottom }) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {children}
      {!hideBottom && (
        <View style={styles.fixedBottom}>
          <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.bottomButtonText}>首頁</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('LogoPage')}>
            <Animatable.Image
              source={logoImg}
              animation="pulse"
              iterationCount="infinite"
              duration={2000}
              style={styles.fixedLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Health')}>
            <Text style={styles.bottomButtonText}>課程</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LogoPage'); // ✅ 3 秒動畫結束後跳到輪播
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout hideBottom={true}>
      <View style={styles.centerContent}>
        <StatusBar barStyle="dark-content" />
        <Animatable.Image
          animation="zoomIn"
          duration={1000}
          source={logoImg}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animatable.Text
          animation="fadeInUp"
          delay={800}
          duration={1000}
          style={styles.titleBold}
        >
          亞洲健身教育聯盟
        </Animatable.Text>
      </View>
    </MainLayout>
  );
}


function HomeScreen({ navigation }) {
  const buttons = [
    {
      label: '聯盟介紹',
      description: '全方位了解我們的起源與宗旨',
      route: 'About',
      image: aboutBg,
    },
    {
      label: '專家專欄',
      description: '探索各領域專家見解，提升專業素養',
      route: 'WebViewPage',
      url: 'https://apfea.oen.tw/posts/2rwT84YuVvtmqsY1YrRiMJq5nmt?locale=zh-TW',
      image: coopBg,
    },
    {
      label: 'IG 連結',
      description: '掌握最新動態與精彩紀錄',
      route: 'IGPage',
      image: igBg,
    },
    {
      label: '合作邀約',
      description: '與企業、學校攜手打造專屬方案',
      route: 'Cooperation',
      image: coopBg,
    },
    {
      label: '聯絡我們',
      description: '有問題想了解？我們樂意協助您！',
      route: 'WebViewPage',
      url: 'https://lin.ee/SS9LSdu',
      image: contactBg,
    },
    {
      label: '聯盟講師陣容',
      description: '認識專業講師團隊與實戰經驗背景',
      route: 'WebViewPage',
      url: 'https://apfea.oen.tw/posts/2w0EJkAgwvG7864YaQb3xpTZ9tt?locale=zh-TW',
      image: lecturerBg,
    },
  ];

  const handleClick = (btn) => {
    if (btn.route === 'WebViewPage' && btn.url) {
      navigation.navigate('WebViewPage', {
        url: btn.url,
        title: btn.label,
      });
    } else {
      navigation.navigate(btn.route);
    }
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.scrollButtonContainer}>
        {buttons.map((btn, index) => (
          <TouchableOpacity key={index} onPress={() => handleClick(btn)} style={{ marginBottom: 16 }}>
            <ImageBackground
              source={btn.image}
              style={styles.imageButtonFixed}
              imageStyle={styles.imageRadius}
              resizeMode="cover"
            >
              <Text style={styles.cardTitle}>{btn.label}</Text>
              <Text style={styles.cardDescription}>{btn.description}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </MainLayout>
  );
}


const AboutPage = () => (
  <MainLayout>
    <ImageBackground
      source={teamIntroPhoto}  // 團隊介紹圖片
      style={styles.teamIntroPhoto}  // 使用調整後的樣式
      resizeMode="contain"
    >
      <View style={styles.pageContentWrapper}>
        {/* 可以在這裡添加更多的內容，比如標題或描述 */}
        <Text style={styles.pageTitle}></Text>
        <Text style={styles.paragraph}></Text>
      </View>
    </ImageBackground>
  </MainLayout>
);

const CoursePage = () => {
  const navigation = useNavigation();

  return (
    <MainLayout>
      <ImageBackground source={healthBg} style={styles.healthBackground} resizeMode="cover">
        <View style={styles.scrollContainer}>
          <Text style={styles.pageTitle}>課程連結</Text>
          <Text style={styles.paragraph}></Text>

          <TouchableOpacity 
            style={{ marginBottom: 16 }} 
            onPress={() =>
              navigation.navigate('WebViewPage', {
                url: 'https://apfea.oen.tw/',
                title: '亞洲體適能教育協會',
              })
            }>
            <ImageBackground
              source={asiaFitnessEducationBg}
              style={styles.imageButtonFixed}
              imageStyle={styles.imageRadius}
              resizeMode="cover"
            >
              <Text style={styles.cardTitle}>亞洲體適能教育協會</Text>
              <Text style={styles.cardDescription}>了解更多有關我們的課程及專業發展。</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ marginBottom: 16 }} 
            onPress={() =>
              navigation.navigate('WebViewPage', {
                url: 'https://apfea.oen.tw/events/2wBSspJSGCGh73tDzxdRjq3ATkh',
                title: '國際全方位動能教練協會',
              })
            }>
            <ImageBackground
              source={internationalCoachBg}
              style={styles.imageButtonFixed}
              imageStyle={styles.imageRadius}
              resizeMode="cover"
            >
              <Text style={styles.cardTitle}>國際全方位動能教練協會</Text>
              <Text style={styles.cardDescription}>了解更多有關我們的專業課程與發展。</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </MainLayout>
  );
};

const CooperationPage = () => (
  <MainLayout>
    <View style={styles.pageContentWrapper}>
      <Image
        source={cooperationImage}
        style={styles.cooperationImage}
        resizeMode="contain"
      />
    </View>
  </MainLayout>
);

const LecturersPage = () => (
  <MainLayout>
    <View style={styles.pageContentWrapper}>
      <Text style={styles.pageTitle}>講師陣容</Text>
      <Text style={styles.paragraph}>我們的講師團隊來自各大專業領域，擁有豐富的教學與實戰經驗。</Text>
    </View>
  </MainLayout>
);

const HealthPage = () => {
  const navigation = useNavigation();
  const [showTestButtons, setShowTestButtons] = useState(false);
  const [hasTestButtonsBeenShown, setHasTestButtonsBeenShown] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  const healthButtons = [
    {
      label: '預約物理治療師、健身教練',
      description: '一鍵預約，獲得專業指導與客製化建議',
      url: 'https://lin.ee/kromgm2',
      image: contactBg,
    },
    {
      label: '課程連結',
      description: '探索多元專業課程，進修與自我提升首選',
      route: 'Course',
      image: courseBg,
    },
  ];

  const handleClick = (btn) => {
    if (btn.url) {
      navigation.navigate('WebViewPage', {
        url: btn.url,
        title: btn.label,
      });
    } else if (btn.route) {
      navigation.navigate(btn.route);
    }
  };

  return (
    <MainLayout>
      <ImageBackground source={healthBg} style={styles.healthBackground} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollButtonContainer}>
          <Text style={styles.pageTitle}></Text>
          <Text style={styles.paragraph}></Text>

          {!hasTestButtonsBeenShown && healthButtons.map((btn, index) => (
            <TouchableOpacity key={index} onPress={() => handleClick(btn)} style={{ marginBottom: 16 }}>
              <ImageBackground
                source={btn.image}
                style={styles.imageButtonFixed}
                imageStyle={styles.imageRadius}
                resizeMode="cover"
              >
                <Text style={styles.cardTitle}>{btn.label}</Text>
                <Text style={styles.cardDescription}>{btn.description}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}

          {showTestButtons && (
            <>
              <TouchableOpacity style={{ marginBottom: 16 }} onPress={() => alert('關節健康自評')}>
                <ImageBackground
                  source={courseBg}
                  style={styles.imageButtonFixed}
                  imageStyle={styles.imageRadius}
                  resizeMode="cover"
                >
                  <Text style={styles.cardTitle}>關節健康自評</Text>
                  <Text style={styles.cardDescription}>檢測您的關節健康狀況</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginBottom: 16 }} onPress={() => alert('肌少症風險自評')}>
                <ImageBackground
                  source={courseBg}
                  style={styles.imageButtonFixed}
                  imageStyle={styles.imageRadius}
                  resizeMode="cover"
                >
                  <Text style={styles.cardTitle}>肌少症風險自評</Text>
                  <Text style={styles.cardDescription}>了解您是否有肌少症風險</Text>
                </ImageBackground>
              </TouchableOpacity>
            </>
          )}

          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.replace('Health')}
            >
              <Text style={styles.backButtonText}>上一頁</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </ImageBackground>
    </MainLayout>
  );
};


const IGPage = () => {
  const navigation = useNavigation();

  return (
    <MainLayout>
      <ImageBackground source={healthBg} style={styles.healthBackground} resizeMode="cover">
        <View style={styles.scrollContainer}>
          <Text style={styles.pageTitle}>IG 連結</Text>

          <TouchableOpacity 
            style={{ marginBottom: 16 }} 
            onPress={() =>
              navigation.navigate('WebViewPage', {
                url: 'https://www.instagram.com/apfea1624?igsh=cXdsZHliMHB4NnYw&utm_source=qr',
                title: '亞洲體適能教育協會',
              })
            }>
            <ImageBackground
              source={asiaFitnessEducationBg}
              style={styles.imageButtonFixed}
              imageStyle={styles.imageRadius}
              resizeMode="cover"
            >
              <Text style={styles.cardTitle}>亞洲體適能教育協會</Text>
              <Text style={styles.cardDescription}>了解更多有關我們的課程及專業發展。</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ marginBottom: 16 }} 
            onPress={() =>
              navigation.navigate('WebViewPage', {
                url: 'https://www.instagram.com/hmcformosa?igsh=MTFwNjloZjNrMGZmeQ&utm_source=qr',
                title: '國際全方位動能教練協會',
              })
            }>
            <ImageBackground
              source={internationalCoachBg}
              style={styles.imageButtonFixed}
              imageStyle={styles.imageRadius}
              resizeMode="cover"
            >
              <Text style={styles.cardTitle}>國際全方位動能教練協會</Text>
              <Text style={styles.cardDescription}>探索更多專業課程與認證計畫。</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </MainLayout>
  );
};

const sliderImages = [
  require('./assets/slider/slide1.png'),
  require('./assets/slider/slide2.png'),
  require('./assets/slider/slide3.png'),
  require('./assets/slider/slide4.png'),
];

const LogoPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const flatListRef = useRef(null);
  const scrollTimer = useRef(null);
  const isUserInteracting = useRef(false);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height - 160;

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll();
    scrollTimer.current = setInterval(() => {
      if (isUserInteracting.current) return;
      if (!flatListRef.current || !flatListRef.current.scrollToIndex) return;

      const nextIndex = (currentIndexRef.current + 1) % sliderImages.length;
      try {
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
        currentIndexRef.current = nextIndex;
      } catch (error) {
        console.log('Error scrolling to index:', error);
      }
    }, 2000);
  };

  const stopAutoScroll = () => {
    if (scrollTimer.current) {
      clearInterval(scrollTimer.current);
      scrollTimer.current = null;
    }
  };

  const handleScrollBeginDrag = () => {
    isUserInteracting.current = true;
    stopAutoScroll();
  };

  const handleScrollEndDrag = () => {
    isUserInteracting.current = false;
    startAutoScroll();
  };

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  return (
    <MainLayout>
      <View style={{ marginTop: 50 }}>
        <FlatList
          ref={flatListRef}
          data={sliderImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={{
                width: screenWidth,
                height: screenHeight,
                resizeMode: 'cover',
              }}
            />
          )}
        />

        <View style={{
          position: 'absolute',
          bottom: 30,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          {sliderImages.map((_, index) => (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 6,
                backgroundColor: currentIndex === index ? '#6C44AF' : '#ccc',
              }}
            />
          ))}
        </View>
      </View>
    </MainLayout>
  );
};


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    Asset.loadAsync([
      // 全部圖片預載
      aboutBg, courseBg, igBg, coopBg, contactBg, lecturerBg,
      asiaFitnessEducationBg, internationalCoachBg,
      cooperationImage, healthBg, teamIntroPhoto,
      slide1, slide2, slide3, slide4,
    ]);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LogoPage" component={LogoPage} />
        <Stack.Screen name="About" component={AboutPage} />
        <Stack.Screen name="Course" component={CoursePage} />
        <Stack.Screen name="IGPage" component={IGPage} />
        <Stack.Screen name="Cooperation" component={CooperationPage} />
        <Stack.Screen name="Lecturers" component={LecturersPage} />
        <Stack.Screen name="Health" component={HealthPage} />
        <Stack.Screen name="WebViewPage" component={WebViewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollButtonContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  pageContentWrapper: {
    flexGrow: 1,
    minHeight: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonFixed: {
    width: 320,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#F6F1FF',
  },
  imageRadius: {
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B0082',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(230, 220, 255, 0.6)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  logo: {
    width: 360,
    height: 360,
    marginBottom: 16,
  },
  titleBold: {
    fontSize: 36,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: '#6C44AF',
    width: '100%',
    maxWidth: 400,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: 'transparent',
  },
  bottomButtonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
  },
  fixedLogo: {
    width: 65,
    height: 65,
    marginHorizontal: 8,
  },
  healthBackground: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    backgroundColor: '#6C44AF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fullScreenImage: {
    width: '100%',
    height: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cooperationImage: {
    width: '120%',        // 調整寬度為螢幕的 90%（可以根據需求調整）
    height: 700,         // 固定高度為 300 像素（可以根據需求調整）
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain', // 保持圖片比例，避免裁切
    alignSelf: 'center',  // 使圖片置中
    marginTop: 50,
  },
  carouselWrapper: {
    paddingTop: 20,
  },
  slideImageScroll: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 160,
    marginTop: 20, // 向下移動 20 像素
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  // 更新這裡的 teamIntroPhoto
  teamIntroPhoto: {
  width: '106%',          // 設定寬度為 100%（圖片將佔滿整個螢幕寬度）
  height: 700,            // 設定圖片的固定高度（可以根據需求調整）
  resizeMode: 'contain',  // 保持圖片比例，避免裁切
  alignSelf: 'center',    // 使圖片置中
  marginTop: 70,          // 上方距離，讓圖片稍微下移
  justifyContent: 'center', // 垂直居中
  alignItems: 'center',   // 水平居中
}
})