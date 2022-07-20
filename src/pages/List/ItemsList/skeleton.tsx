import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useWindowDimensions, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

interface PropsComponent {
  size?: number;
}
const SkeletonListItem: React.FC<PropsComponent> = () => {
  const windowWidth = useWindowDimensions().width;
  // const windowHeight = useWindowDimensions().height;

  return (
    <View style={{marginBottom: 20, flex: 1}}>
      <SkeletonPlaceholder speed={3}>
        <SkeletonPlaceholder.Item
          marginTop={30}
          marginBottom={20}
          flexDirection="row"
          justifyContent="center"
          alignItems="center">
          <SkeletonPlaceholder.Item
            marginLeft={20}
            width={windowWidth - 280}
            height={25}
            borderRadius={4}
          />

          <SkeletonPlaceholder.Item
            marginLeft={20}
            width={45}
            height={25}
            borderRadius={5}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
        <SkeletonPlaceholder key={item}>
          <SkeletonPlaceholder.Item
            marginLeft={15}
            marginBottom={20}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly">
            <SkeletonPlaceholder.Item
              width={35}
              height={35}
              borderRadius={80}
            />

            <SkeletonPlaceholder.Item
              marginLeft={20}
              width={windowWidth - 180}
              marginRight={20}
              height={25}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginLeft={20}
              width={10}
              marginRight={20}
              height={25}
              borderRadius={4}
            />

            <SkeletonPlaceholder.Item
              width={60}
              marginRight={20}
              height={25}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ))}

      <SkeletonPlaceholder speed={1000}>
        <SkeletonPlaceholder.Item
          marginTop={30}
          marginBottom={20}
          flexDirection="row"
          justifyContent="center"
          alignItems="center">
          <SkeletonPlaceholder.Item
            marginTop={getBottomSpace() + 80}
            width={windowWidth - 180}
            height={25}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonListItem;
