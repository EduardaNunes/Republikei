import {Image, View, TouchableOpacity, FlatList, Modal, Alert, Linking} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons"

import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

import {styles} from "./styles"
import { colors } from '@/styles/colors';
import { SquareButton } from '@/components/button';
import { Text } from "@/components/text";
import { Input } from '@/components/input';
import { Category } from '@/components/category';
import { Categories } from '@/components/categories';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '@/components/backButton';

import { Session } from '@supabase/supabase-js';


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)

    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (

    <SafeAreaProvider style={styles.container}>
        <BackButton style={styles.backButton} icon={"arrow-back"} />
        <SafeAreaView style={styles.imgContainer}>
            <Image
            source={require("@/assets/login-icon.png")}
            />
            <Text style={styles.title}> LOGIN </Text>
        </SafeAreaView>

      <View style={styles.containerTextAndButton}>
        {session && session.user && <Text>{session.user.id}</Text>}
        <View style={styles.inputContainer}>
        <Input
            title="Email"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />

          <Input
            title="Senha"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.buttonContainer}>
            <SquareButton 
              name="Entrar" 
              disabled={loading} 
              onPress={() => signInWithEmail()}
            />
            <View style={styles.signInContainer}>
                <Text>Não tem Login?</Text>
                <TouchableOpacity>
                    <Text style={styles.signInText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        </View>
      </View>
    </SafeAreaProvider>
  );
}

