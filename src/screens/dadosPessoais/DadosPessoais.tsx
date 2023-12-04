import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootState } from "../../redux/root-reducer";
import { useSelector } from "react-redux";
import { User } from "../../types/user/User";
import DefaultScreenContainer from "../../components/atoms/DefaultScreenContainer";

type Props = {};

const DadosPessoais = (props: Props) => {
  const user: User = useSelector((state: RootState) => state.user.user);
  return (
    <DefaultScreenContainer>
      <Text>DadosPessoais</Text>

      <View>
        <Text>Nome</Text>
        <Text>{user.name}</Text>
      </View>
      <View>
        <Text>E-mail</Text>
        <Text>{user.email}</Text>
      </View>
    </DefaultScreenContainer>
  );
};

export default DadosPessoais;

const styles = StyleSheet.create({});
