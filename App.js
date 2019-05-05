import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,
  WebView
} from 'react-native';
import { Permissions, Notifications } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      notification: null,
      title: 'Hello World',
      body: 'Say something!',
      clicked: false 
    };

  }

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();

    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token,
    });
  }

  async sendSOS()  {
    return fetch('http://22d54d89.ngrok.io/call', {
      body: JSON.stringify({
        safe: "lel"
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  checkClickedNotification = () => {
    return this.state.clicked;
  }

  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  handleNotification = notification => {
    this.setState({
      notification,
    });
    console.log(notification.origin);
    if(notification.origin == "received") {
      let that = this;
      setTimeout(function(){
        if(that.state.clicked == false) {
          that.sendSOS();
          console.log("works!!!! YEET");
        }
      }, 10000);
    }

    if(notification.origin == "selected") {
      // this.sendSOS();
      this.setState({clicked: true});
    }
  };

  componentDidMount(){
    this.registerForPushNotifications();
  }


  render() {
    return (
      <WebView
        source={{uri: 'https://sayamkanwar.com/ah19/index.html'}}
        style={{marginTop: 20}}
      />
      
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    padding: 8,
  },
  text: {
    paddingBottom: 2,
    padding: 8,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
    width: '95%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 8,
    padding: 8,
    width: '95%',
  },
});