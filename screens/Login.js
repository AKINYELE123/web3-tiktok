import { Pressable, StyleSheet, Text, TextBase, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useWalletConnect } from "react-native-walletconnect";

export default function Login() {
    const {
        createSession,
        killSession,
        session,
        signPersonalMessage,
    } = useWalletConnect();

    const signMessage = async () => {
        const response = await client.query({
          query: gql`query Challenge {
            challenge(request: { address: "${address}" }) {
              text
            }
          }`,
        });
        let challenge = convertUtf8ToHex(response.data.challenge.text);
        const msgParams = [challenge, address];
        connector.signPersonalMessage(msgParams).then(async (result) => {
          getTokens(result);
        });
      };
    
    
      const getTokens = async (result) => {
        const response = await client.mutate({
          mutation: gql`mutation Authenticate {
            authenticate(request: {
              address: "${address}",
              signature: "${result}"
            }) {
              accessToken
              refreshToken
            }
          }`,
        });
        await saveItem("accessToken", response.data.authenticate.accessToken);
        await saveItem("refreshToken", response.data.authenticate.refreshToken);
    
      };
    

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.text}>Sign up for TikTok</Text>
            <Pressable
                onPress={createSession}
                style={styles.button}>
                <Text style={styles.buttonText}>
                    Connect your wallet
                </Text>
            </Pressable>
            <Text style={styles.footer}>
                Connecting your wallet & siging message, simply proves ownership of the wallet. Signing message doesn't initiate any transaction on the blockchain
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingLeft: 30,
    },
    text: {
        fontSize: 40,
        fontWeight: "700",
        width: "50%",
        lineHeight: 50,
        marginTop: 50,
    },
    button: {
        borderWidth: 1,
        width: "90%",
        marginTop: 50,
        padding: 15,
        borderColor: "#ccc",
        alignItems: "center"
    },
    buttonText: {
        fontWeight: "600",
    },
    footer: {
        position: "absolute",
        bottom: 50,
        marginLeft: 30,
        textAlign: "center",
        color: "#aaa",
    }
})
