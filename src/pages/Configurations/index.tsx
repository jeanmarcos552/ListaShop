import React from 'react';
import {List} from 'react-native-paper';
import TemplateDefault from '../../Layout/Default';

export function Configurations() {
  return (
    <TemplateDefault loading={false}>
      <List.Section>
        <List.Subheader>Categorias</List.Subheader>
        <List.Item
          title="First Item"
          left={() => <List.Icon icon="folder" />}
        />
        <List.Item
          title="Second Item"
          left={() => <List.Icon color="#000" icon="folder" />}
        />
      </List.Section>
    </TemplateDefault>
  );
}
