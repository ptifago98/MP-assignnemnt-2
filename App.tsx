import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';

export default function App() {

  const [numberToGuess, setRandomNumber] = useState<number>(0);
  const [guess, setGuess] = useState("");
  const [numberOfGuesses, setNumberOfGuess] = useState<number>(0);
  const [message, setMessage] = useState("Guess a number between 1 - 100");

  function generateRandomNumber(){
    setRandomNumber(Math.floor(Math.random() * 100) + 1 );
  }

  function resetGame(){
    generateRandomNumber();
    setNumberOfGuess(0);
    setGuess("");
    setMessage("Guess a number between 1 - 100");
  }

  useEffect(() => {
    generateRandomNumber();
  }, []);

  function makeAGuess(){
    const guessedNumber = Number(guess);

    if(!Number.isInteger(guessedNumber) || guess === "" || guessedNumber <= 0 || guessedNumber > 100){
      setMessage("Enter a valid number");
      return;
    }
    const newNumberOfGuesses = numberOfGuesses + 1;
    setNumberOfGuess(newNumberOfGuesses);

    if (guessedNumber === numberToGuess){
      const winMessage = "Nice ! you guessed the number in "+ newNumberOfGuesses + " guesses";
      Alert.alert(winMessage);
      resetGame();

    }else if(guessedNumber < numberToGuess){
      setMessage("Your guess " + guessedNumber + " is too low");
    }else{
      setMessage("Your guess " +guessedNumber+ " is too high");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Number</Text>

      <View style={styles.card}>
        <Text style={styles.message}>{message}</Text>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Enter your guess"
          placeholderTextColor="#9CA3AF"
          onChangeText={text => setGuess(text)}
          value={guess}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={makeAGuess}
        >
          <Text style={styles.buttonText}>Make a Guess</Text>
        </Pressable>

        <Text style={styles.attempts}>Attempts: {numberOfGuesses}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 32,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#374151',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  attempts: {
    marginTop: 16,
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});