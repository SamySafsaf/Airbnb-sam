import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
    Button,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { CirclesLoader, TextLoader } from "react-native-indicator";

export default function SignInScreen({ setToken }) {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [change, setChange] = useState("");
    const [hide, setHide] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            if (email === "" || password === "") {
                return setChange("Missing parameters");
            }
            setChange("");
            setDisabled(true);
            const response = await axios.post(
                "https://express-airbnb-api.herokuapp.com/user/log_in",
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            setDisabled(false);
            setData(response.data);
            console.log(response.data);
            alert("Connected");
        } catch (error) {
            console.log(error.response);
            setDisabled(false);
            if (error.response.data.error === "Unauthorized") {
                return setChange("Wrong email or password");
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
            <Text>Sign in</Text>
            <TextInput
                placeholder="email"
                onChangeText={(email) => {
                    setEmail(email);
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
            <Text>{change}</Text>
            {loading && (
                <View>
                    <CirclesLoader />
                </View>
            )}
            <Button
                title="Sign in"
                onPress={handleSignIn}
                disabled={disabled}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SignUp");
                }}
            >
                <Text>No account ? Register</Text>
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
