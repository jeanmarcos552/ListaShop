import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';

type PropDialogoComponent = {
  visible: boolean;
  setVisible: Function;
  children: any;
  title: string;
};

const DialogComponent = ({
  setVisible,
  visible,
  title,
  children,
}: PropDialogoComponent) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible()}>
        <Dialog.Icon icon="alert" />
        {title && <Dialog.Title style={styles.title}>{title}</Dialog.Title>}
        <Dialog.Content>{children}</Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export default DialogComponent;
