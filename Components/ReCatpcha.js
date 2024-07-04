/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import Tts from 'react-native-tts';

const ReCaptcha = ({ onCaptchaChange, onCharacterSpoken }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [svgHeight, setSvgHeight] = useState(60);
  const [waveControlPoints, setWaveControlPoints] = useState([]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (captchaText) {
      calculateWaveControlPoints();
      onCaptchaChange(captchaText);
    }
  }, [captchaText]);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(captcha);
  };

  const calculateWaveControlPoints = () => {
    const controlPoints = [];
    const amplitude = 10;
    const frequency = 1;

    for (let i = 0; i < captchaText.length; i++) {
      const x = (i + 0.5) * (180 / captchaText.length) + 10 * Math.sin(i);
      const randomOffset = Math.random() * 10 - 5;
      const y = 20 + amplitude * Math.sin(frequency * (i / captchaText.length * 2 * Math.PI)) + randomOffset;
      controlPoints.push({ x, y });
    }

    setWaveControlPoints(controlPoints);
    setSvgHeight(Math.max(...controlPoints.map(point => point.y)) + 40);
  };

  const renderCaptcha = () => {
    const svgWidth = 180;

    if (waveControlPoints.length === 0) {
      return null;
    }

    const d = waveControlPoints.map((point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      } else {
        const prevPoint = waveControlPoints[index - 1];
        const cx = (point.x + prevPoint.x) / 2;
        const cy = (point.y + prevPoint.y) / 2;
        return `Q ${cx} ${cy} ${point.x} ${point.y}`;
      }
    }).join(' ');

    return (
      <Svg height={svgHeight} width={svgWidth}>
        <Path
          d={d}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
        {captchaText.split('').map((char, index) => (
          <SvgText
            key={index}
            x={index * 20 + 15}
            y={40 + 10 * Math.sin(index)}
            fill="black"
            fontSize="18"
            fontFamily="RubikDistressed-Regular"
            textAnchor="middle"
          >
            {char}
          </SvgText>
        ))}
      </Svg>
    );
  };

  const speakCaptcha = () => {
    captchaText.split('').forEach((char, index) => {
      setTimeout(() => {
        Tts.speak(char);
        onCharacterSpoken(char);
      }, index * 500); 
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.captchaContainer}>
          <View style={styles.captchaBackground}>
            {renderCaptcha()}
          </View>
          <TouchableOpacity onPress={generateCaptcha} style={styles.refreshButton}>
            <Text style={styles.refreshText}>↻</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={speakCaptcha} style={styles.speakerButton}>
            <Text style={styles.speakerText}>🔊</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  card: {
    elevation: 5,
    marginTop: '1%',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  captchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  captchaBackground: {
    width: '70%',
    backgroundColor: 'rgba(4, 7, 1, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    marginRight: '5%',
    height: '70%',
  },
  refreshButton: {
    marginLeft: '3%',
  },
  refreshText: {
    fontSize: 26,
    color: '#00008B',
  },
  speakerButton: {
    marginLeft: '3%',
  },
  speakerText: {
    fontSize: 23,
    color: '#00008B',
  },
});

export default ReCaptcha;



/* eslint-disable prettier/prettier */
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Card } from 'react-native-paper';
// import Svg, { Path, Text as SvgText } from 'react-native-svg';

