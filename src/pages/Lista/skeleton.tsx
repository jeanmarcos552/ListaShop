import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useWindowDimensions, View} from 'react-native';

const SkeletonListitem: React.FC = () => {
  const windowWidth = useWindowDimensions().width;

  return (
    <View
      style={{
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
        borderColor: '#e9e3e3',
        borderWidth: 1,
        width: '97%',
      }}>
      <SkeletonPlaceholder speed={4}>
        <SkeletonPlaceholder.Item
          marginTop={10}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <SkeletonPlaceholder.Item
            width={windowWidth / 3}
            height={15}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginLeft={5}
            width={25}
            height={15}
            borderRadius={100}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          marginTop={8}
          flexDirection="row"
          alignItems="center">
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={windowWidth - 4}
            height={5}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          marginTop={8}
          flexDirection="row"
          alignItems="center"
          justifyContent="center">
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={120}
            height={12}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonListitem;
