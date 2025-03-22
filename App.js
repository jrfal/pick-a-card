import { Text, View, SafeAreaView, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import { useState } from 'react';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

const CardItem = ({ title, isEditing, onDelete }) => (
  <Card style={styles.card}>
    <Text>{title}</Text>
    {isEditing && <Button title="Delete" onPress={onDelete} />}
  </Card>
);

export default function App() {
  const [cards, setCards] = useState([
    "Run Pick a Card without Expo",
    "Create a very chill spotify playlist for 11pm",
    "Animated direct motion for player in Tile Engine",
    "Garden - change from seed to plant after timeout",
    "Write up business idea for low-code company",
    "Output list of components used in a Figma file",
    "Breadbox - move boxes around",
    "Define 5 node types for Breadbox",
    "Storyboard player using mini rpg app",
    "Storyboard referee using mini rpg app",
  ]);

  const [drawnCard, setDrawnCard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [addingCard, setAddingCard] = useState('');
  const handleAddingCardChange = (event) => {
    console.log(event.value);
  }

  const [adding, setAdding] = useState("");

  const drawCard = () => {
    setDrawnCard(cards[Math.floor(Math.random() * cards.length)]);
  }

  const activateEditMode = () => setIsEditing(true);
  const deactivateEditMode = () => setIsEditing(false);

  const deleteCard = index => () => {
    setCards(cards.toSpliced(index, 1));
  }

  const addCard = cardName => () => {
    setCards([...cards, cardName]);
    setAddingCard('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isEditing && <Button title="Edit" onPress={activateEditMode} />}
      {isEditing && <Button title="Done" onPress={deactivateEditMode} />}
      <FlatList
        data={cards}
        renderItem={({item, index}) => <CardItem title={item} isEditing={isEditing} onDelete={deleteCard(index)} />}
      />
      {isEditing && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20
          }}
        >
          <TextInput style={styles.addInput} value={addingCard} onChangeText={setAddingCard} onSubmitEditing={addCard(addingCard)} />
          <Button title="Add" onPress={addCard(addingCard)} style={styles.addButton} />
        </View>
      )}
      {drawnCard && <CardItem title={drawnCard} />}
      <Button title="Draw" onPress={drawCard} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  card: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 4,
    marginTop: 4,
    padding: 8
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  addButton: {
    height: 10,
    flexGrow: 2
  },
  addInput: {
    flexGrow: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
