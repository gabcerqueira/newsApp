import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import DefaultScreenContainer from "../../components/atoms/DefaultScreenContainer";
import CustomButton from "../../components/atoms/CustomButton";
import CustomInput from "../../components/atoms/CustomInput";

import { TextInput } from "react-native-paper";
import { MaskedInput } from "../../components/atoms/MaskedInput";
import CustomSwitch from "../../components/atoms/CustomSwitch";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storedCredentials } from "../../types/auth/Auth";
import { loginStart } from "../../features/user/userActions/userActions";
import { RootState } from "../../redux/root-reducer";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigations/authNavigation/AuthNavigation";
type Props = {};

const Login = (props: Props) => {
  const [login, setLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [senha, setSenha] = useState("");
  const [bioAuth, setBioAuth] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [haveStorageCredentials, setHaveStorageCredentials] = useState(
    storedCredentials.false
  );

  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const { isFetching } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async () => {
      if (bioAuth) {
        await handleBiometricAuth();
        setBioAuth(!bioAuth);
      }
    })();
  }, [bioAuth]);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      let strd = await AsyncStorage.getItem("haveStoredCredentials");

      if (!strd || strd === storedCredentials.false) {
        AsyncStorage.setItem("haveStoredCredentials", storedCredentials.false);
        setHaveStorageCredentials(storedCredentials.false);
      } else {
        setHaveStorageCredentials(storedCredentials.true);
      }
    })();
  }, []);

  const alertComponent = (
    title: string,
    message: string,
    btnTxt: string,
    btnFunc: () => void
  ) => {
    return Alert.alert(title, message, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const fallBackToDefaultAuth = () => {
    console.log("fall back to password authentication");
  };

  const handleBiometricAuth = async () => {
    if (!isBiometricSupported) {
      // Caso não seja suportado a autenticação biométrica retorna para digitar senha
      setBioAuth(!bioAuth);
      return alertComponent(
        "Favor entrar com sua senha",
        "Dispositivo sem suporte para autenticação biométrica",
        "OK",
        () => fallBackToDefaultAuth()
      );
    }
    const hasPassword = await LocalAuthentication.isEnrolledAsync();

    if (!hasPassword) {
      // Caso nao tenha digital cadastrada retorna para digitar senha
      setBioAuth(!bioAuth);
      return alertComponent(
        "Biometria não cadastrada",
        "Favor entrar com seu login e senha",
        "OK",
        () => fallBackToDefaultAuth()
      );
    }

    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Toque no sensor de digital",
      fallbackLabel: "Muitas tentativas incorretas , Favor digitar sua senha",
      cancelLabel: "Digitar senha",
      disableDeviceFallback: true,
    });

    if (success) {
      // realizar recuperação do usuario e senha para enviar para o server
      //let credentials: credentials | null = false;
      setBioAuth(!bioAuth);
      const isAvailable = await SecureStore.isAvailableAsync();

      if (!isAvailable) {
        return alertComponent(
          "Falha no Login",
          " Favor logar via usuário e senha",
          "OK",
          () => fallBackToDefaultAuth()
        );
      }

      let credentials = {
        login: "",
        password: "",
      };

      credentials.login = (await SecureStore.getItemAsync("login")) as string;
      credentials.password = (await SecureStore.getItemAsync(
        "password"
      )) as string;

      try {
        if (!credentials.login || !credentials.password) {
          return alertComponent(
            "Falha no Login",
            " Favor informar usuário e senha e tentar novamente",
            "OK",
            () => fallBackToDefaultAuth()
          );
        }

        if (credentials.login && credentials.password) {
          /*
          dispatch(
            loginStart({
              login: credentials.login,
              password: credentials.password,
            })
          );

          */
        }
      } catch (error) {
        console.log("No credentials stored");
        return alertComponent(
          "Falha no login",
          "Erro Inesperado , Favor tentar novamente",
          "OK",
          () => fallBackToDefaultAuth()
        );
      }
    }
  };

  return (
    <DefaultScreenContainer>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.imageContainer}>
          {/*
            <Image
            style={[{ width: 300, height: 150, alignSelf: "center" }]}
            source={require("../../assets/quasarLogo.png")}
            resizeMode={"contain"}
          />
            */}
        </View>
        <View style={styles.inputContainer}>
          <CustomInput
            label={"E-mail"}
            placeholder={"Digite seu e-mail"}
            value={login}
            onChangeText={(text) => setLogin(text)}
            style={styles.inputStyle}
            mode="outlined"
          />

          <CustomInput
            style={styles.inputStylePassword}
            secureTextEntry={!showPassword}
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder={"Digite sua Senha"}
            right={
              showPassword ? (
                <TextInput.Icon
                  icon={"eye"}
                  size={24}
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <TextInput.Icon
                  icon="eye-off"
                  size={24}
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              )
            }
          />
          {haveStorageCredentials == storedCredentials.true && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                alignSelf: "flex-start",
                paddingHorizontal: 20,
              }}
            >
              <CustomSwitch
                value={bioAuth}
                onValueChange={() => setBioAuth((prev) => !prev)}
              />
              <Text>Leitor digital</Text>
            </View>
          )}

          <CustomButton
            title={"Login"}
            style={{ width: "90%" }}
            onPress={() => dispatch(loginStart(login, senha))}
            loading={isFetching}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={{ fontSize: 16, marginVertical: 20 }}>
              Não tem conta ? crie sua conta !
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </DefaultScreenContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: {
    flex: 0.3,
    //borderWidth:2
    justifyContent: "flex-end",
    alignItems: "center",
  },

  inputContainer: {
    // margin: 20,
    flex: 0.65,
    alignItems: "center",
    width: "100%",

    //alignItems:'center'
  },
  inputStyle: {
    marginVertical: 15,
    width: "90%",
  },
  inputStylePassword: {
    marginVertical: 5,
    width: "90%",
  },
});