// const ReCaptcha = ({ onCaptchaChange }) => {
//   const [captchaText, setCaptchaText] = useState('');
//   const [svgHeight, setSvgHeight] = useState(60);
//   const [waveControlPoints, setWaveControlPoints] = useState([]);

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   useEffect(() => {
//     if (captchaText) {
//       calculateWaveControlPoints();
//       onCaptchaChange(captchaText);
//     }
//   }, [captchaText]);

//   const generateCaptcha = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let captcha = '';
//     for (let i = 0; i < 6; i++) {
//       captcha += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     setCaptchaText(captcha);
//   };

//   const calculateWaveControlPoints = () => {
//     const controlPoints = [];
//     const amplitude = 10;
//     const frequency = 1;

//     for (let i = 0; i < captchaText.length; i++) {
//       const x = (i + 0.5) * (180 / captchaText.length) + 10 * Math.sin(i);
//       const randomOffset = Math.random() * 10 - 5;
//       const y = 20 + amplitude * Math.sin(frequency * (i / captchaText.length * 2 * Math.PI)) + randomOffset;
//       controlPoints.push({ x, y });
//     }

//     setWaveControlPoints(controlPoints);
//     setSvgHeight(Math.max(...controlPoints.map(point => point.y)) + 40);
//   };

//   const renderCaptcha = () => {
//     const svgWidth = 180;

//     if (waveControlPoints.length === 0) {
//       return null;
//     }

//     const d = waveControlPoints.map((point, index) => {
//       if (index === 0) {
//         return `M ${point.x} ${point.y}`;
//       } else {
//         const prevPoint = waveControlPoints[index - 1];
//         const cx = (point.x + prevPoint.x) / 2;
//         const cy = (point.y + prevPoint.y) / 2;
//         return `Q ${cx} ${cy} ${point.x} ${point.y}`;
//       }
//     }).join(' ');

//     return (
//       <Svg height={svgHeight} width={svgWidth}>
//         <Path
//           d={d}
//           fill="none"
//           stroke="black"
//           strokeWidth="2"
//         />
//         {captchaText.split('').map((char, index) => (
//           <SvgText
//             key={index}
//             x={index * 20 + 15}
//             y={40 + 10 * Math.sin(index)}
//             fill="black"
//             fontSize="18"
//             fontFamily="RubikDistressed-Regular"
//             textAnchor="middle"
//           >
//             {char}
//           </SvgText>
//         ))}
//       </Svg>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Card style={styles.card}>
//         <View style={styles.captchaContainer}>
//           <View style={styles.captchaBackground}>
//             {renderCaptcha()}
//           </View>
//           <TouchableOpacity onPress={generateCaptcha} style={styles.refreshButton}>
//             <Text style={styles.refreshText}>↻</Text>
//           </TouchableOpacity>
//         </View>
//       </Card>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5fcff',
//   },
//   card: {
//     elevation: 5,
//     marginTop: '1%',
//     width: '90%',
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//   },
//   captchaContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   captchaBackground: {
//     width: '80%',
//     backgroundColor: 'rgba(4, 7, 1, 0.35)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: 'gray',
//     borderRadius: 20,
//     borderWidth: 1,
//     position: 'relative',
//     overflow: 'hidden',
//     marginRight: '5%',
//     height: '70%',
//   },
//   refreshButton: {
//     marginLeft: '5%',
//   },
//   refreshText: {
//     fontSize: 26,
//     color: '#00008B',
//   },
// });

// export default ReCaptcha;




// // /* eslint-disable prettier/prettier */
// // import React, { useRef } from 'react';
// // import { WebView } from 'react-native-webview';
// // import { View, StyleSheet, ActivityIndicator } from 'react-native';

// // const ReCaptcha = ({ onMessage, siteKey }) => {
// //   const webviewRef = useRef(null);

// //   const html = `
// //     <!DOCTYPE html>
// //     <html lang="en">
// //     <head>
// //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //       <title>ReCAPTCHA</title>
// //       <script src="https://www.google.com/recaptcha/api.js" async defer></script>
// //     </head>
// //     <body>
// //       <div id="recaptcha-container"></div>
// //       <script type="text/javascript">
// //         function sendToken(token) {
// //           window.ReactNativeWebView.postMessage(token);
// //         }

// //         document.getElementById("recaptcha-container").innerHTML = '<div class="g-recaptcha" data-sitekey="${siteKey}" data-callback="sendToken"></div>';
// //       </script>
// //     </body>
// //     </html>
// //   `;

// //   return (
// //     <View style={styles.container}>
// //       <WebView
// //         ref={webviewRef}
// //         originWhitelist={['*']}
// //         source={{ html }}
// //         onMessage={(event) => onMessage(event.nativeEvent.data)}
// //         style={styles.webview}
// //         startInLoadingState={true}
// //         renderLoading={() => <ActivityIndicator size="small" color="#0000ff" />}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     marginTop:'2%',

// //     backgroundColor: '#fff',
// //     // borderWidth:1,
// //     // borderColor:'grey',
// //   },
// //   webview: {
// //     width: '80%',
// //     height: 95,
// //   },
// // });

// // export default ReCaptcha;


