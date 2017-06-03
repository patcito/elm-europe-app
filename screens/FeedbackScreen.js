import React from 'react';
import {Expo, MapView, WebBrowser} from 'expo';
import flagBlueImg from '../assets/flag-blue.png';

import {
  TextInput,
  ScrollView,
  Slider,
  Switch,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  StyleSheet,
} from 'react-native';

import GrowingTextInput from '../components/GrowingTextInput';
const LATITUDE = 48.7887337;
const LONGITUDE = 2.3637327;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const SPACE = 0.01;

export default class FeedbackScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#050B7A',
    },
    headerTitle: 'Getting there',
    headerTintColor: '#fff',
  };

  state = {
    feedbackText: '',
    isUrgent: false,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          style={styles.scrollView}>

          <SectionLabel title="Contact Information" />
          <View style={[styles.row, styles.firstRow]}>
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
		  initialRegion={{
		  latitude: LATITUDE,
          longitude: LONGITUDE,
		  latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
		  }}
        >
          <MapView.Marker
			onPress={this._handlePressButtonAsync}
            coordinate={{
              latitude: LATITUDE + SPACE,
              longitude: LONGITUDE + SPACE,
            }}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
            image={require('../assets/flag-blue.png')}
          >
            <Text style={styles.marker}>X</Text>
          </MapView.Marker>
</MapView>
          </View>

          <SectionLabel title="Location" />
          <View style={[styles.row, styles.firstRow]}>

            {/* https://snack.expo.io/ByW4CFPx- */}
            <Text
              ref={view => {
                this._feedbackInput = view;
              }}
              style={[styles.textInputRow, styles.multiLineTextInputRow, {height: 60}]}
            >Efrei, 30-32 Avenue de la République, 94800, Villejuif, France</Text>

          </View>

          <SectionLabel title="Credits" />
          <View style={[styles.row, styles.firstRow]}>

            {/* https://snack.expo.io/ByW4CFPx- */}
      <TouchableOpacity
			onPress={() => this._handlePressExpoAsync()}
>
            <Text
              minHeight={80}
              style={[styles.textInputRow, styles.multiLineTextInputRow, {height: 60}]}
            >Built with expo.io, thanks to the expo.io team for letting us re-use this code.</Text>
      </TouchableOpacity>

          </View>
        </ScrollView>
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
  _handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync('https://www.google.com/maps/place/Efrei/@48.78873369999999,2.363732700000014,17z');
  };
  _handlePressExpoAsync = async () => {
    await WebBrowser.openBrowserAsync('https://expo.io');
  };  _renderSubmitButton = () => {
    return (
      <TouchableOpacity
        onPress={() => alert('pressed!')}
        style={styles.submitButton}>
        <Text style={styles.submitButtonText}>
          Submit Feedback
        </Text>
      </TouchableOpacity>
    );
  };
}

const SectionLabel = ({ title }) => (
  <Text
    style={{
      color: '#909090',
      fontWeight: '400',
      fontSize: 13,
      marginTop: 20,
      marginBottom: 10,
      marginHorizontal: 15,
    }}>
    {title.toUpperCase()}
  </Text>
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F8F9',
  },
  rowTitle: {
    marginBottom: 7,
  },
  rowTitleText: {
    fontWeight: '500',
    color: 'rgba(0,0,0,0.9)',
  },
  row: {
    backgroundColor: '#fff',
    borderBottomColor: '#EAEBED',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  firstRow: {
    borderTopColor: '#EAEBED',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  textInputRow: {
    height: 50,
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
  },
  multiLineTextInputRow: {
    paddingVertical: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#3B3F8C',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
