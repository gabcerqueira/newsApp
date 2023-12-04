import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/atoms/CustomInput";
import CustomButton from "../../components/atoms/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { createAccountStart } from "../../features/user/userActions/userActions";
import { User } from "../../types/user/User";
import { RootState } from "../../redux/root-reducer";

type Props = {};

const CriarConta = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state: RootState) => state.user);

  const createAccount = () => {
    const newAccount: User = {
      name,
      email,
      password,
      active: false,
      _id: "",
      userProfile: {},
    };

    dispatch(createAccountStart(newAccount));
  };

  return (
    <View style={styles.container}>
      <View style={styles.blockContainer}>
        <Text>Digite seus dados</Text>
        <CustomInput
          label={"Nome"}
          placeholder={"Digite seu nome"}
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.inputStyle}
          mode="outlined"
        />
        <CustomInput
          label={"E-mail"}
          placeholder={"Digite seu e-mail"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputStyle}
          mode="outlined"
        />
        <CustomInput
          label={"Senha"}
          placeholder={"Digite sua senha"}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputStyle}
          mode="outlined"
          secureTextEntry
        />
      </View>
      <View style={styles.blockContainer}>
        <CustomButton
          title={"Criar"}
          style={{ width: "90%", alignSelf: "center" }}
          onPress={() => createAccount()}
          loading={isFetching}
        />
      </View>
    </View>
  );
};

export default CriarConta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  blockContainer: { width: "95%", alignSelf: "center", padding: 10 },
  imageContainer: {
    flex: 0.3,
    //borderWidth:2
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputStyle: {
    marginVertical: 15,
  },
  inputStylePassword: {
    marginVertical: 5,
    width: "100%",
  },
});
