/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from './Screens/LoginPage';
import OtpPage from './Screens/OtpPage';
import ProfileDetailsPage from './Screens/ProfileDetailsPage';
import ComplaintRegistration from './Screens/ComplaintRegistration';
import PhysicalFirDoc from './Screens/PhysicalFirDoc';
import TrackComplaint from './Screens/TrackComplaint';
import GrievanceReport from './Screens/GrievanceReport';
import IncidentReport from './Screens/IncidentReport';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SsoLogin from './Screens/SsoLogin';
import ViewIncident from './Components/ViewIncident';

GoogleSignin.configure({
  webClientId: '287325475820-vdt0u2vujobe17k38055ujvcv78prq23.apps.googleusercontent.com',
  androidClientId: '287325475820-cu92c1vcdtqc0rc99aagst2rqdu7hg3v.apps.googleusercontent.com',
  hostedDomain: '',
  forceConsentPrompt: true,
  profileImageSize: 0,
  loginHint: '',
  openIdRealm: '',
  openIdProvider: '',

})

function SplashLogo({ navigation }) {
  setTimeout(() => {
    navigation.replace('SplashTitle');
  }, 200);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./Assets/logo/maha.jpg')}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
}

function SplashTitle({ navigation }) {
  setTimeout(() => {
    navigation.replace('SplashImage');
  }, 700);
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.imageContainer}>
      <Text style={styles.text}>MAHA CYBER</Text>
      <View style={styles.overlayContainer}>
        <Image
          source={require('./Assets/logo/cyber-security.png')}
          style={styles.imagelock}
        />
        <Image
          source={require('./Assets/logo/maha.jpg')}
          style={styles.imageTitle}
        />
      </View>
    </View>
  </SafeAreaView>
  );
}


function SplashImage({ navigation }) {
  setTimeout(() => {
    navigation.replace('Login');
  }, 1000);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.text}>MAHA CYBER</Text>
        <Image
          source={require('./Assets/logo/maha.jpg')}
          style={styles.image}
        />
      </View>
      <View>
      <ActivityIndicator size="large" color="#0000ff" />


      </View>
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('./Assets/logo/bugs.jpg')}
          style={styles.imageBugs}
        />
      </View>

    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashLogo">

            <Stack.Screen name="SplashLogo" component={SplashLogo} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
            <Stack.Screen name="SplashTitle" component={SplashTitle} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
            <Stack.Screen name="SplashImage" component={SplashImage} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />

            <Stack.Screen name="Login" component={LoginPage} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
            <Stack.Screen name="OtpPage" component={OtpPage} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />

            <Stack.Screen name="profileDetails" component={ProfileDetailsPage} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />

            <Stack.Screen name="complaintForm" component={ComplaintRegistration} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
            <Stack.Screen name="grievanceForm" component={GrievanceReport} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
            <Stack.Screen name="incidentForm" component={IncidentReport} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
            <Stack.Screen name="physicalFir" component={PhysicalFirDoc} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
            <Stack.Screen name="trackcomplaint" component={TrackComplaint} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
             <Stack.Screen name="ssologin" component={SsoLogin} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
             <Stack.Screen name="viewincidentForm" component={ViewIncident} options={{
              headerStyle: { height: 0 },
              headerTitle: '',
              headerShown: true,
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomImageContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '6%', 
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  imagelock: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  overlayContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    position: 'absolute',
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  imageBugs: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  text: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '6%',
  },
});
