import React from 'react';
import { Text } from 'react-native';
import { View, Left, Icon, List, ListItem, Body } from 'native-base';
import styles from './SearchResultStyle';

 const SearchResult = ({ predictions, getSelectedAddress }) => {
    function handleGetSelectedAddress(placeID) {
        getSelectedAddress(placeID);
    }
    return (
        <View style={styles.searchResultsWrapper}>
            <List
                dataArray={predictions}
                renderRow={(item) => 
                    <View>
                        <ListItem onPress={handleGetSelectedAddress.bind(this, item.placeID)} button avatar>
                            <Left style={styles.leftContainer}>
                                <Icon name="md-navigate" style={styles.leftIcon} />
                            </Left>
                            <Body>
                                <Text style={styles.primaryText}>{item.primaryText}</Text>
                                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                            </Body>
                        </ListItem>
                    </View>
                }
            />
        </View>
    );
};

export default SearchResult;
