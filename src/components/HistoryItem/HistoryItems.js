import React, { Component } from 'react';
import { Image, TextInput } from 'react-native';
import { Container, Content, Card, CardItem, 
        Text, Left, Thumbnail, Body, View, Right, Button, Icon
} from 'native-base';
import StarRating from 'react-native-star-rating';
// import CodeInput from 'react-native-confirmation-code-input';
import Modal from 'react-native-modal';
import { HeaderBase, Spinner } from '../common';
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
            showSuccessModal: false,
            showCancelTripModal: false,
            showCancelTripSuccessModal: false,
            showResendRequestModal: false,
            resentRequest: false
        };
    }
    componentDidMount() {
        this.props.getHistoryDetail(this.props.navigation.state.params.id);
    }
    componentWillReceiveProps(nextProps) {
        let sizeDetail = null;
        const currentDate = new Date();
        if (nextProps.historyDetail != null) {
            const created_at = new Date(nextProps.historyDetail.created_at.replace(' ', 'T'));
            if (created_at.getTime() + (5 * 60) <= currentDate.getTime()) {
                this.setState({ resentRequest: true });
            }
        }
        
        //get size of package if it is not empty.
        if (nextProps.historyDetail.size !== null) {
            sizeDetail = JSON.parse(nextProps.historyDetail.size);
            this.setState({ length: sizeDetail.length, width: sizeDetail.width, height: sizeDetail.height });
        }
        //show rating modal if the delivery is completed.
        if (nextProps.historyDetail.shipper_rating === null && nextProps.historyDetail.status === 4) {
            this.setState({ showRatingModal: true });
        }
        //show successful modal if rating has done.
        if (nextProps.ratingSuccess !== this.props.ratingSuccess && nextProps.ratingSuccess) {
                this.setState({ showSuccessModal: true });
        }

        //show success modal if canceling trip has done.
        if (nextProps.cancelingTripSuccess !== this.props.cancelingTripSuccess && nextProps.cancelingTripSuccess) {
            this.setState({ showCancelTripSuccessModal: true });
            this.props.resetCanCelingTripSuccess();
        }

        if (nextProps.resendRequestSuccess !== this.props.resendRequestSuccess && nextProps.resendRequestSuccess === false) {
            this.props.navigation.goBack(null);
        }
    }

    componentWillUnmount() {
        this.props.getHistoryList();
    }
   // evaluate shipper's quality, if rating <4 , show comment field.
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
    // submit rating having comment
    onStarRatingHavingComment = () => {
        this.setState({ showRatingModal: false });
        this.props.rateShipper(this.props.historyDetail.id, this.state.rating, this.state.comment);
    }
    // close modal and go back to history screen
    onDismiss = () => {
        this.setState({ showSuccessModal: false });
        this.props.closeRatingSuccessModal();
        this.props.getHistoryDetail(this.props.navigation.state.params.id);
    }
    //cancel order
    onCancelTrip = () => {
        this.setState({ showCancelTripModal: false }, () => {
            this.props.cancelTrip(this.props.navigation.state.params.id);
        });
    }
    //close modal
    disableModal = (type) => {
        this.props.disableModal();
        if (type === 'success') {
            this.props.navigation.goBack();
        }
    }

    resendRequest = () => {
        this.props.resendRequest(this.props.navigation.state.params.id);
        this.setState({ showResendRequestModal: false });
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
                    refresh={this.props.navigation.state.params.refreshList}
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
                        {
                            (historyDetail.status === 1 && this.state.resentRequest) &&
                            <Button success full onPress={() => this.setState({ showResendRequestModal: true })}>
                                <Text>Resend request</Text>
                            </Button>
                        }
                            
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
                            (historyDetail.status === 2 || historyDetail.status === 1) &&
                            <Button full style={{ marginTop: 15, marginRight: 2, marginLeft: 2, backgroundColor: '#ff5a3e' }} onPress={() => this.setState({ showCancelTripModal: true })}><Text>Cancel Order</Text></Button>
                        }
                        
                        
                        {
                            (historyDetail.status === 4 && historyDetail.shipper_rating !== null) &&
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
                                        onPress={() => { this.setState({ showSuccessModal: false }); this.props.getHistoryDetail(this.props.navigation.state.params.id); }}
                                    >
                                        <Text>DISMISS</Text>
                                    </Button>
                                </View>
                                
                            </CardItem>
                        </Card>
                       
                    </View>
                </Modal>

                <Modal isVisible={this.state.showCancelTripModal}>
                    <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Card>
                            <CardItem>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={[styles.labelStyle, { textAlign: 'center', margin: 15 }]}>Do you want to cancel this order?</Text>
                                    <Button 
                                        full success
                                        onPress={() => this.onCancelTrip()}
                                    >
                                        <Text>OK</Text>
                                    </Button>
                                    <Button 
                                        full light
                                        onPress={() => this.setState({ showCancelTripModal: false })}
                                    >
                                        <Text>DISMISS</Text>
                                    </Button>
                                </View>
                                
                            </CardItem>
                        </Card>
                    </View>
                </Modal>

                <Modal isVisible={this.state.showCancelTripSuccessModal}>
                    <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Card>
                            <CardItem>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={[styles.labelStyle, { textAlign: 'center', margin: 10 }]}>{this.props.message}</Text>
                                    <Button 
                                        full style={{ backgroundColor: 'green' }}
                                        onPress={() => { 
                                                        this.setState({ showCancelTripSuccessModal: false }, function () {
                                                            this.props.navigation.goBack(null); 
                                                        }); 
                                                        }
                                                    }
                                    >
                                        <Text>DISMISS</Text>
                                    </Button>
                                </View>
                                
                            </CardItem>
                        </Card>
                    </View>
                </Modal>

                <Modal isVisible={this.state.showResendRequestModal}>
                    <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Card>
                            <CardItem>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={[styles.labelStyle, { textAlign: 'center', margin: 10 }]}>Are you sure you want our system to assign a shipper for you? </Text>
                                    <Text note style={{ marginBottom: 10 }}>The fee will be added more <Text note style={{ fontWeight: 'bold', color: '#000' }}>{(historyDetail.price * 20) / 100}</Text> VND </Text>
                                    <Button 
                                        full success
                                        onPress={() => this.resendRequest()}
                                    >
                                        <Text>OK</Text>
                                    </Button>
                                    <Button 
                                        full light
                                        onPress={() => this.setState({ showResendRequestModal: false })}
                                    >
                                        <Text>DISMISS</Text>
                                    </Button>
                                </View>
                                
                            </CardItem>
                        </Card>
                    </View>
                </Modal>

                <Modal isVisible={this.props.resendRequestSuccess}>
                    <View style={{ flex: 1 / 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Card>
                            <CardItem>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <Text style={[styles.labelStyle, { textAlign: 'center', margin: 10 }]}>You request has been sent! Please wait for few minutes!</Text>
                                    <Button 
                                        full style={{ backgroundColor: 'green' }}
                                        onPress={() => this.props.resetResendingRequestSuccess()}
                                    >
                                        <Text>DISMISS</Text>
                                    </Button>
                                </View>
                                
                            </CardItem>
                        </Card>
                    </View>
                </Modal>

                <Modal 
                    isVisible={this.state.showRatingModal} 
                    animationIn='slideInUp'
                    avoidKeyboard
                >
                    <View 
                        style={{ flex: 1 / 5, margin: 10 }}
                    >
                        
                        <Card>
                        <Text style={[styles.labelStyle, { textAlign: 'center', margin: 10 }]}>Thank you for using our service. Please help us to improve the quality by rating Shipper!</Text>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../image/user.png')} />
                                <Body>
                                    <Text>{historyDetail.first_name} {historyDetail.last_name}</Text>
                                </Body>
                            </Left>
                            <Right style={{ marginLeft: 10 }}>
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
                                <View 
                                    style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
                                >
                                    <TextInput
                                        style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginBottom: 10, fontSize: 15 }}
                                        multiline
                                        maxLength={1000}
                                        placeholder="Do you have recommend for this shipper?"
                                        onChangeText={(text) => this.setState({ comment: text })}
                                        value={this.state.comment}
                                        returnKeyType='done'
                                        blurOnSubmit
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
