import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';

import styles from './EnterprisePlanScreenStyle';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import HugeText from 'qualificame-native/app/components/HugeText';
import TitleText from 'qualificame-native/app/components/TitleText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import ListItem from 'qualificame-native/app/components/ListItem';
import BottomBanner from 'qualificame-native/app/components/BottomBanner';
import IconBottomText from 'qualificame-native/app/components/IconBottomText';
import BubbleImages from 'qualificame-native/app/components/BubbleImages';
import IconAndText from 'qualificame-native/app/components/IconAndText';
import BackBtn from 'qualificame-native/app/components/BackBtn';
//import EmptyMailbox from 'qualificame-native/app/components/EmptyMailbox';

export default class EnterprisePlanScreen extends Component {  
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={styles.container}>
      <HeaderNavbar 
        left={ <BackBtn color='white'/> }
        center={
          <TitleText 
            text="Plan Enterprise"
            color="white"
          />
        }
        right={
          <AlertBtn 
            onPress={()=> this.props.navigation.navigate('AlertsScreen')}
          />
        }
        bgColor="pink"
        statusBar="light-content"
      />
      <ScrollView>  
          <View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin, styles.flex1]}>
            <HugeText 
              text="La mejor opción para grandes negocios"
              weight="bold"
              color="pink"
            />
            <View style={styles.smallVerticalMargin}>
              <SubtitleText 
                text="¿Qué es el plan Enterprise?"
                weight="bold"
              />
              <ListItem 
                color="pink"
                addVerticalMargin
                text="Es un complemento basado en suscripción que agrega varias funciones premium a la experiencia básica de Qualificame."
              />
            </View>
            <View style={[styles.centerObjects, styles.smallVerticalMargin]}>  
              <IconBottomText 
                iconName= 'home'
                color= 'pink'
                title= 'Monitorea todas tus franquicias'
              />
            </View>
            <View style={styles.smallVerticalMargin}>
              <SubtitleText 
                text="Conoce a la comunidad de tu negocio"
                align="center"
                weight="medium"
              />              
            </View>
            <View style={[styles.centerObjects, styles.baseVerticalMargin, styles.baseHorizontalMargin]}>  
              <BubbleImages 
                firstText= 'Mantenlos contentos'
                secondText= 'Haz crecer tus negocios'
                thirdText= 'Monitorea a tu personal'
              />
            </View>
            <View style={[styles.row, styles.justifyContentCenter]}>
              <View style={[styles.smallVerticalMargin]}>  
                <IconAndText
                  iconName= 'check-square'
                  text= 'Todas las funciones del Kiosko'
                  iconColor= 'pink'
                  addVerticalMargin
                  />
                <IconAndText
                  iconName= 'check-square'
                  text= 'Reportes personalizados'
                  iconColor= 'pink'
                  addVerticalMargin
                  />
                <IconAndText
                  iconName= 'check-square'
                  text= 'Soporte técnico de prioridad'
                  iconColor= 'pink'
                  addVerticalMargin
                  />
                <IconAndText
                  iconName= 'check-square'
                  text= 'Usuarios ilimitados de kiosko'
                  iconColor= 'pink'
                  addVerticalMargin
                  />
                <View style={styles.paddingBottom} />
              </View>
            </View>
          </View>
      </ScrollView>
      <SafeAreaView style={styles.footerStyle}>
        <BottomBanner 
          text="Contáctanos para convertirte en Enterprise"
          textBtn="Llamar"
        />
      </SafeAreaView>
      </View>
    );
  }
}