import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, 
        Text, Left, Thumbnail, Body, View, Right 
} from 'native-base';
import StarRating from 'react-native-star-rating';
import { HeaderBase } from '../common';
import styles from './HistoryItemStyle';
/* eslint-disable global-require */

class DetailItem extends Component {
    render() {
        return (
            <Container>
                <HeaderBase 
                    headerText="Aug 29, 1995, 12:00 AM" 
                    navigation={this.props.navigation} 
                    left={true} 
                    previousPage='Histories'
                />
                <Content>
                    <Card>
                        <Text style={styles.labelStyle}>CUSTOMER</Text>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../image/user.png')} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <View style={styles.locationViewStyle} >
                                    <Image 
                                        source={require('../image/placeholder.png')}
                                        style={styles.iconStyle}
                                    />
                                    <Text style={styles.addressStyle} >K64/21 Ngoc Han</Text>
                                </View>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <View style={styles.locationViewStyle} >
                                    <Image 
                                        source={require('../image/destination.png')}
                                        style={styles.iconStyle}
                                    />
                                    <Text style={styles.addressStyle} >K81 Ngo Thi Nham</Text>
                                </View>
                            </Left>
                        </CardItem>
                    </Card>
                    <Card>
                        <Text style={styles.labelStyle}>SHIPPER</Text>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../image/user.png')} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                            <Right>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={4}
                                    starSize={30}
                                    fullStarColor='#ff5e3a'
                                    /* selectedStar={(rating) => this.onStarRatingPress(rating)} */
                                />
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
export default DetailItem;
