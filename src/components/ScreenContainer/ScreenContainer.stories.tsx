import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react-native";
import MyScreenContainer, { Props } from "./ScreenContainer";
import { View } from "react-native";

const MyScreenContainerMeta: ComponentMeta<typeof MyScreenContainer> = {
  title: "MyScreenContainer",
  component: MyScreenContainer,
  args: {
    children: <></>,
  },
  decorators: [(Story) => <Story />],
};

export default MyScreenContainerMeta;

type MyScreenContainerStory = ComponentStory<typeof MyScreenContainer>;

export const Basic: MyScreenContainerStory = (args: Props) => (
  <MyScreenContainer {...args} />
);
