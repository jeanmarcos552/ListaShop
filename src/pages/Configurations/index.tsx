import React from 'react';
import {List} from 'react-native-paper';
import Empty from '../../Components/Empty';
import TemplateDefault from '../../Layout/Default';
import HeaderLayout from '../../Layout/Header';

export function Configurations() {
  return (
    <TemplateDefault loading={false} header={<HeaderLayout />}>
      {true ? (
        <Empty />
      ) : (
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
      )}
    </TemplateDefault>
  );
}
