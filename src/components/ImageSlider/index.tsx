import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage,
  SliderBullet
} from './styles';

interface Props {
    imagesUrl: {
        id: string;
        photo: string;
    }[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
    const [imageVisibleIndex, setImageVisibleIndex] = useState(0);

    const indexChanged = useRef((info : ChangeImageProps) => {
        setImageVisibleIndex(info.viewableItems[0].index!);
    });

    return (
        <Container>
            <ImageIndexes>
                {
                    imagesUrl.map((_, index) => (
                        <SliderBullet  active={index === imageVisibleIndex} key={index} isFirst={index === 0} />
                    ))
                }
            </ImageIndexes>

            <FlatList 
                data={imagesUrl}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage 
                            source={{ uri: item.photo }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChanged.current}
            />
        </Container>
    );
}