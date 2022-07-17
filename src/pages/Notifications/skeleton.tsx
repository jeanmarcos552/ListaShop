import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useWindowDimensions, View} from 'react-native';

const SkeletonListagem: React.FC = () => {
  const windowWidth = useWindowDimensions().width;
  //   const windowHeight = useWindowDimensions().height;

  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginTop: 10,

        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
      }}>
      <SkeletonPlaceholder speed={3}>
        <SkeletonPlaceholder.Item
          marginTop={30}
          flexDirection="row"
          alignItems="center">
          <SkeletonPlaceholder.Item
            width={windowWidth / 3}
            height={25}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginLeft={5}
            width={25}
            height={25}
            borderRadius={100}
          />

          <SkeletonPlaceholder.Item marginLeft={windowWidth / 3.5}>
            <SkeletonPlaceholder.Item width={60} height={25} borderRadius={4} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          marginTop={8}
          flexDirection="row"
          alignItems="center">
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={windowWidth / 1.2}
            height={10}
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
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonListagem;
