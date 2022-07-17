import React from 'react';
import {List} from 'react-native-paper';
export function Configurations() {
  return (
    <List.Section>
      <List.Subheader>Categorias</List.Subheader>
      <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
      <List.Item
        title="Second Item"
        left={() => <List.Icon color="#000" icon="folder" />}
      />
    </List.Section>
  );
}
