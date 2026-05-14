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
    "Create a spotify playlist for a new hour",
    "Record a track for the seed song for the 24-hour album",
    "Install pick a card on phone",
    "Add cards to Bluesky posts",
    "Write factual retelling of the OKC family's story",
    "Build a visual matrix maker to output JS",
    "Build a tool to compose JS functions using react flow",
    "SF Jukebox native app: load current fight and let you play songs from it",
    "Storyboard: render a sign-on form",
    "Dism-arena: Use actor list to cue goblin's action",
    "Storyboarder: Create JSON for linked pages using react-flow",
    "Arrival: put form in card and widen continue button",
    "Arrival: validation",
    "Arrival: register and account recovery links",
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
