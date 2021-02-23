import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
    Button,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import axios from "axios";
import { CirclesLoader, TextLoader } from "react-native-indicator";

export default function SignUpScreen({ setToken }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [change, setChange] = useState("");
    const [hide, setHide] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState(null);

    const navigation = useNavigation();

    const handleSignUp = async () => {
        try {
            if (
                email === "" ||
                username === "" ||
                description === "" ||
                password === ""
            ) {
                return setChange("Missing parameters");
            }
            if (password !== confirmPassword) {
                return setChange("The 2 passwords are not identical");
            }
            setChange("");
            setDisabled(true);

            const response = await axios.post(
                "https://express-airbnb-api.herokuapp.com/user/sign_up",
                {
                    email: email,
                    username: username,
                    description: description,
                    password: password,
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            setData(response.data);
            setDisabled(false);
            alert("Registered Successfully");
        } catch (error) {
            console.log(error.message);
            setDisabled(false);

            if (
                error.response.data.error ===
                "This email already has an account."
            ) {
                return setChange("This email is already registered");
            }
            if (
                error.response.data.error ===
                "This username already has an account."
            ) {
                return setChange(
                    "This username already exist, please modify your username"
                );
            }
            setChange("");
        }
    };

    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../assets/logo-airbnb.png")}
                resizeMode="contain"
                style={styles.img}
            />
            <Text>Sign up</Text>

            <TextInput
                placeholder="Email"
                onChangeText={(email) => {
                    setEmail(email);
                }}
            />

            <TextInput
                placeholder="Username"
                onChangeText={(username) => {
                    setUsername(username);
                }}
            />
            <TextInput
                placeholder="Describe yourself in a few words..."
                onChangeText={(description) => {
                    setDescription(description);
                }}
            />
            <View>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={hide}
                    onChangeText={(password) => {
                        setPassword(password);
                    }}
                />
                {hide ? (
                    <Entypo
                        name="eye"
                        size={24}
                        color="black"
                        onPress={() => {
                            setHide(false);
                        }}
                    />
                ) : (
                    <Entypo
                        name="eye-with-line"
                        size={24}
                        color="black"
                        onPress={() => {
                            setHide(true);
                        }}
                    />
                )}
            </View>
            <View>
                <TextInput
                    placeholder="Confirm password"
                    secureTextEntry={hide}
                    onChangeText={(confirmPassword) => {
                        setConfirmPassword(confirmPassword);
                    }}
                />
                {hide ? (
                    <Entypo
                        name="eye"
                        size={24}
                        color="black"
                        onPress={() => {
                            setHide(false);
                        }}
                    />
                ) : (
                    <Entypo
                        name="eye-with-line"
                        size={24}
                        color="black"
                        onPress={() => {
                            setHide(true);
                        }}
                    />
                )}
            </View>
            <Text>{change}</Text>
            <Button
                title="Sign up"
                onPress={handleSignUp}
                disabled={disabled}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SignIn");
                }}
            >
                <Text>Already have an account ? Sign in</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    img: {
        height: 100,
        width: 100,
    },
});
