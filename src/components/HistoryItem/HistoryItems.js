import React, { Component } from 'react';
import { Image, TextInput } from 'react-native';
import { Container, Content, Card, CardItem, 
        Text, Left, Thumbnail, Body, View, Right, Button
} from 'native-base';
import StarRating from 'react-native-star-rating';
import CodeInput from 'react-native-confirmation-code-input';
import Modal from 'react-native-modal';
import { HeaderBase, SubmitButton, Spinner } from '../common';
import styles from './HistoryItemStyle';
/* eslint-disable global-require */

class HistoryItems extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            length: 0, 
            width: 0, 
            height: 0,
            showRatingModal: false,
            showComment: false,
            rating: 0,
            comment: '',
            showSuccessModal: false
        };
    }
    componentDidMount() {
        this.props.getHistoryDetail(this.props.navigation.state.params.id);
    }
    componentWillReceiveProps(nextProps) {
        let sizeDetail = null;
        if (nextProps.historyDetail.size !== null) {
            sizeDetail = JSON.parse(nextProps.historyDetail.size);
            this.setState({ length: sizeDetail.length, width: sizeDetail.width, height: sizeDetail.height });
        }
        if (nextProps.historyDetail.shipper_rating === null && nextProps.historyDetail.status === 4) {
            this.setState({ showRatingModal: true });
        }
        
        if (nextProps.ratingSuccess !== this.props.ratingSuccess && nextProps.ratingSuccess) {
                this.setState({ showSuccessModal: true });
                // this.props.getHistoryDetail(this.props.navigation.state.params.id);
        }
    }
    onCheckCode = (code) => {
        this.props.loading();
        this.props.verifyOTPCode(code, this.props.historyDetail.id);
    }
    onStarRatingPress = (rating) => {
        this.setState({ rating });
        console.log(rating);
        if (rating <= 3) {
            this.setState({ showComment: true });
        } else {
            this.setState({ showComment: false });
            this.setState({ showRatingModal: false });
            this.props.rateShipper(this.props.historyDetail.id, rating, this.state.comment);
        }
    }
    onStarRatingHavingComment = () => {
        this.setState({ showRatingModal: false });
        this.props.rateShipper(this.props.historyDetail.id, this.state.rating, this.state.comment);
    }
    onDismiss = () => {
        this.setState({ showSuccessModal: false });
        this.props.closeRatingSuccessModal();
        this.props.getHistoryDetail(this.props.navigation.state.params.id);
    }
    disableModal = (type) => {
        this.props.disableModal();
        if (type === 'success') {
            this.props.navigation.goBack();
        }
    }
    render() {
        const { historyDetail } = this.props;
        return (
            <Container>
                <HeaderBase 
                    headerText={historyDetail.created_at}
                    navigation={this.props.navigation} 
                    left
                    previousPage='Histories'
                />
                <Content>
                    <Card>
                        <Text style={styles.labelStyle}>RECEIVER</Text>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../image/user.png')} />
                                <Body>
                                    <Text>{historyDetail.receiver_name}</Text>
                                    <Text note>{historyDetail.receiver_phone}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <Card>
                        <Text style={styles.labelStyle}>PACKAGE INFO: </Text>
                        <CardItem>
                            <Left>
                                <Body>
                                    <View style={styles.locationViewStyle} >
                                        <Image 
                                            source={require('../image/placeholder.png')}
                                            style={styles.iconStyle}
                                        />
                                        <Text style={styles.addressStyle} >{historyDetail.pickup_location_address}</Text>
                                    </View>
                                    <View style={[styles.locationViewStyle, { paddingTop: 10 }]} >
                                        <Image 
                                            source={require('../image/destination.png')}
                                            style={styles.iconStyle}
                                        />
                                        <Text style={styles.addressStyle} >{historyDetail.destination_address}</Text>
                                    </View>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Body>
                                    {
                                        (historyDetail.size === null) ?
                                            <Text style={styles.textStyle}>Type: {historyDetail.package_type} </Text>
                                        : (
                                            <View>
                                                <Text style={styles.textStyle}>Type: {historyDetail.package_type} </Text>
                                                <Text style={styles.textStyle}>Length: {this.state.length}   width: {this.state.width}  height: {this.state.height}</Text>
                                            </View>
                                        )
                                            
                                    }
                                    
                                    <Text style={styles.textStyle}>Earnings: {historyDetail.price}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Left>
                                            <Text style={styles.textStyle}>Verified code: {historyDetail.po_verification_code}</Text>
                                        </Left>
                                        <Right>
                                            <Button transparent><Text note style={{ color: '#ff5e3a' }}>QR code</Text></Button>
                                        </Right>
                                    </View>
                                </Body>
                            </Left>
                        </CardItem>
                        </Card>
                        
                        {
                            (historyDetail.is_picked) && 
                            <Card>
                                <Text style={styles.labelStyle}>SHIPPER</Text>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../image/user.png')} />
                                        <Body>
                                            <Text>{historyDetail.first_name} {historyDetail.last_name}</Text>
                                            <Text note>{historyDetail.phone}</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <StarRating
                                            disabled
                                            maxStars={5}
                                            rating={historyDetail.rating}
                                            starSize={30}
                                            fullStarColor='#ff5e3a'
                                            /* selectedStar={(rating) => this.onStarRatingPress(rating)} */
                                        />
                                    </Right>
                                </CardItem>
                            </Card>
                        }
                        {
                            (historyDetail.status < 3) &&
                            <Card>
                                <Text style={styles.labelStyle}>OTP CODE: </Text>
                                <CardItem>
                                    <CodeInput
                                            ref="codeInputRef2"
                                            keyboardType="numeric"
                                            codeLength={4}
                                            compareWithCode='1234'
                                            autoFocus={false}
                                            inactiveColor='#000000'
                                            activeColor='#ff5e3a'
                                            size={40}
                                            codeInputStyle={{ fontWeight: '800' }}
                                            onFulfill={(isvalid, code) => this.onCheckCode(code)}
                                    />
                                </CardItem>
                            </Card>
                        }
                        {
                            (this.props.historyDetail.status === 4 && this.props.historyDetail.shipper_rating !== null) &&
                            <View style={{ flex: 2 / 5 }}>
                                <Text style={[styles.labelStyle, { textAlign: 'center', margin: 10, fontSize: 20 }]}>You rated</Text>
                                <View style={{ alignSelf: 'center' }}>
                                    <StarRating
                                            disabled
                                            maxStars={5}
                                            rating={this.props.historyDetail.shipper_rating}
                                            starSize={35}
                                            fullStarColor='green'
                                    />
                                </View>
                               
                            </View>
                        }
                    
                </Content>
                <Modal isVisible={this.props.showSpinner}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Spinner />
                        </View>
                </Modal> 

                <Modal isVisible={this.props.verifyFail} >
                    <View style={styles.innerContainer}>
                        <Image 
                            source={require('../image/warning.png')}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.modalText}>{this.props.message}</Text>
                        <SubmitButton onPress={() => this.disableModal('fail')}>
                            DISMISS
                        </SubmitButton> 
                    </View>
                </Modal>

                <Modal isVisible={this.props.verifySuccess} >
                    <View style={styles.innerContainer}>
                        <Image 
                            source={require('../image/checked.png')}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.modalText}>{this.props.message}</Text>
                        <SubmitButton onPress={() => this.disableModal('success')}>
                            DISMISS
                        </SubmitButton> 
                    </View>
                </Modal>
                <Modal isVisible={this.state.showSuccessModal}>
                    <View style={{ flex: 1 / 5 }}>
                    <Card>
                        <CardItem>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Image 
                                    source={require('../image/stars.png')}
                                    style={styles.imageStyle}
                                />
                                <Text style={[styles.labelStyle, { textAlign: 'center', margin: 10 }]}>Thank you for rating. Enjoy your day!</Text>
                                <Button 
                                    full style={{ backgroundColor: 'green' }}
                                    onPress={() => this.onDismiss()}
                                >
                                    <Text>DISMISS</Text>
                                </Button>
                            </View>
                            
                        </CardItem>
                    </Card>
                       
                    </View>
                </Modal>

                <Modal isVisible={this.state.showRatingModal}>
                    <View style={{ flex: 1 / 5 }}>
                        <Card>
                            <Text style={[styles.labelStyle, { textAlign: 'center', margin: 10 }]}>Thank you for using our service. Please help us to improve the quality by rating Shipper!</Text>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../image/user.png')} />
                                    <Body>
                                        <Text>{historyDetail.first_name} {historyDetail.last_name}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={this.state.rating}
                                        starSize={30}
                                        fullStarColor='#ff5e3a'
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </Right>
                            </CardItem>
                            {
                                (this.state.showComment) &&
                                <CardItem>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <TextInput
                                            style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginBottom: 10, fontSize: 15 }}
                                            multiline
                                            editable
                                            maxLength={500}
                                            placeholder="Do you have recommend for this shipper?"
                                            onChangeText={(text) => this.setState({ comment: text })}
                                            value={this.state.comment}
                                        />
                                    <Button 
                                        full 
                                        style={{ backgroundColor: '#ff5a3e' }} 
                                        onPress={() => this.onStarRatingHavingComment()}
                                    >
                                        <Text>SUBMIT</Text>
                                    </Button>
                                    </View>
                                </CardItem>
                            }
                        </Card>
                    </View>
                </Modal>
            </Container>
        );
    }
}
export default HistoryItems;
