import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface InputSelect {
  label: string;
  value: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<InputSelect[]>([]);
  const [cities, setCities] = useState<InputSelect[]>([]);

  const [selectedUf, setSelectedUf] = useState('undefined');
  const [selectedCity, setSelectedCity] = useState('undefined');

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => ({
          label: uf.sigla,
          value: uf.sigla,
        })) as InputSelect[];
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf == undefined) {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityName = response.data.map((city) => ({
          label: city.nome,
          value: city.nome,
        })) as InputSelect[];
        setCities(cityName);
      });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      selectedUf,
      selectedCity,
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
          </View>
          <View>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            style={{
              viewContainer: {
                backgroundColor: '#FFF',
                height: 60,
                borderRadius: 10,
                marginBottom: 8,
                paddingHorizontal: 24,
              },
              inputAndroid: {
                fontSize: 16,
              },
            }}
            placeholder={{ label: 'Escolha a UF' }}
            onValueChange={(value) => setSelectedUf(value)}
            items={ufs}
          />
          <RNPickerSelect
            style={{
              viewContainer: {
                backgroundColor: '#FFF',
                height: 60,
                borderRadius: 10,
                marginBottom: 8,
                paddingHorizontal: 24,
              },
              inputAndroid: {
                fontSize: 16,
              },
            }}
            placeholder={{ label: 'Escolha a cidade' }}
            onValueChange={(value) => setSelectedCity(value)}
            items={cities}
          />
          <RectButton
            style={styles.button}
            onPress={() => handleNavigateToPoints()}
          >
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default Home;
